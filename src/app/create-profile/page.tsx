import { PhotoBackdrop } from "@/components/photo-backdrop";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartChartLogo } from "@/app/login/_components/heartchart-logo";

import { CreateProfileForm } from "./_components/create-profile-form";

export default function CreateProfilePage() {
  return (
    <PhotoBackdrop className="px-4 py-8 sm:px-8">
      <Card className="relative z-10 w-full max-w-4xl gap-0 rounded-2xl border-none py-0 shadow-xl">
        <CardHeader className="flex flex-col gap-0 px-6 pt-6">
          <div className="flex w-full items-center gap-4">
            <div className="flex flex-1 flex-col gap-0.5">
              <CardTitle className="font-display text-display-md leading-[2.5rem] text-foreground font-light">
                Create profile
              </CardTitle>
              <CardDescription className="text-text-tertiary">
                Help us personalize your experience
              </CardDescription>
            </div>
            <HeartChartLogo />
          </div>
          <div className="border-border-secondary mt-5 w-full border-t" />
        </CardHeader>

        <CreateProfileForm />
      </Card>
    </PhotoBackdrop>
  );
}
