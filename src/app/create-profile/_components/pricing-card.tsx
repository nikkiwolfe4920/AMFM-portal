import { AmfmLogo } from "./amfm-logo";
import { BenefitListItem } from "./benefit-list-item";

interface PricingCardProps {
  title: string;
  benefits: string[];
}

export function PricingCard({ title, benefits }: PricingCardProps) {
  return (
    <div className="border-border-brand bg-background flex w-full flex-col rounded-xl border-2 shadow-xs">
      <div className="flex flex-col gap-2 px-5 pt-5">
        <h3 className="font-display text-display-sm text-foreground">{title}</h3>
      </div>
      <div className="flex flex-col gap-6 p-5">
        <div className="flex flex-col gap-3">
          {benefits.map((benefit) => (
            <BenefitListItem key={benefit}>{benefit}</BenefitListItem>
          ))}
        </div>
      </div>
      <div className="border-border-secondary border-t" />
      <div className="flex items-center justify-center pt-3 pb-4">
        <AmfmLogo />
      </div>
    </div>
  );
}
