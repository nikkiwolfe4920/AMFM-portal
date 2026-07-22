import { PhotoBackdrop } from "@/components/photo-backdrop";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartChartLogo } from "@/app/login/_components/heartchart-logo";

import { CreateProfileForm } from "./_components/create-profile-form";

export default function CreateProfilePage() {
  return (
    <PhotoBackdrop className="px-4 py-8 sm:px-8">
      <Card className="relative z-10 w-full max-w-2xl rounded-2xl border-none shadow-xl">
        <CardHeader className="border-border-secondary border-b">
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Create profile
          </CardTitle>
          <CardDescription>Help us personalize your experience</CardDescription>
          <CardAction>
            <HeartChartLogo />
          </CardAction>
        </CardHeader>

        <CreateProfileForm />
      </Card>
    </PhotoBackdrop>
  );
}
