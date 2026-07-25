import {
  classifyArbitraryClass,
  extractClassCandidates,
} from "./classify.mjs";
import {
  findMatchingException,
  validateExceptionRegistry,
} from "./exceptions.mjs";

export function scanArbitraryValues({
  files,
  exceptionRegistry,
  exceptions = [],
}) {
  const registry = exceptionRegistry ?? {
    version: 1,
    exceptions,
  };
  const registryValidation = validateExceptionRegistry(registry);

  const errors = [...registryValidation.errors];
  const visibleExceptions = [];
  const registeredExceptions = registry.exceptions ?? [];

  if (registryValidation.errors.length > 0) {
    return {
      errors,
      exceptions: visibleExceptions,
    };
  }

  for (const file of files) {
    for (const className of extractClassCandidates(file.sourceText)) {
      const classification = classifyArbitraryClass(className);

      if (classification.kind !== "arbitrary-visual-value") continue;

      const finding = {
        rule: "no-undocumented-arbitrary-visual-values",
        filePath: file.filePath,
        className,
        value: classification.value,
      };
      const exception = findMatchingException(finding, registeredExceptions);

      if (exception) {
        visibleExceptions.push({
          ...finding,
          exceptionId: exception.id,
        });
      } else {
        errors.push({
          ...finding,
          message: `${className} is an undocumented arbitrary visual value.`,
        });
      }
    }
  }

  return {
    errors,
    exceptions: visibleExceptions,
  };
}
