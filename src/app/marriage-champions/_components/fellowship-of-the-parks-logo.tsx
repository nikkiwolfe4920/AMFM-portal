import Image from "next/image";

/**
 * Hosting church's brand mark. Figma's asset export host is unreachable from
 * this environment's network policy (same constraint documented for
 * ui.shadcn.com in CLAUDE.md), so this PNG is cropped from a rendered
 * screenshot of the Figma reference node rather than the original vector
 * source. Replace with the real exported asset if one becomes available.
 */
export function FellowshipOfTheParksLogo() {
  return (
    <Image
      src="/fellowship-of-the-parks-logo.png"
      alt="Fellowship of the Parks"
      width={136}
      height={38}
      className="h-9 w-auto"
      unoptimized
    />
  );
}
