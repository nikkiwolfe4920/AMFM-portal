import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import {
  FigmaReference,
  Section,
  StateList,
  StatusBadge,
  TokenList,
} from "../../_components/showcase";
import {
  HeartChartLinkCardDemo,
  HeartChartLinkModalDemo,
} from "../_components/heartchart-link-demos";

const TOKENS = [
  "bg-overlay/85",
  "backdrop-blur-[8px]",
  "bg-background",
  "bg-secondary",
  "border-border-secondary",
  "border-input",
  "text-text-tertiary",
  "text-text-secondary",
  "text-text-brand",
  "text-muted-foreground",
  "text-fg-quaternary",
  "bg-button-outline-bg",
  "border-button-outline-border",
  "text-button-outline-fg",
  "text-button-outline-icon",
  "text-button-primary-icon",
  "shadow-2xl",
  "shadow-xs",
  "shadow-button-inset",
  "rounded-2xl",
  "rounded-md",
];

const STATES = [
  "Closed",
  "Open",
  "No settings CTA",
  "Caller-supplied settings CTA",
  "No QR image",
  "With QR image",
  "Missing callback disabled",
  "Footer action",
  "Header preview",
];

export default function HeartChartLinkModalShowcasePage() {
  return (
    <div className="flex flex-col gap-2">
      <Link
        href="/design-system/components"
        className="inline-flex w-fit items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Back to Components
      </Link>

      <div className="flex flex-col gap-4 border-b py-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            HeartChartLinkModal
          </h1>
          <StatusBadge status="Draft" />
        </div>
        <p className="text-muted-foreground max-w-2xl text-sm">
          Full &quot;Share your HeartChart link&quot; modal pattern composed from
          HeartChartModalShell and HeartChartLinkCard. It owns the modal-specific
          intro copy, quick tip, optional settings CTA, brand preview area,
          URL/QR card, and Add a campus footer action while leaving dialog chrome
          and scroll behavior to the shared shell.
        </p>
        <p className="text-muted-foreground text-xs">
          Source:{" "}
          <code className="bg-muted rounded px-1 py-0.5">
            src/components/heartchart-link-modal.tsx
          </code>
        </p>
      </div>

      <Section
        title="Live examples"
        description="Default demo state plus the caller-supplied settings CTA state. Open each modal to inspect the composed shell, URL card, footer, and accessibility tree."
      >
        <div className="rounded-lg border p-6">
          <div className="flex flex-wrap gap-3">
            <HeartChartLinkModalDemo label="Open default modal" />
            <HeartChartLinkModalDemo
              label="Open with settings CTA"
              settingsHref="https://example.com/settings"
            />
          </div>
        </div>
      </Section>

      <Section
        title="Composition"
        description="The full modal is intentionally thin: chrome belongs to HeartChartModalShell, and the QR/link row belongs to HeartChartLinkCard."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-semibold">HeartChartModalShell</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Owns the Radix Dialog wrapper, overlay override, 800px desktop
              width, capped-height grid, title/description, body slot, and footer
              slot. Modal-specific rows should not duplicate that chrome.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-semibold">HeartChartLinkCard</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Owns the QR preview, visible URL label, read-only URL field, copy
              action, share action, and download-QR action.
            </p>
          </div>
        </div>
        <div className="rounded-lg border p-6">
          <HeartChartLinkCardDemo />
        </div>
      </Section>

      <Section
        title="Variants"
        description="No formal variant prop yet. The component exposes replacement slots/optional props only where the current Figma pattern requires them."
      >
        <p className="text-muted-foreground text-sm">
          <code className="bg-muted rounded px-1 py-0.5">settingsHref</code>{" "}
          renders the &quot;Upload your logo in settings&quot; CTA only when the
          caller supplies a destination. The live demo uses a reserved
          documentation URL so the design system does not imply an app settings
          route exists yet. The CTA composes{" "}
          <code className="bg-muted rounded px-1 py-0.5">Button</code>{" "}
          <code className="bg-muted rounded px-1 py-0.5">variant=&quot;link&quot;</code>{" "}
          <code className="bg-muted rounded px-1 py-0.5">size=&quot;inline&quot;</code>{" "}
          around a real anchor, matching Figma&apos;s chrome-free{" "}
          <code className="bg-muted rounded px-1 py-0.5">Buttons/Button</code>{" "}
          text-button instance.{" "}
          <code className="bg-muted rounded px-1 py-0.5">preview</code> can
          replace the default decorative phone preview when a stable dynamic app
          preview exists.{" "}
          <code className="bg-muted rounded px-1 py-0.5">qrImageSrc</code> passes
          a caller-supplied QR image through to HeartChartLinkCard; when omitted,
          the card renders its generic QR placeholder so a stale demo QR is not
          shown for a real URL.
        </p>
      </Section>

      <Section
        title="States"
        description="States are either inherited from the shared Dialog shell or delegated to the URL card; the full modal does not own browser side effects."
      >
        <StateList states={STATES} />
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="py-2 pr-4 font-medium">State</th>
                <th className="py-2 pr-4 font-medium">Owner</th>
                <th className="py-2 font-medium">Behavior</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b">
                <td className="py-2 pr-4">Closed / Open</td>
                <td className="py-2 pr-4">HeartChartModalShell</td>
                <td className="py-2">Radix Dialog focus trap, escape close, and return focus.</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">Settings CTA</td>
                <td className="py-2 pr-4">HeartChartLinkModal</td>
                <td className="py-2">Hidden by default; rendered only when settingsHref is supplied.</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">QR image</td>
                <td className="py-2 pr-4">HeartChartLinkCard</td>
                <td className="py-2">Uses a caller-supplied image; otherwise renders the generic QR placeholder.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Copy / Share / Download / Add campus</td>
                <td className="py-2 pr-4">Caller callbacks</td>
                <td className="py-2">Buttons render with labels and disable themselves unless the caller supplies the matching callback.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Props / API">
        <div className="overflow-x-auto rounded-lg border">
          <pre className="overflow-x-auto p-4 text-xs">
{`interface HeartChartLinkModalProps {
  trigger: ReactElement;
  url: string;
  settingsHref?: string;
  qrImageSrc?: string;
  preview?: ReactNode;
  onCopyUrl?: () => void;
  onShareUrl?: () => void;
  onDownloadQr?: () => void;
  onAddCampus?: () => void;
}`}
          </pre>
        </div>
        <p className="text-muted-foreground text-sm">
          <code className="bg-muted rounded px-1 py-0.5">settingsHref</code> has
          no default because no real settings route exists in the app yet. Do not
          pass <code className="bg-muted rounded px-1 py-0.5">/settings</code> or{" "}
          <code className="bg-muted rounded px-1 py-0.5">#</code> as a fake route.
        </p>
      </Section>

      <Section title="Design tokens used">
        <TokenList tokens={TOKENS} />
      </Section>

      <Section title="Accessibility notes">
        <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
          <li>
            The modal title is the visible DialogTitle: &quot;Share your
            HeartChart link&quot;, and receives initial focus when the dialog
            opens so the URL field is not focused or selected automatically.
          </li>
          <li>
            The hidden DialogDescription summarizes the share/QR purpose for
            assistive technology while keeping the Figma header visually clean.
          </li>
          <li>
            The URL is a real read-only text input with a visible label, so users
            can select or copy the URL without relying on the QR image.
          </li>
          <li>
            The copy, share, download QR, and Add a campus actions are real
            buttons. The icon-only share action carries an explicit accessible
            label in HeartChartLinkCard.
          </li>
          <li>
            The phone preview is <code className="bg-muted rounded px-1 py-0.5">aria-hidden</code>{" "}
            because it is decorative context, not meaningful product content.
          </li>
        </ul>
      </Section>

      <Section title="Responsive behavior">
        <p className="text-muted-foreground text-sm">
          The modal uses the 800px HeartChart shell width on desktop. On narrow
          viewports it follows DialogContent&apos;s{" "}
          <code className="bg-muted rounded px-1 py-0.5">max-w-[calc(100%-2rem)]</code>{" "}
          behavior, hides the decorative phone preview, and lets HeartChartLinkCard
          stack its QR preview, URL field, and actions vertically. In that compact
          layout, the QR preview is centered, the URL control stays full-width
          with the URL truncated inside the native input, and the share/download
          actions center as a group below 360px. From 360px up, Download QR stays
          optically centered with the share icon to its left.
        </p>
      </Section>

      <Section title="Known gaps">
        <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
          <li>
            Real QR generation, clipboard feedback, native share fallback, and QR
            download behavior are application concerns and remain caller-owned.
          </li>
          <li>
            The related Quick Tip, Last 4 Weeks, and Quick Start modal contents are
            future work; this page documents the first full modal pattern and its
            reusable shell/card building blocks.
          </li>
        </ul>
      </Section>

      <Section title="Figma reference">
        <FigmaReference reference="AMFM Portal — HeartChart link Modal node 1903:19737, nested _HeartChart - Church - URL row; earlier component reference node 3724:20579" />
      </Section>

      <p className="text-muted-foreground pb-8 text-xs">
        Full contract:{" "}
        <code className="bg-muted rounded px-1 py-0.5">
          COMPONENTS.md#heartchartlinkmodal
        </code>
      </p>
    </div>
  );
}
