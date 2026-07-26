"use client";

import { useId, useState, type FormEvent, type ReactElement } from "react";
import {
  Building2,
  CreditCard,
  FileText,
  Plus,
  UserCircle,
} from "lucide-react";

import { FellowshipOfTheParksLogo } from "@/components/fellowship-of-the-parks-logo";
import { SettingsAssetUpload } from "@/components/settings-asset-upload";
import {
  SettingsCampusList,
  type SettingsCampus,
} from "@/components/settings-campus-list";
import {
  SettingsModalShell,
  type SettingsNavItem,
} from "@/components/settings-modal-shell";
import { SettingsSection } from "@/components/settings-section";
import { Input } from "@/components/ui/input";
import { InputActionGroup } from "@/components/ui/input-action-group";
import { InputGroup } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

interface ChurchProfileSettingsModalProps {
  trigger: ReactElement;
  churchName?: string;
  averageWeeklyAttendance?: string;
  website?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zip?: string;
  campuses?: SettingsCampus[];
  onUploadLogo?: () => void;
  onRemoveLogo?: () => void;
  onEditCampus?: (campus: SettingsCampus) => void;
  onRemoveCampus?: (campus: SettingsCampus) => void;
  onAddCampus?: (campusName: string) => void;
}

const SETTINGS_NAV_ITEMS: SettingsNavItem[] = [
  { id: "personal-profile", label: "Personal Profile", href: "#personal-profile", icon: UserCircle },
  { id: "church-profile", label: "Church Profile", href: "#church-profile", icon: Building2 },
  { id: "billing", label: "Subscription & Billing", href: "#billing", icon: CreditCard },
  { id: "terms-privacy", label: "Terms & Privacy", href: "#terms-privacy", icon: FileText },
];

const DEFAULT_CAMPUSES: SettingsCampus[] = [
  { id: "bedford", name: "Bedford" },
  { id: "grapevine", name: "Grapevine" },
  { id: "haslet", name: "Haslet" },
  { id: "northlake", name: "Northlake" },
  { id: "north-fort-worth", name: "North Fort Worth" },
];

function ChurchProfileSettingsModal({
  trigger,
  churchName = "Fellowship of the Parks",
  averageWeeklyAttendance = "5,000",
  website = "fotp.church",
  streetAddress = "",
  city = "",
  state = "",
  zip = "",
  campuses = DEFAULT_CAMPUSES,
  onUploadLogo,
  onRemoveLogo,
  onEditCampus,
  onRemoveCampus,
  onAddCampus,
}: ChurchProfileSettingsModalProps) {
  const instanceId = useId();
  const fieldIds = {
    churchName: `${instanceId}-church-profile-name`,
    attendance: `${instanceId}-church-profile-attendance`,
    website: `${instanceId}-church-profile-website`,
    streetAddress: `${instanceId}-church-profile-street-address`,
    city: `${instanceId}-church-profile-city`,
    state: `${instanceId}-church-profile-state`,
    zip: `${instanceId}-church-profile-zip`,
    campusName: `${instanceId}-church-profile-campus-name`,
  };
  const [campusName, setCampusName] = useState("");

  function handleAddCampus(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedCampusName = campusName.trim();

    if (!trimmedCampusName || !onAddCampus) {
      return;
    }

    onAddCampus(trimmedCampusName);
    setCampusName("");
  }

  return (
    <SettingsModalShell
      title="Church Profile"
      description="Update your church's information"
      trigger={trigger}
      navItems={SETTINGS_NAV_ITEMS}
      activeNavItemId="church-profile"
    >
      <div
        data-slot="settings-church-profile-modal"
        className="flex max-w-settings-content flex-col gap-8"
      >
        <SettingsSection title="Church Logo">
          <SettingsAssetUpload
            uploadLabel="Upload logo"
            removeLabel="Remove"
            removeAriaLabel="Remove logo"
            helperText="SVG or PNG files accepted"
            onUpload={onUploadLogo}
            onRemove={onRemoveLogo}
            asset={<FellowshipOfTheParksLogo />}
          />
        </SettingsSection>

        <SettingsSection title="Basic Information">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={fieldIds.churchName}>Church Name</Label>
              <Input
                id={fieldIds.churchName}
                name="churchName"
                defaultValue={churchName}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-settings-field-pair">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={fieldIds.attendance}>
                  Avg. Weekly Attendance
                </Label>
                <Input
                  id={fieldIds.attendance}
                  name="averageWeeklyAttendance"
                  defaultValue={averageWeeklyAttendance}
                  inputMode="numeric"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={fieldIds.website}>Website</Label>
                <InputGroup
                  id={fieldIds.website}
                  name="website"
                  addon="http://"
                  defaultValue={website}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor={fieldIds.streetAddress}>
                Street address (optional)
              </Label>
              <Input
                id={fieldIds.streetAddress}
                name="streetAddress"
                defaultValue={streetAddress}
                placeholder="Enter your street address"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-settings-address">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={fieldIds.city} required>
                  City
                </Label>
                <Input
                  id={fieldIds.city}
                  name="city"
                  defaultValue={city}
                  placeholder="City"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={fieldIds.state}>State</Label>
                <Input
                  id={fieldIds.state}
                  name="state"
                  defaultValue={state}
                  placeholder="State"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={fieldIds.zip}>Zip</Label>
                <Input
                  id={fieldIds.zip}
                  name="zip"
                  defaultValue={zip}
                  placeholder="Zip"
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>
        </SettingsSection>

        <section data-slot="settings-campus-section" className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold tracking-label text-muted-foreground uppercase">
            Campuses
          </h3>
          <div className="rounded-2xl bg-secondary">
            <SettingsCampusList
              campuses={campuses}
              onEditCampus={onEditCampus}
              onRemoveCampus={onRemoveCampus}
            />
            <form
              data-slot="settings-campus-add-form"
              className="px-6 py-6"
              onSubmit={handleAddCampus}
            >
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={fieldIds.campusName}>Campus name</Label>
                <InputActionGroup
                  id={fieldIds.campusName}
                  name="campusName"
                  placeholder="Campus name"
                  value={campusName}
                  onChange={(event) => setCampusName(event.target.value)}
                  actionLabel="Add"
                  actionAriaLabel="Add campus"
                  actionType="submit"
                  actionIcon={<Plus aria-hidden />}
                  actionDisabled={!campusName.trim() || !onAddCampus}
                />
              </div>
            </form>
          </div>
        </section>
      </div>
    </SettingsModalShell>
  );
}

export { ChurchProfileSettingsModal };
export type { ChurchProfileSettingsModalProps };
