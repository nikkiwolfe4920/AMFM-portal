import { GlobalNav } from "@/components/global-nav";
import { FellowshipOfTheParksLogo } from "@/components/fellowship-of-the-parks-logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardContent } from "./_components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="from-background-gradient-from to-background-gradient-to flex min-h-screen bg-gradient-to-l">
      <GlobalNav overlay />

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="min-w-0 flex-1 p-8">
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <h1 className="font-display text-display-md min-w-[240px] shrink-0 font-light text-foreground">
              Our Data Dashboard
            </h1>

            <div className="flex items-center gap-3">
              <FellowshipOfTheParksLogo />
              {/* Single-campus placeholder, matching FellowshipOfTheParksLogo's
                  "no multi-church data model yet" precedent — see
                  COMPONENTS.md#dashboardfiltermenu Implementation rules. */}
              <Select defaultValue="bedford">
                <SelectTrigger className="w-36 py-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bedford">Bedford</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-8">
            <DashboardContent />
          </div>
        </main>
      </div>
    </div>
  );
}
