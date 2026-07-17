import Image from "next/image";

export function HeartChartLogo() {
  return (
    <Image
      src="/heartchart-logo.svg"
      alt="HeartChart"
      width={183}
      height={32}
      className="h-8 w-auto"
      unoptimized
    />
  );
}
