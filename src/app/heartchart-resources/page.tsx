import { BookOpen, Blend, ClipboardCheck, Heart, MessageSquareText, Share2 } from "lucide-react";

import { GlobalNav } from "@/components/global-nav";
import { ResourceListItem } from "@/components/resource-list-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HeartChartResourcesPage() {
  return (
    <div className="bg-background flex min-h-screen">
      <div className="sticky top-0 h-screen shrink-0 p-3">
        <GlobalNav />
      </div>

      <main className="flex-1 p-8">
        {/* Bare <h1> standing in for the not-yet-approved "Page header" pattern (Figma node 0:751). */}
        <h1 className="text-3xl font-semibold tracking-tight">
          HeartChart Resources
        </h1>

        {/* Featured Training hero + numbered Course Card steps omitted — no approved COMPONENTS.md component/pattern covers them yet. */}

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Resources to help you make the most of HeartChart.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <ResourceListItem
                icon={ClipboardCheck}
                title="Complete your HeartChart assessment"
                description="Answer a short set of questions to build your profile."
                href="#"
                actionLabel="Open Complete your HeartChart assessment"
              />
              <ResourceListItem
                icon={Share2}
                title="Share your results"
                description="Invite your spouse or a friend to compare HeartCharts."
                href="#"
                actionLabel="Open Share your results"
              />
              <ResourceListItem
                icon={MessageSquareText}
                title="Talk with a champion"
                description="Connect with a trained Marriage Champion in your church."
                href="#"
                actionLabel="Open Talk with a champion"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Relationship Tools</CardTitle>
              <CardDescription>
                Go deeper with tools built around your results.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <ResourceListItem
                icon={Blend}
                title="Explore compatibility insights"
                description="See how your HeartChart compares across key relationship areas."
                href="#"
                actionLabel="Open Explore compatibility insights"
              />
              <ResourceListItem
                icon={BookOpen}
                title="Read the HeartChart guide"
                description="Learn how to interpret your results and next steps."
                href="#"
                actionLabel="Open Read the HeartChart guide"
              />
              <ResourceListItem
                icon={Heart}
                title="Strengthen your marriage"
                description="Browse exercises and resources tailored to your HeartChart."
                href="#"
                actionLabel="Open Strengthen your marriage"
              />
            </CardContent>
          </Card>
        </div>

        {/* Full-bleed Footer CTA banner omitted — no approved COMPONENTS.md component/pattern covers it yet. */}
      </main>
    </div>
  );
}
