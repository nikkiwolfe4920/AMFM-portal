import Image from "next/image";

/**
 * Hosting church's brand mark. The asset is the exact PNG exported from Figma
 * node 3724:20992 / Settings Church Profile via the Figma MCP.
 */
export function FellowshipOfTheParksLogo() {
  return (
    <Image
      src="/fellowship-of-the-parks-logo.png"
      alt="Fellowship of the Parks"
      width={160}
      height={43}
      className="h-9 w-auto"
      unoptimized
    />
  );
}
