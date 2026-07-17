import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.87-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.28v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.39l4-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.61l4 3.11C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-950 p-4">
      <main className="w-full max-w-md min-w-80 rounded-2xl bg-card p-2 shadow-lg">
        <div className="flex flex-col gap-5 rounded-md border border-border px-6 pt-5 pb-4">
          <header className="flex flex-col items-center gap-3 pb-4">
            <h1 className="flex items-center gap-1 text-2xl font-bold tracking-tight text-primary">
              he
              <Heart className="size-5 fill-primary" aria-hidden="true" />
              rt<span className="text-foreground">chart</span>
            </h1>
            <p className="text-xs text-foreground">Powered by AMFM.org</p>
          </header>

          <Button
            type="button"
            variant="outline"
            className="h-auto w-full justify-center gap-3 rounded-md py-2.5 text-base font-semibold"
          >
            <GoogleIcon className="size-6" />
            Log in with Google
          </Button>

          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm font-medium text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex w-full items-center">
                <div className="flex flex-1 items-start gap-2">
                  <Checkbox id="trusted-device" className="mt-0.5" />
                  <Label htmlFor="trusted-device" className="font-normal">
                    This is a trusted device
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-sm font-semibold"
                >
                  Forgot password
                </Button>
              </div>
            </div>

            <Button type="button" className="h-auto w-full rounded-md py-2.5 text-base">
              Log in
            </Button>
          </div>

          <div className="flex items-start justify-center gap-1">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?
            </p>
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-sm font-semibold"
            >
              Sign up
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
