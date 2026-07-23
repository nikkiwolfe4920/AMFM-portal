import { CircleHelp, Search, Trash2, UserPlus } from "lucide-react";

import { ElevatedCard } from "@/components/elevated-card";
import { MarriageChampionsPageShell } from "@/components/marriage-champions-page-shell";
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import { StatusTag } from "@/components/ui/status-tag";
import {
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/table";
import { PROFILE_TYPE_LABEL, TEAM_MEMBERS } from "@/lib/team-members";

export default function MarriageChampionsPage() {
  return (
    <MarriageChampionsPageShell>
      <ElevatedCard className="mt-8" innerClassName="p-8">
        <CardHeader className="flex flex-col gap-4 border-b px-0 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-0.5">
            <CardTitle className="text-lg">Team Members</CardTitle>
            <CardDescription className="max-w-2xl">
              Here you can invite your Marriage Champions to create their AMFM
              account, kick off their training, and track their certification
              progress.
            </CardDescription>
          </div>
          <CardAction className="flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row sm:items-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-text-secondary hover:text-foreground h-auto gap-2 px-0 hover:bg-transparent"
            >
              <UserPlus aria-hidden="true" className="size-5" />
              Invite Team Member
            </Button>
            <InputGroup
              addon={<Search aria-hidden="true" className="size-5" />}
              type="search"
              placeholder="Search"
              aria-label="Search team members"
              className="w-full sm:w-64"
            />
          </CardAction>
        </CardHeader>

        <CardContent className="px-0 pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Profile type</TableHeaderCell>
                <TableHeaderCell>Campus</TableHeaderCell>
                <TableHeaderCell>Champion Training</TableHeaderCell>
                <TableHeaderCell>
                  <span className="inline-flex items-center gap-1">
                    Completed MMP
                    <CircleHelp
                      aria-hidden="true"
                      className="text-muted-foreground size-3.5"
                    />
                  </span>
                </TableHeaderCell>
                <TableHeaderCell>Joined</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>
                  <span className="sr-only">Actions</span>
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TEAM_MEMBERS.map((member) => (
                <TableRow key={member.email}>
                  <TableCell className="font-semibold">{member.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.email}
                  </TableCell>
                  <TableCell>
                    <Select defaultValue={member.profileType}>
                      <SelectTrigger
                        aria-label={`Profile type for ${member.name}`}
                        className="w-44"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(PROFILE_TYPE_LABEL).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.campus}
                  </TableCell>
                  <TableCell>
                    <StatusTag variant={member.completedTraining ? "success" : "error"}>
                      {member.completedTraining ? "Yes" : "No"}
                    </StatusTag>
                  </TableCell>
                  <TableCell>
                    <StatusTag variant={member.completedMmp ? "success" : "error"}>
                      {member.completedMmp ? "Yes" : "No"}
                    </StatusTag>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.joined ?? "Pending"}
                  </TableCell>
                  <TableCell>
                    {member.status === "invited" ? (
                      <StatusTag variant="warning">Invited</StatusTag>
                    ) : (
                      <span className="text-muted-foreground">Active</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${member.name}`}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 aria-hidden="true" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </ElevatedCard>
    </MarriageChampionsPageShell>
  );
}
