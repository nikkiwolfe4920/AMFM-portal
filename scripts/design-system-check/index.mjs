#!/usr/bin/env node

import { formatHumanReport } from "./lib/report.mjs";
import { runDesignSystemCheck } from "./lib/runner.mjs";

function readOption(name) {
  const long = `--${name}`;
  const inline = `${long}=`;
  const inlineArg = process.argv.find((arg) => arg.startsWith(inline));
  if (inlineArg) return inlineArg.slice(inline.length);

  const index = process.argv.indexOf(long);
  if (index !== -1) return process.argv[index + 1];

  return undefined;
}

const result = runDesignSystemCheck({
  root: process.cwd(),
  baseRef: readOption("base") ?? "origin/main",
});

if (process.argv.includes("--json")) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} else {
  process.stdout.write(formatHumanReport(result));
}

if (result.errors.length > 0) {
  process.exitCode = 1;
}
