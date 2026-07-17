import Link from "next/link";

import { Button } from "@/components/ui/button";

import { AuthCard } from "./_components/auth-card";
import { GoogleIcon } from "./_components/google-icon";
import { HeartChartLogo } from "./_components/heartchart-logo";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      {/*
        Placeholder for the Figma background photo — the asset host
        (figma.com) is blocked by this environment's egress policy, so it
        could not be downloaded. Drop the exported photo at
        public/login-background.jpg and swap the class below for
        bg-[url('/login-background.jpg')] bg-cover bg-center.
      */}
      <div className="from-overlay absolute inset-0 bg-gradient-to-br via-slate-800 to-black" />

      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden backdrop-blur-[20px]">
        <div className="bg-overlay absolute inset-0 opacity-85 backdrop-blur-[8px]" />

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
      </div>
    </div>
  );
}
