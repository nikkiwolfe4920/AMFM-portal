import { scanArbitraryValues } from "./arbitrary-values.mjs";
import { validateComponentContracts } from "./component-contracts.mjs";
import { scanRawDesignValues } from "./raw-values.mjs";
import {
  fileExists,
  getChangedFiles,
  readJson,
  readScanFiles,
  readText,
} from "./files.mjs";

const DEFAULT_EXCEPTION_REGISTRY = {
  version: 1,
  exceptions: [],
};

export function runDesignSystemCheck({
  root = process.cwd(),
  changedFiles,
  baseRef = "origin/main",
} = {}) {
  const filesToCheck = changedFiles ?? getChangedFiles(root, baseRef);
  const componentMap = readJson(root, "figma/component-map.json", {});
  const componentsMarkdown = readText(root, "COMPONENTS.md");
  const exceptionRegistry = readJson(
    root,
    "design-system/audits/exceptions.json",
    DEFAULT_EXCEPTION_REGISTRY
  );
  const sourceFiles = readScanFiles(root, filesToCheck);

  const arbitraryValues = scanArbitraryValues({
    files: sourceFiles,
    exceptionRegistry,
  });
  const rawDesignValues = scanRawDesignValues({
    files: sourceFiles,
  });
  const componentContracts = validateComponentContracts({
    changedFiles: filesToCheck,
    componentMap,
    componentsMarkdown,
    fileExists: (filePath) => fileExists(root, filePath),
  });

  return {
    mode: "changed",
    filesChecked: filesToCheck,
    sourceFilesScanned: sourceFiles.map((file) => file.filePath),
    errors: [
      ...arbitraryValues.errors,
      ...rawDesignValues.errors,
      ...componentContracts.errors,
    ],
    exceptions: arbitraryValues.exceptions,
  };
}
