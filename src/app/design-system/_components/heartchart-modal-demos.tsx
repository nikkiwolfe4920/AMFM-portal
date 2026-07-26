"use client";

import { Button } from "@/components/ui/button";
import { HeartChartLastFourWeeksModal } from "@/components/heartchart-last-four-weeks-modal";
import { HeartChartLinkCard } from "@/components/heartchart-link-card";
import { HeartChartLinkModal } from "@/components/heartchart-link-modal";
import { HeartChartQuickTipModal } from "@/components/heartchart-quick-tip-modal";
import { HeartChartResourcesQuickStartModal } from "@/components/heartchart-resources-quick-start-modal";
import { InviteUserModal } from "@/components/invite-user-modal";

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

function markDemoInviteSent() {
  window.location.hash = "invite-user-demo-send";
}

function markDemoResourcesIntent() {
  window.location.hash = "heartchart-resources-demo";
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

export function InviteUserModalDemo({
  label = "Open invite user modal",
}: {
  label?: string;
}) {
  return (
    <InviteUserModal
      trigger={
        <Button type="button" variant="outline">
          {label}
        </Button>
      }
      churchName="Fellowship of the Parks"
      onSendInvite={markDemoInviteSent}
    />
  );
}

export function HeartChartQuickTipModalDemo({
  label = "Open Quick Tip modal",
}: {
  label?: string;
}) {
  return (
    <HeartChartQuickTipModal
      trigger={
        <Button type="button" variant="outline">
          {label}
        </Button>
      }
      onGoToResources={markDemoResourcesIntent}
    />
  );
}

export function HeartChartLastFourWeeksModalDemo({
  label = "Open Last 4 Weeks modal",
}: {
  label?: string;
}) {
  return (
    <HeartChartLastFourWeeksModal
      trigger={
        <Button type="button" variant="outline">
          {label}
        </Button>
      }
    />
  );
}

export function HeartChartResourcesQuickStartModalDemo({
  label = "Open Quick Start Guide modal",
}: {
  label?: string;
}) {
  return (
    <HeartChartResourcesQuickStartModal
      trigger={
        <Button type="button" variant="outline">
          {label}
        </Button>
      }
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
