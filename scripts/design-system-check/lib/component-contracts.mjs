const COMPONENT_FILE_PATTERN =
  /^src\/(?:components\/.+|app\/(?:.+\/)?_components\/.+)\.tsx$/;
const DESIGN_SYSTEM_INTERNAL_COMPONENT_PATTERN =
  /^src\/app\/design-system\/(?:.+\/)?_components\/.+\.tsx$/;
const COMPONENT_CONTRACT_EXCLUSION_RULE =
  "component-files-require-component-map-entry";
const REQUIRED_CONTRACT_EXCLUSION_FIELDS = [
  "id",
  "filePath",
  "component",
  "category",
  "source",
  "rationale",
  "alternatives",
  "blastRadius",
  "owner",
  "dateAdded",
  "status",
  "reviewTrigger",
];
const VALID_CONTRACT_EXCLUSION_STATUSES = new Set([
  "temporary",
  "permanent",
]);
const VALID_CONTRACT_EXCLUSION_CATEGORIES = new Set(["route-orchestration"]);
const VALID_FIGMA_SOURCE_ROLES = new Set([
  "primary-reference",
  "supporting-reference",
  "variant-reference",
  "source-container",
  "asset-reference",
]);
const FIGMA_NODE_ID_PATTERN = /^\d+:\d+$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function hasNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

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
  const anchors = new Map();

  for (const match of markdown.matchAll(/^##+\s+(.+)$/gm)) {
    const heading = match[1];
    anchors.set(slugifyHeading(heading), heading);
  }

  return anchors;
}

function compactAnchorName(value) {
  return slugifyHeading(value).replace(/-/g, "");
}

function figmaUrlMatchesSource({ url, fileKey, nodeId }) {
  if (!hasNonEmptyString(url)) return false;

  const encodedNodeId = encodeURIComponent(nodeId);
  const figmaUrlNodeId = nodeId.replace(":", "-");

  return (
    url.includes(`figma.com/design/${fileKey}/`) &&
    (url.includes(`node-id=${encodedNodeId}`) ||
      url.includes(`node-id=${figmaUrlNodeId}`))
  );
}

function validateFigmaSources({ componentName, entry }) {
  const errors = [];
  const hasFigmaReference = hasNonEmptyString(entry.figmaComponent);

  if (entry.figmaSources === undefined) {
    if (!hasFigmaReference) return errors;

    return [
      {
        rule: "component-map-figma-sources-required",
        componentName,
        message: `${componentName} has a figmaComponent reference and must include structured figmaSources metadata.`,
      },
    ];
  }

  if (!Array.isArray(entry.figmaSources) || entry.figmaSources.length === 0) {
    return [
      {
        rule: "component-map-figma-sources-valid",
        componentName,
        message: `${componentName} figmaSources must be a non-empty array when provided.`,
      },
    ];
  }

  entry.figmaSources.forEach((source, index) => {
    const sourceLabel = `${componentName} figmaSources[${index}]`;

    for (const field of ["fileKey", "nodeId", "name", "url", "role", "lastVerified"]) {
      if (!hasNonEmptyString(source?.[field])) {
        errors.push({
          rule: "component-map-figma-source-complete",
          componentName,
          field,
          message: `${sourceLabel} is missing ${field}.`,
        });
      }
    }

    if (source?.nodeId && !FIGMA_NODE_ID_PATTERN.test(source.nodeId)) {
      errors.push({
        rule: "component-map-figma-source-node-id-format",
        componentName,
        field: "nodeId",
        message: `${sourceLabel} nodeId must use Figma's colon form, for example 3724:20992.`,
      });
    }

    if (source?.role && !VALID_FIGMA_SOURCE_ROLES.has(source.role)) {
      errors.push({
        rule: "component-map-figma-source-role-valid",
        componentName,
        field: "role",
        message: `${sourceLabel} role must be one of ${Array.from(VALID_FIGMA_SOURCE_ROLES).join(", ")}.`,
      });
    }

    if (source?.lastVerified && !ISO_DATE_PATTERN.test(source.lastVerified)) {
      errors.push({
        rule: "component-map-figma-source-date-valid",
        componentName,
        field: "lastVerified",
        message: `${sourceLabel} lastVerified must use YYYY-MM-DD format.`,
      });
    }

    if (
      hasNonEmptyString(source?.url) &&
      hasNonEmptyString(source?.fileKey) &&
      hasNonEmptyString(source?.nodeId) &&
      FIGMA_NODE_ID_PATTERN.test(source.nodeId) &&
      !figmaUrlMatchesSource(source)
    ) {
      errors.push({
        rule: "component-map-figma-source-url-matches",
        componentName,
        field: "url",
        message: `${sourceLabel} url must point to its fileKey and nodeId.`,
      });
    }
  });

  return errors;
}

function validateVisualTargets({ componentName, entry, visualTargetIds }) {
  if (entry.visualTargets === undefined) return [];

  if (
    !Array.isArray(entry.visualTargets) ||
    entry.visualTargets.some((target) => !hasNonEmptyString(target))
  ) {
    return [
      {
        rule: "component-map-visual-targets-valid",
        componentName,
        message: `${componentName} visualTargets must be an array of non-empty target ids when provided.`,
      },
    ];
  }

  if (visualTargetIds) {
    const missingTarget = entry.visualTargets.find(
      (target) => !visualTargetIds.has(target)
    );

    if (missingTarget) {
      return [
        {
          rule: "component-map-visual-target-exists",
          componentName,
          visualTarget: missingTarget,
          message: `${componentName} visual target ${missingTarget} does not exist in design-system/audits/visual-comparisons/targets.json.`,
        },
      ];
    }
  }

  return [];
}

function isComponentImplementationFile(filePath) {
  return (
    COMPONENT_FILE_PATTERN.test(filePath) &&
    !DESIGN_SYSTEM_INTERNAL_COMPONENT_PATTERN.test(filePath) &&
    !filePath.endsWith(".test.tsx")
  );
}

export function validateComponentContractExclusionRegistry(registry) {
  const errors = [];

  if (!registry || typeof registry !== "object") {
    return {
      errors: [
        {
          rule: "valid-component-contract-exclusion-registry",
          message: "Component-contract exclusion registry must be an object.",
        },
      ],
    };
  }

  if (registry.version !== 1) {
    errors.push({
      rule: "valid-component-contract-exclusion-registry",
      message: "Component-contract exclusion registry version must be 1.",
    });
  }

  if (!Array.isArray(registry.exclusions)) {
    errors.push({
      rule: "valid-component-contract-exclusion-registry",
      message:
        "Component-contract exclusion registry must contain an exclusions array.",
    });
    return { errors };
  }

  for (const entry of registry.exclusions) {
    for (const field of REQUIRED_CONTRACT_EXCLUSION_FIELDS) {
      if (!hasNonEmptyString(entry[field])) {
        errors.push({
          rule: "complete-component-contract-exclusion-metadata",
          id: entry.id,
          field,
          message: `Component-contract exclusion ${entry.id ?? "(missing id)"} is missing ${field}.`,
        });
      }
    }

    if (
      entry.status &&
      !VALID_CONTRACT_EXCLUSION_STATUSES.has(entry.status)
    ) {
      errors.push({
        rule: "complete-component-contract-exclusion-metadata",
        id: entry.id,
        field: "status",
        message: `Component-contract exclusion ${entry.id} must be temporary or permanent.`,
      });
    }

    if (
      entry.category &&
      !VALID_CONTRACT_EXCLUSION_CATEGORIES.has(entry.category)
    ) {
      errors.push({
        rule: "complete-component-contract-exclusion-metadata",
        id: entry.id,
        field: "category",
        message: `Component-contract exclusion ${entry.id} has unsupported category ${entry.category}.`,
      });
    }

    if (
      hasNonEmptyString(entry.filePath) &&
      !isComponentImplementationFile(entry.filePath)
    ) {
      errors.push({
        rule: "complete-component-contract-exclusion-metadata",
        id: entry.id,
        field: "filePath",
        message: `Component-contract exclusion ${entry.id} must target a component implementation file.`,
      });
    }
  }

  return { errors };
}

function findMatchingContractExclusion(filePath, registry) {
  return registry.exclusions.find((entry) => entry.filePath === filePath);
}

export function validateComponentContracts({
  changedFiles,
  componentMap,
  componentsMarkdown,
  contractExclusionRegistry = { version: 1, exclusions: [] },
  visualTargetIds,
  fileExists,
}) {
  const errors = [];
  const exceptions = [];
  const mapEntries = Object.entries(componentMap ?? {});
  const implementationPaths = new Set(
    mapEntries
      .map(([, entry]) => entry.implementation)
      .filter((implementation) => typeof implementation === "string")
  );
  const anchors = documentedAnchors(componentsMarkdown ?? "");
  const exclusionRegistryValidation =
    validateComponentContractExclusionRegistry(contractExclusionRegistry);

  for (const [componentName, entry] of mapEntries) {
    errors.push(...validateFigmaSources({ componentName, entry }));
    errors.push(
      ...validateVisualTargets({ componentName, entry, visualTargetIds })
    );

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

    const documentedHeading = anchor ? anchors.get(anchor) : undefined;

    if (!anchor || !documentedHeading) {
      errors.push({
        rule: "component-map-documentation-anchor-exists",
        componentName,
        documentation: entry.documentation,
        message: `${componentName} points to a missing COMPONENTS.md anchor.`,
      });
      continue;
    }

    if (
      compactAnchorName(documentedHeading) !== compactAnchorName(componentName)
    ) {
      errors.push({
        rule: "component-map-documentation-anchor-matches-component",
        componentName,
        documentation: entry.documentation,
        message: `${componentName} documentation points to ${documentedHeading}, not its own COMPONENTS.md contract.`,
      });
    }
  }

  errors.push(...exclusionRegistryValidation.errors);

  for (const filePath of changedFiles) {
    if (!isComponentImplementationFile(filePath)) continue;

    if (!implementationPaths.has(filePath)) {
      if (exclusionRegistryValidation.errors.length > 0) continue;

      const matchingExclusion = findMatchingContractExclusion(
        filePath,
        contractExclusionRegistry
      );

      if (matchingExclusion) {
        exceptions.push({
          rule: COMPONENT_CONTRACT_EXCLUSION_RULE,
          filePath,
          componentName: matchingExclusion.component,
          exceptionId: matchingExclusion.id,
          message: `Allowed component-contract exclusion: ${matchingExclusion.rationale}`,
        });
        continue;
      }

      errors.push({
        rule: COMPONENT_CONTRACT_EXCLUSION_RULE,
        filePath,
        message: `${filePath} does not have a figma/component-map.json implementation entry.`,
      });
    }
  }

  return { errors, exceptions };
}
