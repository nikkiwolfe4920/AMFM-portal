import { CircleHelp, Search, Trash2, UserPlus } from "lucide-react";

import { GlobalNav } from "@/components/global-nav";
import { ElevatedCard } from "@/components/elevated-card";
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

type ProfileType = "church-leader" | "marriage-champion";

interface TeamMember {
  name: string;
  email: string;
  profileType: ProfileType;
  campus: string;
  completedTraining: boolean;
  completedMmp: boolean;
  /** null renders as "Pending" — the member hasn't accepted their invite yet. */
  joined: string | null;
  status: "active" | "invited";
}

const PROFILE_TYPE_LABEL: Record<ProfileType, string> = {
  "church-leader": "Church Leader",
  "marriage-champion": "Marriage Champion",
};

const TEAM_MEMBERS: TeamMember[] = [
  { name: "Olivia Rhye", email: "olivia@untitledui.com", profileType: "church-leader", campus: "North Campus", completedTraining: true, completedMmp: true, joined: "10/14/2025", status: "active" },
  { name: "Phoenix Baker", email: "phoenix@untitledui.com", profileType: "marriage-champion", campus: "South Campus", completedTraining: false, completedMmp: false, joined: "10/14/2025", status: "active" },
  { name: "Lana Steiner", email: "lana@untitledui.com", profileType: "marriage-champion", campus: "East Campus", completedTraining: false, completedMmp: false, joined: "10/14/2025", status: "active" },
  { name: "Demi Wilkinson", email: "demi@untitledui.com", profileType: "marriage-champion", campus: "East Campus", completedTraining: true, completedMmp: true, joined: "10/14/2025", status: "active" },
  { name: "Candice Wu", email: "candice@untitledui.com", profileType: "marriage-champion", campus: "North Campus", completedTraining: false, completedMmp: false, joined: "10/14/2025", status: "active" },
  { name: "Natali Craig", email: "natali@untitledui.com", profileType: "marriage-champion", campus: "West Campus", completedTraining: false, completedMmp: false, joined: null, status: "invited" },
  { name: "Drew Cano", email: "drew@untitledui.com", profileType: "marriage-champion", campus: "West Campus", completedTraining: true, completedMmp: true, joined: "10/14/2025", status: "active" },
  { name: "Orlando Diggs", email: "orlando@untitledui.com", profileType: "marriage-champion", campus: "East Campus", completedTraining: false, completedMmp: false, joined: "10/14/2025", status: "active" },
  { name: "Andi Lane", email: "andi@untitledui.com", profileType: "marriage-champion", campus: "North Campus", completedTraining: false, completedMmp: false, joined: "10/14/2025", status: "active" },
  { name: "Kate Morrison", email: "kate@untitledui.com", profileType: "marriage-champion", campus: "South Campus", completedTraining: false, completedMmp: false, joined: null, status: "invited" },
];

export default function MarriageChampionsPage() {
  return (
    <div className="from-background-gradient-from to-background-gradient-to flex min-h-screen bg-gradient-to-l">
      <div className="sticky top-0 h-screen shrink-0 p-3">
        <GlobalNav />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="min-w-0 flex-1 p-8">
          <h1 className="font-display text-display-md text-foreground font-light">
            Our Marriage Champions
          </h1>

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
        </main>
      </div>
    </div>
  );
}
