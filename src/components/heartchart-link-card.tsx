"use client";

import { Copy, ExternalLink, QrCode } from "lucide-react";
import Image from "next/image";
import { useId } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeartChartLinkCardProps {
  url: string;
  label?: string;
  qrImageSrc?: string;
  qrImageAlt?: string;
  onCopy?: () => void;
  onShare?: () => void;
  onDownloadQr?: () => void;
  className?: string;
}

export function HeartChartLinkCard({
  url,
  label = "Your unique HeartChart URL",
  qrImageSrc,
  qrImageAlt = "QR code for HeartChart URL",
  onCopy,
  onShare,
  onDownloadQr,
  className,
}: HeartChartLinkCardProps) {
  const inputId = useId();

  return (
    <div
      data-slot="heartchart-link-card"
      className={cn(
        "border-border-secondary relative flex flex-col items-center gap-4 rounded-md border bg-secondary p-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:py-5",
        className
      )}
    >
      <div
        data-slot="heartchart-link-qr"
        className="flex size-[66px] shrink-0 items-center justify-center self-center overflow-hidden rounded-sm bg-background p-1 shadow-sm sm:self-auto"
      >
        {qrImageSrc ? (
          <Image
            src={qrImageSrc}
            alt={qrImageAlt}
            width={58}
            height={58}
            unoptimized
            className="size-full object-contain"
          />
        ) : (
          <div
            role="img"
            aria-label={qrImageAlt}
            className="flex size-full items-center justify-center text-foreground"
          >
            <QrCode className="size-9" aria-hidden />
          </div>
        )}
      </div>

      <div className="flex min-w-0 w-full flex-1 flex-col gap-1.5 sm:w-auto">
        <label
          htmlFor={inputId}
          className="text-text-secondary text-sm font-medium"
        >
          {label}
        </label>
        <div
          data-slot="heartchart-link-url-control"
          className="border-input flex h-11 min-w-0 rounded-md border bg-background shadow-xs"
        >
          <input
            id={inputId}
            data-slot="heartchart-link-url-input"
            value={url}
            readOnly
            title={url}
            className="h-full min-w-0 flex-1 truncate rounded-l-md bg-transparent px-3.5 py-2 text-base text-muted-foreground outline-none"
          />
          <Button
            type="button"
            variant="utilitySegment"
            size="controlSegment"
            data-slot="heartchart-link-copy-button"
            aria-label="Copy HeartChart URL"
            onClick={onCopy}
            disabled={!onCopy}
          >
            <Copy aria-hidden />
            Copy
          </Button>
        </div>
      </div>

      <div
        data-slot="heartchart-link-actions"
        className="flex w-full shrink-0 items-center justify-center gap-1 min-[360px]:grid min-[360px]:grid-cols-[1fr_auto_1fr] min-[360px]:gap-2 sm:flex sm:w-auto sm:self-stretch sm:items-end sm:justify-start sm:gap-2"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          data-slot="heartchart-link-share-button"
          aria-label="Share HeartChart URL"
          onClick={onShare}
          disabled={!onShare}
          className="text-fg-quaternary justify-self-end sm:absolute sm:top-3 sm:right-5 sm:justify-self-auto"
        >
          <ExternalLink aria-hidden />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="control"
          data-slot="heartchart-link-download-qr-button"
          aria-label="Download QR code"
          onClick={onDownloadQr}
          disabled={!onDownloadQr}
          className="justify-self-center sm:justify-self-auto"
        >
          <QrCode aria-hidden />
          Download QR
        </Button>
      </div>
    </div>
  );
}

export type { HeartChartLinkCardProps };
