import { scanArbitraryValues } from "./arbitrary-values.mjs";
import { validateComponentContracts } from "./component-contracts.mjs";
import { validateExceptionRegistry } from "./exceptions.mjs";
import { scanRawDesignValues } from "./raw-values.mjs";
import {
  fileExists,
  getChangedFiles,
  listProductionSourceFiles,
  readJson,
  readScanFiles,
  readText,
} from "./files.mjs";

const DEFAULT_EXCEPTION_REGISTRY = {
  version: 1,
  exceptions: [],
};
const DEFAULT_CONTRACT_EXCLUSION_REGISTRY = {
  version: 1,
  exclusions: [],
};
const DEFAULT_VISUAL_TARGET_REGISTRY = {
  schemaVersion: 1,
  targets: [],
};

const VALID_SCOPES = new Set(["changed", "full-source"]);

export function runDesignSystemCheck({
  root = process.cwd(),
  changedFiles,
  baseRef = "origin/main",
  scope = "changed",
} = {}) {
  if (!VALID_SCOPES.has(scope)) {
    throw new Error(
      `Unsupported design-system check scope: ${scope}. Use "changed" or "full-source".`
    );
  }

  const filesToCheck =
    scope === "full-source"
      ? listProductionSourceFiles(root)
      : changedFiles ?? getChangedFiles(root, baseRef);
  const componentMap = readJson(root, "figma/component-map.json", {});
  const componentsMarkdown = readText(root, "COMPONENTS.md");
  const exceptionRegistry = readJson(
    root,
    "design-system/audits/exceptions.json",
    DEFAULT_EXCEPTION_REGISTRY
  );
  const contractExclusionRegistry = readJson(
    root,
    "design-system/audits/component-contract-exclusions.json",
    DEFAULT_CONTRACT_EXCLUSION_REGISTRY
  );
  const visualTargetRegistry = readJson(
    root,
    "design-system/audits/visual-comparisons/targets.json",
    DEFAULT_VISUAL_TARGET_REGISTRY
  );
  const visualTargetIds = new Set(
    (visualTargetRegistry.targets ?? [])
      .map((target) => target.id)
      .filter((id) => typeof id === "string")
  );
  const sourceFiles = readScanFiles(root, filesToCheck);
  const exceptionRegistryValidation =
    validateExceptionRegistry(exceptionRegistry);

  const arbitraryValues =
    exceptionRegistryValidation.errors.length > 0
      ? { errors: [], exceptions: [] }
      : scanArbitraryValues({
          files: sourceFiles,
          exceptionRegistry,
          validateRegistry: false,
        });
  const rawDesignValues =
    exceptionRegistryValidation.errors.length > 0
      ? { errors: [], exceptions: [] }
      : scanRawDesignValues({
          files: sourceFiles,
          exceptionRegistry,
          validateRegistry: false,
        });
  const componentContracts = validateComponentContracts({
    changedFiles: filesToCheck,
    componentMap,
    componentsMarkdown,
    contractExclusionRegistry,
    visualTargetIds,
    fileExists: (filePath) => fileExists(root, filePath),
  });

  return {
    mode: scope,
    filesChecked: filesToCheck,
    sourceFilesScanned: sourceFiles.map((file) => file.filePath),
    errors: [
      ...exceptionRegistryValidation.errors,
      ...arbitraryValues.errors,
      ...rawDesignValues.errors,
      ...componentContracts.errors,
    ],
    exceptions: [
      ...arbitraryValues.exceptions,
      ...rawDesignValues.exceptions,
      ...componentContracts.exceptions,
    ],
  };
}
