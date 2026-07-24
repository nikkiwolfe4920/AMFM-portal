"use client";

import type { ReactElement, ReactNode } from "react";
import { Plus, Upload } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { HeartChartLinkCard } from "@/components/heartchart-link-card";
import { HeartChartModalShell } from "@/components/heartchart-modal-shell";
import { cn } from "@/lib/utils";

interface HeartChartLinkModalProps {
  trigger: ReactElement;
  url: string;
  settingsHref?: string;
  qrImageSrc?: string;
  preview?: ReactNode;
  onCopyUrl?: () => void;
  onShareUrl?: () => void;
  onDownloadQr?: () => void;
  onAddCampus?: () => void;
}

const HEARTCHART_LINK_PHONE_PREVIEW_SRC = "/heartchart-link-phone-preview.png";

export function HeartChartLinkModal({
  trigger,
  url,
  settingsHref,
  qrImageSrc,
  preview,
  onCopyUrl,
  onShareUrl,
  onDownloadQr,
  onAddCampus,
}: HeartChartLinkModalProps) {
  return (
    <HeartChartModalShell
      title="Share your HeartChart link"
      description="Share unique HeartChart links or QR codes with your congregation."
      trigger={trigger}
      size="xl"
      headerContent={
        <HeartChartLinkModalHeader
          settingsHref={settingsHref}
          preview={
            <HeartChartPreviewSlot>
              {preview ?? <HeartChartBrandPreview />}
            </HeartChartPreviewSlot>
          }
        />
      }
      bodyClassName="p-6"
      footer={
        <Button
          type="button"
          size="compact"
          onClick={onAddCampus}
          disabled={!onAddCampus}
        >
          <Plus aria-hidden />
          Add a campus
        </Button>
      }
    >
      <HeartChartLinkCard
        url={url}
        qrImageSrc={qrImageSrc}
        onCopy={onCopyUrl}
        onShare={onShareUrl}
        onDownloadQr={onDownloadQr}
      />
    </HeartChartModalShell>
  );
}

function HeartChartLinkModalHeader({
  settingsHref,
  preview,
}: {
  settingsHref?: string;
  preview: ReactNode;
}) {
  return (
    <div
      data-slot="heartchart-link-modal-header-content"
      className="grid gap-6 md:grid-cols-[minmax(0,420px)_276px] md:items-stretch md:gap-10"
    >
      <div className="flex min-w-0 flex-col gap-6 pb-8">
        <p className="text-text-tertiary text-sm">
          Share these unique links or QR codes with your congregation. Each campus has
          a dedicated assessment link to help track responses accurately.
        </p>
        <p className="text-text-tertiary text-sm">
          <span className="font-semibold text-foreground">Quick tip:</span>{" "}
          <span>
            Churches often get better participation when the experience feels
            personalized. If you do not upload a logo, the standard HeartChart logo
            will be used.
          </span>
        </p>
        {settingsHref && (
          <Button asChild variant="link" size="inline" className="w-fit">
            <a href={settingsHref}>
              <Upload aria-hidden />
              Upload your logo in settings
            </a>
          </Button>
        )}
      </div>
      {preview}
    </div>
  );
}

function HeartChartPreviewSlot({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      data-slot="heartchart-link-modal-preview"
      className="hidden md:block"
    >
      {children}
    </div>
  );
}

function HeartChartBrandPreview({ className }: { className?: string }) {
  return (
    <div
      data-slot="heartchart-brand-preview"
      className={cn("relative h-[220px] w-[276px] overflow-hidden", className)}
    >
      <Image
        src={HEARTCHART_LINK_PHONE_PREVIEW_SRC}
        alt=""
        width={276}
        height={220}
        unoptimized
        className="size-full object-cover"
      />
    </div>
  );
}

export type { HeartChartLinkModalProps };
