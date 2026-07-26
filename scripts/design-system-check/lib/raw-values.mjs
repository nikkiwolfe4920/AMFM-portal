import {
  findMatchingException,
  validateExceptionRegistry,
} from "./exceptions.mjs";

const RAW_HEX_PATTERN = /#[0-9a-fA-F]{3,8}\b/g;
const RAW_DESIGN_DECLARATION_PATTERN =
  /\b(?:background(?:Color|-color)?|backdropFilter|backdrop-filter|border(?:Color|Radius|Width|-color|-radius|-width)?|bottom|boxShadow|box-shadow|color|column-gap|columnGap|filter|fill|fontSize|font-size|gap|height|inset|left|letterSpacing|letter-spacing|lineHeight|line-height|margin(?:Top|Right|Bottom|Left|-top|-right|-bottom|-left)?|maxHeight|max-height|maxWidth|max-width|minHeight|min-height|minWidth|min-width|padding(?:Top|Right|Bottom|Left|-top|-right|-bottom|-left)?|right|row-gap|rowGap|stroke|textShadow|text-shadow|top|width)\s*:\s*(?:"[^"]+"|'[^']+'|`[^`]+`|[^,;}\n]+)/g;
const RAW_DESIGN_LITERAL_PATTERN =
  /(?:-?\d*\.?\d+(?:px|rem|em|vh|vw|vmin|vmax|%|deg|ms|s)\b|rgba?\(|hsla?\(|oklch\(|color-mix\(|calc\(|drop-shadow\()/;

function stripComments(sourceText) {
  return sourceText
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

function isTokenSourceFile(filePath) {
  return /^src\/tokens\/.+\.css$/.test(filePath);
}

function isCssSourceFile(filePath) {
  return filePath.endsWith(".css");
}

function extractInlineStyleBlocks(sourceText) {
  return [...sourceText.matchAll(/style=\{\{([\s\S]*?)\}\}/g)].map(
    (match) => match[1] ?? ""
  );
}

function readRawDeclarationSources(filePath, sourceText) {
  if (isTokenSourceFile(filePath)) return [];
  if (isCssSourceFile(filePath)) return [sourceText];

  return extractInlineStyleBlocks(sourceText);
}

function hasRawDesignLiteral(declaration) {
  if (RAW_HEX_PATTERN.test(declaration)) {
    RAW_HEX_PATTERN.lastIndex = 0;
    return false;
  }

  RAW_DESIGN_LITERAL_PATTERN.lastIndex = 0;
  return RAW_DESIGN_LITERAL_PATTERN.test(declaration);
}

export function scanRawDesignValues(options) {
  return scanRawDesignValuesWithRegistry(options);
}

export function scanRawDesignValuesWithRegistry({
  files,
  exceptionRegistry,
  exceptions = [],
  validateRegistry = true,
}) {
  const registry = exceptionRegistry ?? {
    version: 1,
    exceptions,
  };
  const registryValidation = validateRegistry
    ? validateExceptionRegistry(registry)
    : { errors: [] };
  const errors = [];
  const visibleExceptions = [];
  const registeredExceptions = registry.exceptions ?? [];
  const usedExceptionIds = new Set();

  errors.push(...registryValidation.errors);

  if (registryValidation.errors.length > 0) {
    return {
      errors,
      exceptions: visibleExceptions,
    };
  }

  function addFinding(finding, message) {
    const exception = findMatchingException(
      finding,
      registeredExceptions,
      usedExceptionIds
    );

    if (exception) {
      usedExceptionIds.add(exception.id);
      visibleExceptions.push({
        ...finding,
        exceptionId: exception.id,
        message: `Allowed exception: ${exception.rationale}`,
      });
    } else {
      errors.push({
        ...finding,
        message,
      });
    }
  }

  for (const file of files) {
    const sourceText = stripComments(file.sourceText);

    for (const match of sourceText.matchAll(RAW_HEX_PATTERN)) {
      const value = match[0];
      addFinding(
        {
          rule: "no-raw-hex-design-values",
          filePath: file.filePath,
          value,
        },
        `${value} is a raw hex design value. Use a semantic token or add one through src/tokens/*.css and DESIGN.md.`
      );
    }

    for (const declarationSource of readRawDeclarationSources(
      file.filePath,
      sourceText
    )) {
      for (const match of declarationSource.matchAll(
        RAW_DESIGN_DECLARATION_PATTERN
      )) {
        const value = match[0].trim();

        if (!hasRawDesignLiteral(value)) continue;

        addFinding(
          {
            rule: "no-raw-design-values",
            filePath: file.filePath,
            value,
          },
          `${value} is a raw design value. Use a semantic token, Tailwind utility, or documented component variant.`
        );
      }
    }
  }

  return { errors, exceptions: visibleExceptions };
}
