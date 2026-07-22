import { CircleCheck } from "lucide-react";

export function BenefitListItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-start gap-3">
      <CircleCheck aria-hidden="true" className="text-primary size-6 shrink-0" />
      <p className="text-text-tertiary flex-1 text-sm">{children}</p>
    </div>
  );
}
