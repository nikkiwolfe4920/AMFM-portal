"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DposystemStory } from "@/app/_components/dposystem-story";

export function DposystemLearnMore() {
  return (
    <Dialog>
      <DialogTrigger className="text-sm font-semibold text-white underline underline-offset-4 hover:text-gray-200 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/50">
        Learn More
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">About DPOsystem</DialogTitle>
        <DposystemStory />
      </DialogContent>
    </Dialog>
  );
}
