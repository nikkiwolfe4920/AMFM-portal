/**
 * Hand-authored approximation of the AMFM wordmark — the real exported asset
 * is blocked (Figma's asset host is unreachable from this environment's
 * network policy), so this reproduces the "Powered by [amfm]" credit as
 * styled text instead, the same tier of approximation as GoogleIcon: no
 * traced SVG paths, just text matching the real mark's two visible pieces
 * (the "amfm" wordmark and its "Association of Marriage & Family Ministries"
 * caption, read off the Figma screenshot). Replace with the real exported
 * asset once available — see DESIGN.md Known gaps.
 */
export function AmfmLogo() {
  return (
    <div className="flex h-6 items-center gap-2">
      <span className="text-text-tertiary text-xs font-medium tracking-[0.24px]">
        Powered by
      </span>
      <div
        role="img"
        aria-label="AMFM — Association of Marriage & Family Ministries"
        className="flex items-center gap-1"
      >
        <span
          aria-hidden="true"
          className="font-display text-foreground text-lg leading-none font-semibold"
        >
          amfm
        </span>
        <span
          aria-hidden="true"
          className="text-text-tertiary flex flex-col justify-center text-[5.5px] leading-[7px] font-semibold tracking-[0.4px] uppercase"
        >
          <span>Association</span>
          <span>of Marriage</span>
          <span>&amp; Family Ministries</span>
        </span>
      </div>
    </div>
  );
}
