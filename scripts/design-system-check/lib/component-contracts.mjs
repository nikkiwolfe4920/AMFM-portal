const COMPONENT_FILE_PATTERN =
  /^src\/(?:components\/.+|app\/(?:.+\/)?_components\/.+)\.tsx$/;

function slugifyHeading(heading) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function documentedAnchors(markdown) {
  const anchors = new Set();

  for (const match of markdown.matchAll(/^##+\s+(.+)$/gm)) {
    anchors.add(slugifyHeading(match[1]));
  }

  return anchors;
}

function isComponentImplementationFile(filePath) {
  return (
    COMPONENT_FILE_PATTERN.test(filePath) &&
    !filePath.endsWith(".test.tsx")
  );
}

export function validateComponentContracts({
  changedFiles,
  componentMap,
  componentsMarkdown,
  fileExists,
}) {
  const errors = [];
  const mapEntries = Object.entries(componentMap ?? {});
  const implementationPaths = new Set(
    mapEntries
      .map(([, entry]) => entry.implementation)
      .filter((implementation) => typeof implementation === "string")
  );
  const anchors = documentedAnchors(componentsMarkdown ?? "");

  for (const [componentName, entry] of mapEntries) {
    if (!entry.implementation || !fileExists(entry.implementation)) {
      errors.push({
        rule: "component-map-implementation-path-exists",
        componentName,
        filePath: entry.implementation,
        message: `${componentName} points to a missing implementation path.`,
      });
    }

    if (!entry.documentation) {
      errors.push({
        rule: "component-map-documentation-required",
        componentName,
        message: `${componentName} is missing a COMPONENTS.md documentation reference.`,
      });
      continue;
    }

    const [documentationPath, anchor] = entry.documentation.split("#");
    if (documentationPath !== "COMPONENTS.md") {
      errors.push({
        rule: "component-map-documentation-path-is-components-md",
        componentName,
        documentation: entry.documentation,
        message: `${componentName} documentation must point to COMPONENTS.md.`,
      });
      continue;
    }

    if (!anchor || !anchors.has(anchor)) {
      errors.push({
        rule: "component-map-documentation-anchor-exists",
        componentName,
        documentation: entry.documentation,
        message: `${componentName} points to a missing COMPONENTS.md anchor.`,
      });
    }
  }

  for (const filePath of changedFiles) {
    if (!isComponentImplementationFile(filePath)) continue;

    if (!implementationPaths.has(filePath)) {
      errors.push({
        rule: "component-files-require-component-map-entry",
        filePath,
        message: `${filePath} changed without a figma/component-map.json implementation entry.`,
      });
    }
  }

  return { errors };
}
