const REQUIRED_EXCEPTION_FIELDS = [
  "id",
  "filePath",
  "component",
  "source",
  "rationale",
  "alternatives",
  "blastRadius",
  "owner",
  "dateAdded",
  "status",
  "promotionTrigger",
];

const VALID_EXCEPTION_STATUSES = new Set(["temporary", "permanent"]);
const VALID_EXCEPTION_RULES = new Set([
  "no-undocumented-arbitrary-visual-values",
  "no-raw-hex-design-values",
  "no-raw-design-values",
]);

function hasNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

function resolveExceptionRule(entry) {
  if (hasNonEmptyString(entry.rule)) return entry.rule;
  return undefined;
}

export function validateExceptionRegistry(registry) {
  const errors = [];

  if (!registry || typeof registry !== "object") {
    return {
      errors: [
        {
          rule: "valid-arbitrary-value-exception-registry",
          message: "Exception registry must be an object.",
        },
      ],
    };
  }

  if (registry.version !== 1) {
    errors.push({
      rule: "valid-arbitrary-value-exception-registry",
      message: "Exception registry version must be 1.",
    });
  }

  if (!Array.isArray(registry.exceptions)) {
    errors.push({
      rule: "valid-arbitrary-value-exception-registry",
      message: "Exception registry must contain an exceptions array.",
    });
    return { errors };
  }

  for (const entry of registry.exceptions) {
    for (const field of REQUIRED_EXCEPTION_FIELDS) {
      if (!hasNonEmptyString(entry[field])) {
        errors.push({
          rule: "complete-design-system-exception-metadata",
          id: entry.id,
          field,
          message: `Design-system exception ${entry.id ?? "(missing id)"} is missing ${field}.`,
        });
      }
    }

    const hasClassName = hasNonEmptyString(entry.className);
    const hasValue = hasNonEmptyString(entry.value);
    if (hasClassName === hasValue) {
      errors.push({
        rule: "complete-design-system-exception-metadata",
        id: entry.id,
        field: "className|value",
        message: `Design-system exception ${entry.id ?? "(missing id)"} must specify exactly one of className or value.`,
      });
    }

    const exceptionRule = resolveExceptionRule(entry);
    if (!hasNonEmptyString(exceptionRule)) {
      errors.push({
        rule: "complete-design-system-exception-metadata",
        id: entry.id,
        field: "rule",
        message: `Design-system exception ${entry.id ?? "(missing id)"} is missing rule.`,
      });
    } else if (!VALID_EXCEPTION_RULES.has(exceptionRule)) {
      errors.push({
        rule: "complete-design-system-exception-metadata",
        id: entry.id,
        field: "rule",
        message: `Design-system exception ${entry.id} has unsupported rule ${exceptionRule}.`,
      });
    }

    if (entry.status && !VALID_EXCEPTION_STATUSES.has(entry.status)) {
      errors.push({
        rule: "complete-design-system-exception-metadata",
        id: entry.id,
        field: "status",
        message: `Design-system exception ${entry.id} must be temporary or permanent.`,
      });
    }
  }

  return { errors };
}

export function findMatchingException(
  finding,
  exceptions,
  usedExceptionIds = new Set()
) {
  return exceptions.find(
    (entry) =>
      !usedExceptionIds.has(entry.id) &&
      entry.filePath === finding.filePath &&
      resolveExceptionRule(entry) === finding.rule &&
      ((hasNonEmptyString(entry.className) &&
        entry.className === finding.className) ||
        (hasNonEmptyString(entry.value) && entry.value === finding.value))
  );
}
