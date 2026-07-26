"use client";

import {
  Building2,
  CreditCard,
  FileText,
  UserCircle,
} from "lucide-react";

import { FellowshipOfTheParksLogo } from "@/components/fellowship-of-the-parks-logo";
import { SettingsAssetUpload } from "@/components/settings-asset-upload";
import { SettingsCampusList } from "@/components/settings-campus-list";
import { ChurchProfileSettingsModal } from "@/components/settings-church-profile-modal";
import { SettingsModalShell } from "@/components/settings-modal-shell";
import { SettingsSection } from "@/components/settings-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SETTINGS_NAV_ITEMS = [
  { id: "personal-profile", label: "Personal Profile", href: "#personal-profile", icon: UserCircle },
  { id: "church-profile", label: "Church Profile", href: "#church-profile", icon: Building2 },
  { id: "billing", label: "Subscription & Billing", href: "#billing", icon: CreditCard },
  { id: "terms-privacy", label: "Terms & Privacy", href: "#terms-privacy", icon: FileText },
];

const DEMO_CAMPUSES = [
  { id: "bedford", name: "Bedford" },
  { id: "grapevine", name: "Grapevine" },
  { id: "north-fort-worth", name: "North Fort Worth" },
];

function markDemoIntent(intent: string) {
  window.location.hash = intent;
}

export function SettingsModalShellDemo() {
  return (
    <SettingsModalShell
      title="Church Profile"
      description="Update your church's information"
      trigger={
        <Button type="button" variant="outline">
          Open settings shell
        </Button>
      }
      navItems={SETTINGS_NAV_ITEMS}
      activeNavItemId="church-profile"
    >
      <div className="flex max-w-settings-content flex-col gap-4">
        <SettingsSection title="Example Section">
          <p className="text-sm text-text-tertiary">
            Settings content composes inside this scrollable body slot.
          </p>
        </SettingsSection>
      </div>
    </SettingsModalShell>
  );
}

export function SettingsSectionDemo() {
  return (
    <div className="max-w-settings-content">
      <SettingsSection title="Basic Information">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ds-settings-section-name">Church Name</Label>
          <Input
            id="ds-settings-section-name"
            defaultValue="Fellowship of the Parks"
          />
        </div>
      </SettingsSection>
    </div>
  );
}

export function SettingsAssetUploadDemo() {
  return (
    <div className="max-w-settings-content rounded-2xl bg-secondary p-8">
      <SettingsAssetUpload
        asset={<FellowshipOfTheParksLogo />}
        uploadLabel="Upload logo"
        removeLabel="Remove"
        removeAriaLabel="Remove logo"
        helperText="SVG or PNG files accepted"
        onUpload={() => markDemoIntent("settings-asset-upload-demo-upload")}
        onRemove={() => markDemoIntent("settings-asset-upload-demo-remove")}
      />
    </div>
  );
}

export function SettingsCampusListDemo() {
  return (
    <div className="max-w-settings-content rounded-2xl bg-secondary p-4">
      <SettingsCampusList
        campuses={DEMO_CAMPUSES}
        onEditCampus={(campus) => markDemoIntent(`settings-campus-edit-${campus.id}`)}
        onRemoveCampus={(campus) => markDemoIntent(`settings-campus-remove-${campus.id}`)}
      />
    </div>
  );
}

export function ChurchProfileSettingsModalDemo() {
  return (
    <ChurchProfileSettingsModal
      trigger={
        <Button type="button" variant="outline">
          Open Church Profile settings modal
        </Button>
      }
      onUploadLogo={() => markDemoIntent("church-profile-settings-upload-logo")}
      onRemoveLogo={() => markDemoIntent("church-profile-settings-remove-logo")}
      onEditCampus={(campus) => markDemoIntent(`church-profile-settings-edit-${campus.id}`)}
      onRemoveCampus={(campus) =>
        markDemoIntent(`church-profile-settings-remove-${campus.id}`)
      }
      onAddCampus={(campusName) =>
        markDemoIntent(`church-profile-settings-add-${encodeURIComponent(campusName)}`)
      }
    />
  );
}
