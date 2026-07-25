function formatFinding(finding) {
  const target = finding.filePath ?? finding.documentation ?? "(unknown file)";
  const detail = finding.className ?? finding.value ?? finding.componentName ?? "";
  const suffix = detail ? ` — ${detail}` : "";

  return `- ${finding.rule}: ${target}${suffix}\n  ${finding.message ?? "No remediation message provided."}`;
}

export function formatHumanReport(result) {
  const failed = result.errors.length > 0;
  const lines = [
    failed ? "Design system check failed" : "Design system check passed",
    `Mode: ${result.mode}`,
    `Files checked: ${result.filesChecked.length}`,
    `Source files scanned: ${result.sourceFilesScanned.length}`,
    `Errors: ${result.errors.length}`,
    `Allowed exceptions reported: ${result.exceptions.length}`,
  ];

  if (result.errors.length > 0) {
    lines.push("", "Errors:");
    lines.push(...result.errors.map(formatFinding));
  }

  if (result.exceptions.length > 0) {
    lines.push("", "Allowed exceptions:");
    lines.push(...result.exceptions.map(formatFinding));
  }

  return `${lines.join("\n")}\n`;
}
