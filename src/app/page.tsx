import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PhotoBackdrop } from "@/components/photo-backdrop";

const REVERSED_OUTLINE =
  "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white";

export default function Home() {
  return (
    <PhotoBackdrop>
      <div className="relative z-10 flex flex-col items-center gap-6 p-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-200">
          AMFM Portal
        </h1>
        <p className="text-gray-400">
          Next.js + TypeScript + Tailwind CSS + shadcn/ui
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/login">Get Started</Link>
          </Button>
          <Button asChild variant="outline" className={REVERSED_OUTLINE}>
            <Link href="/design-system">Design System</Link>
          </Button>
          <Button asChild variant="outline" className={REVERSED_OUTLINE}>
            <a
              href="https://github.com/nikkiwolfe4920/AMFM-portal/blob/main/DESIGN.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              DESIGN.MD
            </a>
          </Button>
        </div>
      </div>
    </PhotoBackdrop>
  );
}
