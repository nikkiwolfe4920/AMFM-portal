const RAW_HEX_PATTERN = /#[0-9a-fA-F]{3,8}\b/g;

function stripComments(sourceText) {
  return sourceText
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

export function scanRawDesignValues({ files }) {
  const errors = [];

  for (const file of files) {
    const sourceText = stripComments(file.sourceText);

    for (const match of sourceText.matchAll(RAW_HEX_PATTERN)) {
      errors.push({
        rule: "no-raw-hex-design-values",
        filePath: file.filePath,
        value: match[0],
        message: `${match[0]} is a raw hex design value. Use a semantic token or add one through src/tokens/*.css and DESIGN.md.`,
      });
    }
  }

  return { errors };
}
