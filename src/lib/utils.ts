import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge's built-in font-size group only recognizes Tailwind's
 * default text-* scale (xs, sm, base, lg, ...). Without this extension it
 * misclassifies our custom display-scale tokens (src/tokens/typography.css)
 * as text-color utilities, so e.g. cn("text-display-md", "text-foreground")
 * silently drops text-display-md instead of merging both.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-sm", "display-md", "display-lg", "display-2xl"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
