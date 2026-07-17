import type * as React from "react";

import { cn } from "@/lib/utils";

export function AuthCard({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "bg-background shadow-card flex min-w-80 flex-col rounded-2xl p-2",
        className
      )}
    >
      <div className="flex flex-col gap-0 rounded-md border border-black/10 px-6 pt-5 pb-4">
        <div className="flex w-90 max-w-90 flex-col items-center gap-5">
          {children}
        </div>
      </div>
    </div>
  );
}
