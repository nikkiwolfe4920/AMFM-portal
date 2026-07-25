const REQUIRED_EXCEPTION_FIELDS = [
  "id",
  "className",
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
      if (typeof entry[field] !== "string" || entry[field].trim() === "") {
        errors.push({
          rule: "complete-arbitrary-value-exception-metadata",
          id: entry.id,
          field,
          message: `Arbitrary-value exception ${entry.id ?? "(missing id)"} is missing ${field}.`,
        });
      }
    }

    if (entry.status && !VALID_EXCEPTION_STATUSES.has(entry.status)) {
      errors.push({
        rule: "complete-arbitrary-value-exception-metadata",
        id: entry.id,
        field: "status",
        message: `Arbitrary-value exception ${entry.id} must be temporary or permanent.`,
      });
    }
  }

  return { errors };
}

export function findMatchingException(finding, exceptions) {
  return exceptions.find(
    (entry) =>
      entry.filePath === finding.filePath &&
      entry.className === finding.className
  );
}
