import {
  BookOpen,
  Blend,
  ClipboardCheck,
  Heart,
  MessageSquareText,
  Share2,
  Sparkles,
} from "lucide-react";

import { GlobalNav } from "@/components/global-nav";
import { TopHero } from "@/components/top-hero";
import { CourseCard } from "@/components/course-card";
import { ElevatedCard } from "@/components/elevated-card";
import { ResourceListItem } from "@/components/resource-list-item";
import { FooterCta } from "@/components/footer-cta";
import { Button } from "@/components/ui/button";
import {
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HeartChartResourcesPage() {
  return (
    <div className="from-background-gradient-from to-background-gradient-to flex min-h-screen bg-gradient-to-l">
      <GlobalNav overlay />

      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-8">
          <h1 className="font-display text-display-md text-foreground font-light">
            HeartChart Resources
          </h1>

          <TopHero
            className="mt-8"
            eyebrowHeading="Let's prepare for your"
            highlightHeading="HeartChart Weekend"
            description="Three simple steps to get your people engaged—and your dashboard up and running."
            ctaLabel="Watch the Overview"
          />

          <ElevatedCard className="mt-8" innerClassName="p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <CourseCard
                step={1}
                eyebrow="Before the weekend service"
                title="Get Your Team Ready"
                videoCtaLabel="See How It Works"
                checklist={[
                  <>
                    <a href="#" className="text-primary underline">
                      Share your QR code and link
                    </a>{" "}
                    with your team to start your dashboard
                  </>,
                  <>
                    <a href="#" className="text-primary underline">
                      Upload your logo
                    </a>{" "}
                    (recommended)
                  </>,
                  <>
                    <a href="#" className="text-primary underline">
                      Share this guide with your tech team
                    </a>{" "}
                    (download)
                  </>,
                  <>
                    <a href="#" className="text-primary underline">
                      Add additional church campuses
                    </a>{" "}
                    (optional)
                  </>,
                ]}
              />
              <CourseCard
                step={2}
                eyebrow="During service"
                title={
                  <>
                    Create the
                    <br />
                    Moment
                  </>
                }
                videoCtaLabel="See How It Works"
                checklist={[
                  <>
                    <a href="#" className="text-primary underline">
                      Plan what you&rsquo;ll say
                    </a>{" "}
                    from the stage to invite everyone in
                  </>,
                  <>
                    Display to your audience{" "}
                    <a href="#" className="text-primary underline">
                      your QR code and link
                    </a>
                  </>,
                  "Give people 3 minutes to complete their HeartChart",
                ]}
              />
              <CourseCard
                step={3}
                eyebrow="Don't miss this"
                title="Point Them to the Next Step"
                videoCtaLabel="See How It Works"
                hideArrow
                checklist={[
                  "Invite your people to enter their email for their 12-page report",
                  <>
                    Use HeartChart to encourage a{" "}
                    <a href="#" className="text-primary underline">
                      next step
                    </a>{" "}
                    at your church
                  </>,
                  <>
                    <a href="#" className="text-primary underline">
                      Use your dashboard
                    </a>{" "}
                    to guide next steps
                  </>,
                ]}
              />
            </div>
          </ElevatedCard>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ElevatedCard innerClassName="p-8">
              <CardHeader className="gap-0.5 border-b px-0 pb-6">
                <CardTitle className="text-lg">Optional Resources</CardTitle>
                <CardDescription>Use what helps. It&rsquo;s all free.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 px-0 pt-6">
                <ResourceListItem
                  icon={ClipboardCheck}
                  title="HeartChart Weekend Service Kit"
                  description="Plan, host, and guide your HeartChart service moment"
                  href="#"
                  actionLabel="Download HeartChart Weekend Service Kit"
                />
                <ResourceListItem
                  icon={Share2}
                  title="HeartChart Promotional Kit"
                  description="Emails, social, and assets to drive participation"
                  href="#"
                  actionLabel="Download HeartChart Promotional Kit"
                />
                <ResourceListItem
                  icon={MessageSquareText}
                  title="HeartChart Sermon Kit"
                  description="Message framework to introduce and frame HeartChart"
                  href="#"
                  actionLabel="Download HeartChart Sermon Kit"
                />
              </CardContent>
            </ElevatedCard>

            <ElevatedCard innerClassName="p-8">
              <CardHeader className="gap-x-4 gap-y-0.5 border-b px-0 pb-6">
                <CardTitle className="text-lg">Premium Resources</CardTitle>
                <CardDescription>
                  Included with your AMFM Premium membership.
                </CardDescription>
                <CardAction>
                  <Button size="sm">
                    <Sparkles aria-hidden="true" />
                    Upgrade to Premium
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 px-0 pt-6">
                <ResourceListItem
                  icon={Blend}
                  title="HeartChart Small Group Kit"
                  description="Turn results into meaningful group conversations and growth"
                  href="#"
                  actionLabel="Download HeartChart Small Group Kit"
                />
                <ResourceListItem
                  icon={BookOpen}
                  title="HeartChart Champion Training"
                  description="Equip leaders to guide couples using HeartChart results"
                  href="#"
                  actionLabel="Download HeartChart Champion Training"
                />
                <ResourceListItem
                  icon={Heart}
                  title="HeartChart Date Night Kit"
                  description="Host an engaging event that moves couples forward"
                  href="#"
                  actionLabel="Download HeartChart Date Night Kit"
                />
              </CardContent>
            </ElevatedCard>
          </div>
        </main>

        <FooterCta
          heading="Start using all the tools today."
          ctaLabel="Upgrade to Premium"
        />
      </div>
    </div>
  );
}
