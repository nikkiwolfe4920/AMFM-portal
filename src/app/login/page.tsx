import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PhotoBackdrop } from "@/components/photo-backdrop";

import { AuthCard } from "./_components/auth-card";
import { GoogleIcon } from "./_components/google-icon";
import { HeartChartLogo } from "./_components/heartchart-logo";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <PhotoBackdrop>
      <AuthCard className="relative z-10">
        <div className="flex w-full flex-col items-center gap-3 pb-4">
          <HeartChartLogo />
          <p className="text-xs">Powered by AMFM.org</p>
        </div>

        <Button variant="outline" className="text-text-secondary w-full gap-3">
          <GoogleIcon className="size-6" />
          Log in with Google
        </Button>

        <div className="flex w-full items-center gap-2">
          <div className="bg-border-secondary h-px flex-1" />
          <span className="text-text-tertiary text-sm font-medium">or</span>
          <div className="bg-border-secondary h-px flex-1" />
        </div>

        <LoginForm />

        <div className="flex items-start justify-center gap-1 text-sm">
          <span className="text-text-tertiary">Don&apos;t have an account?</span>
          <Link href="/signup" className="text-text-brand font-semibold">
            Sign up
          </Link>
        </div>
      </AuthCard>
    </PhotoBackdrop>
  );
}
