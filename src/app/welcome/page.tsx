import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PhotoBackdrop } from "@/components/photo-backdrop";
import { VideoPlayer } from "@/components/video-player";

// Placeholders — no auth/session or church-profile data source exists yet.
// Replace once a real account/church lookup is wired up.
const ADMIN_FIRST_NAME = "Jordan";
const CHURCH_NAME = "Fellowship of the Parks";

export default function WelcomePage() {
  return (
    <PhotoBackdrop scrim="radial" className="gap-16 px-8 py-16">
      <div className="relative z-10 flex max-w-[1440px] flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="font-display text-display-2xl text-nav-foreground font-light tracking-[-1.44px]">
            Welcome, {ADMIN_FIRST_NAME}.
          </h1>
          <p className="font-display text-display-lg text-nav-foreground-muted font-light">
            Let&apos;s get <span className="text-highlight-gold">{CHURCH_NAME}</span>
            <br />
            ready to strengthen relationships.
          </p>
        </div>

        <VideoPlayer
          poster="/login-background.jpg"
          title="Introduction video"
          className="max-w-[560px]"
        />

        <Button asChild>
          <Link href="/">
            <ArrowRight className="size-5" aria-hidden />
            Get Started
          </Link>
        </Button>
      </div>
    </PhotoBackdrop>
  );
}
