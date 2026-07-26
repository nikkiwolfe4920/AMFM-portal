"use client";

import { useId, useState, type FormEvent, type ReactElement } from "react";
import { Send } from "lucide-react";

import { HeartChartModalShell } from "@/components/heartchart-modal-shell";
import { InfoNote } from "@/components/info-note";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type InviteUserRole = "admin" | "marriage-champion";

interface InviteUserSubmitPayload {
  email: string;
  role: InviteUserRole;
}

interface InviteUserModalProps {
  trigger: ReactElement;
  churchName: string;
  defaultRole?: InviteUserRole;
  onCancel?: () => void;
  onSendInvite?: (payload: InviteUserSubmitPayload) => void;
}

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "marriage-champion", label: "Marriage Champion" },
];

export function InviteUserModal({
  trigger,
  churchName,
  defaultRole = "marriage-champion",
  onCancel,
  onSendInvite,
}: InviteUserModalProps) {
  const instanceId = useId();
  const formId = `${instanceId}-invite-user-modal-form`;
  const emailId = `${instanceId}-invite-user-email`;
  const emailNoteId = `${instanceId}-invite-user-email-note`;
  const roleId = `${instanceId}-invite-user-role`;
  const [selectedRole, setSelectedRole] = useState<InviteUserRole>(defaultRole);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    onSendInvite?.({ email, role: selectedRole });
  }

  return (
    <HeartChartModalShell
      title="Invite Team"
      description={`Invite team members to join ${churchName}.`}
      trigger={trigger}
      size="md"
      footer={
        <>
          <DialogClose asChild>
            <Button type="button" variant="outline" size="control" onClick={onCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            size="control"
            form={formId}
            disabled={!onSendInvite}
          >
            <Send aria-hidden />
            Send invite
          </Button>
        </>
      }
      headerContent={
        <p className="text-text-tertiary text-sm">
          They will receive an invitation to join{" "}
          <span className="font-semibold text-foreground">{churchName}</span>.
        </p>
      }
      bodyClassName="px-8 py-8"
    >
      <form
        id={formId}
        data-slot="invite-user-modal-form"
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={emailId}>Email</Label>
          <Input
            id={emailId}
            name="email"
            type="email"
            multiple
            placeholder="Email, comma separated"
            aria-describedby={emailNoteId}
          />
          <p id={emailNoteId} data-slot="invite-user-modal-email-note" className="sr-only">
            Multiple email addresses can be entered, separated by a comma.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={roleId}>Role</Label>
          <Select
            name="role"
            value={selectedRole}
            onValueChange={(value) => setSelectedRole(value as InviteUserRole)}
          >
            <SelectTrigger id={roleId} className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {ROLE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <InfoNote>
          <p>
            Marriage Champions can view HeartChart and AMFM Premium content but
            cannot change{" "}
            <span className="font-semibold text-foreground">{churchName}</span>{" "}
            profile information or access billing details.
          </p>
        </InfoNote>
      </form>
    </HeartChartModalShell>
  );
}

export type { InviteUserModalProps, InviteUserRole, InviteUserSubmitPayload };
