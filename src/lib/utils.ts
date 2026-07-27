import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge's built-in font-size group only recognizes Tailwind's
 * default text-* scale (xs, sm, base, lg, ...). Without this extension it
 * misclassifies our custom display-scale tokens (src/tokens/typography.css)
 * as text-color utilities, so e.g. cn("text-display-md", "text-foreground")
 * silently drops text-display-md instead of merging both.
 *
 * Same issue for the "h" (height) group and our custom fixed-height utilities
 * (src/tokens/spacing.css): without this extension, tailwind-merge doesn't
 * know h-dashboard-empty-preview/h-global-nav-demo conflict with Tailwind's
 * own h-full/h-*, so cn("h-full", "h-dashboard-empty-preview") keeps both
 * classes instead of dropping h-full — and whichever rule happens to sort
 * later in the compiled stylesheet silently wins the CSS cascade.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-xs", "display-sm", "display-md", "display-lg", "display-2xl"] }],
      h: [{ h: ["global-nav-demo", "dashboard-empty-preview"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
