"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/app/login/_components/google-icon";
import { HeartChartLogo } from "@/app/login/_components/heartchart-logo";

import { SignupForm } from "./signup-form";
import { SignupSuccess } from "./signup-success";

export function SignupCardContent() {
  const [signedUpName, setSignedUpName] = useState<string | null>(null);

  if (signedUpName !== null) {
    return <SignupSuccess name={signedUpName} />;
  }

  return (
    <>
      <div className="flex w-full flex-col items-center gap-3 pb-4">
        <HeartChartLogo />
        <p className="text-xs">Powered by AMFM.org</p>
      </div>

      <Button variant="outline" className="w-full gap-3">
        <GoogleIcon className="size-6" />
        Sign up with Google
      </Button>

      <div className="flex w-full items-center gap-2">
        <div className="bg-border-secondary h-px flex-1" />
        <span className="text-text-tertiary text-sm font-medium">or</span>
        <div className="bg-border-secondary h-px flex-1" />
      </div>

      <SignupForm onSuccess={setSignedUpName} />

      <div className="flex items-start justify-center gap-1 text-sm">
        <span className="text-text-tertiary">Already have an account?</span>
        <Link href="/login" className="text-text-brand font-semibold">
          Log in
        </Link>
      </div>
    </>
  );
}
