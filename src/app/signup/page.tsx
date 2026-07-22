import { PhotoBackdrop } from "@/components/photo-backdrop";
import { AuthCard } from "@/app/login/_components/auth-card";

import { SignupCardContent } from "./_components/signup-card-content";

export default function SignupPage() {
  return (
    <PhotoBackdrop>
      <AuthCard className="relative z-10">
        <SignupCardContent />
      </AuthCard>
    </PhotoBackdrop>
  );
}
