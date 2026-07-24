"use client";

import { Button } from "@/components/ui/button";
import { HeartChartLinkCard } from "@/components/heartchart-link-card";
import { HeartChartLinkModal } from "@/components/heartchart-link-modal";

const DEMO_HEARTCHART_URL = "https://myhc.com/abcdefg";
const DEMO_HEARTCHART_QR_SRC = "/heartchart-link-qr.svg";

function copyDemoUrl() {
  void navigator.clipboard?.writeText(DEMO_HEARTCHART_URL).catch(() => undefined);
}

function shareDemoUrl() {
  if (navigator.share) {
    void navigator.share({ url: DEMO_HEARTCHART_URL }).catch(() => undefined);
    return;
  }

  copyDemoUrl();
}

function downloadDemoQr() {
  const link = document.createElement("a");
  link.href = DEMO_HEARTCHART_QR_SRC;
  link.download = "heartchart-link-qr.svg";
  link.click();
}

function markDemoCampusIntent() {
  window.location.hash = "heartchart-link-demo-add-campus";
}

export function HeartChartLinkCardDemo() {
  return (
    <HeartChartLinkCard
      url={DEMO_HEARTCHART_URL}
      qrImageSrc={DEMO_HEARTCHART_QR_SRC}
      onCopy={copyDemoUrl}
      onShare={shareDemoUrl}
      onDownloadQr={downloadDemoQr}
    />
  );
}

export function HeartChartLinkModalDemo({
  label = "Open HeartChart link modal",
  settingsHref,
}: {
  label?: string;
  settingsHref?: string;
}) {
  return (
    <HeartChartLinkModal
      trigger={
        <Button type="button" variant="outline">
          {label}
        </Button>
      }
      url={DEMO_HEARTCHART_URL}
      qrImageSrc={DEMO_HEARTCHART_QR_SRC}
      settingsHref={settingsHref}
      onCopyUrl={copyDemoUrl}
      onShareUrl={shareDemoUrl}
      onDownloadQr={downloadDemoQr}
      onAddCampus={markDemoCampusIntent}
    />
  );
}
