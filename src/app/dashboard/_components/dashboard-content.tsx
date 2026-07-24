"use client";

import * as React from "react";
import { Baby, ChartNoAxesColumn, Heart } from "lucide-react";

import { HeartChartSummary } from "@/components/heartchart-summary";
import { WeDoCard } from "@/components/we-do-card";
import { ParticipationVerticalBarCard } from "@/components/participation-vertical-bar-card";
import { ParticipationHorizontalBarCard } from "@/components/participation-horizontal-bar-card";
import { CommitmentConnectionChart } from "@/components/commitment-connection-chart";
import { SnapshotVideoCard } from "@/components/snapshot-video-card";
import { FullWidthBarChart } from "@/components/full-width-bar-chart";
import { PieChartCard } from "@/components/pie-chart-card";
import { ScaleChartCard } from "@/components/scale-chart-card";
import { HorizontalTabs } from "@/components/ui/tabs";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardFilterMenu } from "./dashboard-filter-menu";
import {
  AGE_GROUPS_DATA,
  CAUTION_FLAGS_DATA,
  DASHBOARD_FILTER_GROUPS,
  EXPRESSED_NEEDS_DATA,
  FAITH_JOURNEY_PIE,
  FULL_WIDTH_BAR_CHART_DATA,
  GOD_CONNECTION_PIE,
  HEART_CHART_SUMMARY,
  KIDS_DATA,
  RELATIONSHIP_HEALTH_SCATTER_POINTS,
  RELATIONSHIP_HEALTH_SUMMARY,
  RELATIONSHIP_HEALTH_ZONE_LABELS,
  RELATIONSHIP_STATUS_DATA,
  WE_DO_CARD,
} from "../_lib/dashboard-data";

const AUDIENCE_TABS = [
  { label: "Couples", value: "couples" },
  { label: "Singles", value: "singles" },
];

const SPIRITUAL_SNAPSHOT_TABS = [
  { label: "All", value: "all" },
  { label: "Couples", value: "couples" },
  { label: "Singles", value: "singles" },
];

function useAudienceTabs(defaultValue: string) {
  return React.useState(defaultValue);
}

export function DashboardContent() {
  const [relationshipHealthAudience, setRelationshipHealthAudience] =
    useAudienceTabs("couples");
  const [spiritualSnapshotAudience, setSpiritualSnapshotAudience] =
    React.useState("all");
  const [cautionFlagsAudience, setCautionFlagsAudience] =
    useAudienceTabs("couples");
  const [expressedNeedsAudience, setExpressedNeedsAudience] =
    useAudienceTabs("couples");

  const [filterValues, setFilterValues] = React.useState(() =>
    Object.fromEntries(
      DASHBOARD_FILTER_GROUPS.map((group) => [group.label, "all"])
    )
  );

  const filterGroups = DASHBOARD_FILTER_GROUPS.map((group) => ({
    ...group,
    value: filterValues[group.label],
  }));

  function handleFilterChange(group: string, value: string) {
    setFilterValues((previous) => ({ ...previous, [group]: value }));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <HeartChartSummary
          percentage={HEART_CHART_SUMMARY.percentage}
          completedCount={HEART_CHART_SUMMARY.completedCount}
          totalAttenders={HEART_CHART_SUMMARY.totalAttenders}
        />
        <WeDoCard
          coupleCount={WE_DO_CARD.coupleCount}
          quote={WE_DO_CARD.quote}
          highlightedPhrase={WE_DO_CARD.highlightedPhrase}
          nextPulseLabel={WE_DO_CARD.nextPulseLabel}
        />
      </div>
      <p className="text-center text-sm text-muted-foreground">
        HeartChart shows you where your people are — WeDo helps them get
        where they want to go.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Bedford Campus Participation Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <ParticipationVerticalBarCard
              title="Age Groups"
              icon={<ChartNoAxesColumn />}
              data={AGE_GROUPS_DATA}
            />
            <ParticipationHorizontalBarCard
              title="Relationship Status"
              icon={<Heart />}
              data={RELATIONSHIP_STATUS_DATA}
            />
            <ParticipationHorizontalBarCard
              title="Kids"
              icon={<Baby />}
              data={KIDS_DATA}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Relationship Health for Bedford Campus</CardTitle>
          <CardAction className="flex w-full items-center gap-4 sm:w-auto">
            <HorizontalTabs
              tabs={AUDIENCE_TABS}
              value={relationshipHealthAudience}
              onValueChange={setRelationshipHealthAudience}
            />
            <Button variant="link" size="inline">
              Understanding your data
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CommitmentConnectionChart
              dataPoints={RELATIONSHIP_HEALTH_SCATTER_POINTS}
              highlightedZone={RELATIONSHIP_HEALTH_SUMMARY.highlightedZone}
              zoneLabels={RELATIONSHIP_HEALTH_ZONE_LABELS}
            />
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {RELATIONSHIP_HEALTH_SUMMARY.highlightedZone}
                </h3>
                <p className="text-sm font-medium text-primary">
                  {RELATIONSHIP_HEALTH_SUMMARY.headline}
                </p>
              </div>
              <SnapshotVideoCard
                title="Quick Snapshot"
                description={RELATIONSHIP_HEALTH_SUMMARY.description}
              />
            </div>
          </div>

          <DashboardFilterMenu
            groups={filterGroups}
            onChange={handleFilterChange}
            resultCount={1309}
            totalCount={1309}
          />

          <FullWidthBarChart data={FULL_WIDTH_BAR_CHART_DATA} />
        </CardContent>
      </Card>

      <h2 className="font-display text-display-sm font-light text-foreground">
        Key Insights
      </h2>

      <Card>
        <CardHeader className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Spiritual Snapshot for Bedford Campus</CardTitle>
          <CardAction>
            <HorizontalTabs
              tabs={SPIRITUAL_SNAPSHOT_TABS}
              value={spiritualSnapshotAudience}
              onValueChange={setSpiritualSnapshotAudience}
            />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <PieChartCard
              title={FAITH_JOURNEY_PIE.title}
              centerStat={FAITH_JOURNEY_PIE.centerStat}
              segments={FAITH_JOURNEY_PIE.segments}
            />
            <PieChartCard
              title={GOD_CONNECTION_PIE.title}
              centerStat={GOD_CONNECTION_PIE.centerStat}
              segments={GOD_CONNECTION_PIE.segments}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Top 3 Caution Flags for Bedford Campus</CardTitle>
          <CardAction>
            <HorizontalTabs
              tabs={AUDIENCE_TABS}
              value={cautionFlagsAudience}
              onValueChange={setCautionFlagsAudience}
            />
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            These are the top three concerning issues for the couples in
            your care:
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {CAUTION_FLAGS_DATA.map((flag) => (
              <ScaleChartCard key={flag.question} {...flag} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Top 3 Expressed Needs for Bedford Campus</CardTitle>
          <CardAction>
            <HorizontalTabs
              tabs={AUDIENCE_TABS}
              value={expressedNeedsAudience}
              onValueChange={setExpressedNeedsAudience}
            />
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            These are the three areas where your couples are currently
            asking for help:
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {EXPRESSED_NEEDS_DATA.map((need) => (
              <ScaleChartCard key={need.question} {...need} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
