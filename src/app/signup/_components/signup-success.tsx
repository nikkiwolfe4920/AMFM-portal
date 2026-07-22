import Link from "next/link";
import { CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SignupSuccessProps {
  name: string;
}

export function SignupSuccess({ name }: SignupSuccessProps) {
  const firstName = name.trim().split(/\s+/)[0];

  return (
    <div className="flex w-full flex-col items-center gap-5 text-center" role="status">
      <div className="bg-status-success/10 flex size-12 items-center justify-center rounded-full">
        <CircleCheck aria-hidden="true" className="text-status-success size-6" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-lg font-semibold text-foreground">
          {firstName ? `You're all set, ${firstName}!` : "You're all set!"}
        </h1>
        <p className="text-text-tertiary text-sm">
          Your HeartChart account has been created. Continue to set up your
          church profile.
        </p>
      </div>
      <Button asChild className="w-full">
        <Link href="/create-profile">Continue to profile setup</Link>
      </Button>
    </div>
  );
}
