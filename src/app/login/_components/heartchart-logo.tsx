import { Heart } from "lucide-react";

export function HeartChartLogo() {
  return (
    <div
      className="flex h-8 items-center font-serif text-[28px] leading-none tracking-tight"
      role="img"
      aria-label="HeartChart"
    >
      <span className="text-foreground">he</span>
      <Heart className="text-primary fill-primary mx-0.5 size-5" aria-hidden="true" />
      <span className="text-primary">rt</span>
      <span className="text-foreground">chart</span>
    </div>
  );
}
