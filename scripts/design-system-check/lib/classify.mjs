const STRING_LITERAL_PATTERN =
  /"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|`((?:\\.|[^`\\])*)`/g;

const DESIGN_VALUE_PATTERN =
  /(?:^|[\s_(),-])(?:-?\d*\.?\d+(?:px|rem|em|vh|vw|vmin|vmax|%|deg|ms|s)|#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\(|oklch\(|calc\(|minmax\(|linear-gradient\(|radial-gradient\(|url\()/;

const DESIGN_UTILITY_PREFIX_PATTERN =
  /^(?:[a-z0-9-]+:)*(?:bg|text|border|ring|shadow|drop-shadow|blur|backdrop-blur|rounded|size|w|h|min-w|max-w|min-h|max-h|p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|inset|top|right|bottom|left|translate-x|translate-y|grid-rows|grid-cols|leading|tracking|duration|delay|transition|z|opacity|scale|scale-x|scale-y|aspect)-\[/;

const SELECTOR_OR_STATE_VARIANT_PATTERN =
  /^(?:data|aria|group-data|peer-data|has|\*?:data)-\[/;
const SIMPLE_CLASS_TOKENS = new Set([
  "absolute",
  "antialiased",
  "block",
  "border",
  "capitalize",
  "clear",
  "collapse",
  "container",
  "contents",
  "dark",
  "fixed",
  "float",
  "flex",
  "grid",
  "group",
  "grow",
  "hidden",
  "inline",
  "invisible",
  "isolate",
  "italic",
  "lowercase",
  "outline",
  "peer",
  "relative",
  "resize",
  "ring",
  "rounded",
  "shadow",
  "shrink",
  "sr-only",
  "static",
  "sticky",
  "table",
  "transform",
  "transition",
  "truncate",
  "underline",
  "uppercase",
  "visible",
]);

function splitOutsideBrackets(className) {
  const segments = [];
  let depth = 0;
  let start = 0;
  let escaped = false;

  for (let index = 0; index < className.length; index += 1) {
    const char = className[index];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === "[") depth += 1;
    if (char === "]" && depth > 0) depth -= 1;

    if (char === ":" && depth === 0) {
      segments.push(className.slice(start, index));
      start = index + 1;
    }
  }

  segments.push(className.slice(start));
  return segments;
}

function getUtilitySegment(className) {
  const segments = splitOutsideBrackets(className);
  return segments.at(-1) ?? className;
}

function hasSelectorOrStateVariant(className) {
  return splitOutsideBrackets(className)
    .slice(0, -1)
    .some((segment) => SELECTOR_OR_STATE_VARIANT_PATTERN.test(segment));
}

function extractBracketValue(className) {
  const start = className.indexOf("[");
  if (start === -1) return "";

  let depth = 0;
  for (let index = start; index < className.length; index += 1) {
    const char = className[index];

    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) return className.slice(start + 1, index);
    }
  }

  return className.slice(start + 1);
}

function stripComments(sourceText) {
  return sourceText
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

function normalizeClassCandidate(className) {
  return className
    .trim()
    .replace(/^[([{,;]+/, "")
    .replace(/[),;]+$/, "");
}

function isLikelyClassToken(className) {
  const normalizedClassName = normalizeClassCandidate(className).replace(
    /^!/,
    ""
  );

  return (
    normalizedClassName.includes("[") ||
    normalizedClassName.includes(":") ||
    normalizedClassName.includes("-") ||
    normalizedClassName.includes("/") ||
    SIMPLE_CLASS_TOKENS.has(normalizedClassName)
  );
}

function isLikelyClassList(classText) {
  const classNames = classText.split(/\s+/).filter(Boolean);

  if (classNames.length === 0) return false;
  if (!classNames.some((className) => className.includes("["))) return false;
  if (classNames.length === 1) return true;

  return classNames.every(isLikelyClassToken);
}

export function classifyArbitraryClass(className) {
  if (!className.includes("[")) {
    return {
      kind: "standard",
      className,
      value: "",
    };
  }

  const utilityClassName = getUtilitySegment(className);
  const value = extractBracketValue(utilityClassName);

  if (!utilityClassName.includes("[") && hasSelectorOrStateVariant(className)) {
    return {
      kind: "selector-or-state",
      className,
      value,
    };
  }

  if (
    DESIGN_VALUE_PATTERN.test(value) ||
    DESIGN_UTILITY_PREFIX_PATTERN.test(utilityClassName)
  ) {
    return {
      kind: "arbitrary-visual-value",
      className,
      value,
    };
  }

  if (hasSelectorOrStateVariant(className)) {
    return {
      kind: "selector-or-state",
      className,
      value,
    };
  }

  return {
    kind: "arbitrary-nonvisual",
    className,
    value,
  };
}

export function extractClassCandidates(sourceText) {
  const candidates = [];
  const searchableSource = stripComments(sourceText);

  for (const match of searchableSource.matchAll(STRING_LITERAL_PATTERN)) {
    const classText = match[1] ?? match[2] ?? match[3] ?? "";
    if (!isLikelyClassList(classText)) continue;

    for (const className of classText.split(/\s+/)) {
      const normalizedClassName = normalizeClassCandidate(className);
      if (normalizedClassName.includes("[")) candidates.push(normalizedClassName);
    }
  }

  return candidates.sort();
}
