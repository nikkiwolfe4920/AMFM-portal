/**
 * Hand-authored approximation of the AMFM wordmark — the real exported asset
 * is blocked (Figma's asset host is unreachable from this environment's
 * network policy), so this reproduces the "Powered by [amfm]" credit as
 * styled text instead, the same tier of approximation as GoogleIcon. Replace
 * with the real exported asset once available — see DESIGN.md Known gaps.
 */
export function AmfmLogo() {
  return (
    <div className="flex h-6 items-center gap-2">
      <span className="text-text-tertiary text-xs font-medium tracking-[0.24px]">
        Powered by
      </span>
      <span
        role="img"
        aria-label="AMFM — Association of Marriage & Family Ministries"
        className="font-display text-foreground text-lg leading-none font-semibold"
      >
        amfm
      </span>
    </div>
  );
}
