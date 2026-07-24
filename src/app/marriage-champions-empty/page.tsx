import { Award } from "lucide-react";

import { BlurOverlay } from "@/components/blur-overlay";
import { ElevatedCard } from "@/components/elevated-card";
import { MarriageChampionsPageShell } from "@/components/marriage-champions-page-shell";
import { VideoPlayer } from "@/components/video-player";
import { Button } from "@/components/ui/button";
import { StatusTag } from "@/components/ui/status-tag";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/table";
import { PROFILE_TYPE_LABEL, TEAM_MEMBERS } from "@/lib/team-members";

export default function MarriageChampionsEmptyPage() {
  return (
    <MarriageChampionsPageShell>
      <ElevatedCard className="mt-8" innerClassName="relative overflow-hidden p-8">
        <BlurOverlay>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Profile type</TableHeaderCell>
                <TableHeaderCell>Campus</TableHeaderCell>
                <TableHeaderCell>Joined</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TEAM_MEMBERS.map((member) => (
                <TableRow key={member.email}>
                  <TableCell className="font-semibold">{member.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.email}
                  </TableCell>
                  <TableCell>{PROFILE_TYPE_LABEL[member.profileType]}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.campus}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </BlurOverlay>

        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="flex w-full max-w-[560px] flex-col items-center gap-8">
            <VideoPlayer
              poster="/login-background.jpg"
              title="Recruiting Marriage Champions"
              className="w-full"
            />

            <div className="flex flex-col gap-6 text-center">
              <h2 className="font-display text-display-lg text-foreground font-light">
                Start recruiting your Marriage Champions.
              </h2>
              <p className="text-text-secondary text-base">
                There are couples in your congregation that are waiting to be
                asked by you to join in this exciting ministry.
              </p>
            </div>

            <Button size="sm">
              <Award aria-hidden="true" />
              Invite Marriage Champions
            </Button>
          </div>
        </div>
      </ElevatedCard>
    </MarriageChampionsPageShell>
  );
}
