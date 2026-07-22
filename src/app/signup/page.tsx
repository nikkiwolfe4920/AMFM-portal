import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PhotoBackdrop } from "@/components/photo-backdrop";
import { AuthCard } from "@/app/login/_components/auth-card";
import { GoogleIcon } from "@/app/login/_components/google-icon";
import { HeartChartLogo } from "@/app/login/_components/heartchart-logo";

import { SignupForm } from "./_components/signup-form";

export default function SignupPage() {
  return (
    <PhotoBackdrop>
      <AuthCard className="relative z-10">
        <div className="flex w-full flex-col items-center gap-3 pb-4">
          <HeartChartLogo />
          <p className="text-xs">Powered by AMFM.org</p>
        </div>

        <Button variant="outline" className="text-text-secondary w-full gap-3">
          <GoogleIcon className="size-6" />
          Sign up with Google
        </Button>

        <div className="flex w-full items-center gap-2">
          <div className="bg-border-secondary h-px flex-1" />
          <span className="text-text-tertiary text-sm font-medium">or</span>
          <div className="bg-border-secondary h-px flex-1" />
        </div>

        <SignupForm />

        <div className="flex items-start justify-center gap-1 text-sm">
          <span className="text-text-tertiary">Already have an account?</span>
          <Link href="/login" className="text-text-brand font-semibold">
            Log in
          </Link>
        </div>
      </AuthCard>
    </PhotoBackdrop>
  );
}
