"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { PasswordRequirementItem } from "./password-requirement-item";

const MIN_PASSWORD_LENGTH = 8;
const SPECIAL_CHARACTER_PATTERN = /[^A-Za-z0-9]/;

interface SignupFormProps {
  onSuccess: (name: string) => void;
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const checksId = useId();

  const hasMinLength = password.length >= MIN_PASSWORD_LENGTH;
  const hasSpecialCharacter = SPECIAL_CHARACTER_PATTERN.test(password);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    onSuccess(name);
  }

  return (
    <form className="flex w-full flex-col items-center gap-6" onSubmit={handleSubmit}>
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            pattern=".*[^A-Za-z0-9].*"
            title={`Must be at least ${MIN_PASSWORD_LENGTH} characters and contain one special character`}
            aria-describedby={checksId}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div id={checksId} className="flex w-full flex-col gap-3">
          <PasswordRequirementItem met={hasMinLength}>
            Must be at least {MIN_PASSWORD_LENGTH} characters
          </PasswordRequirementItem>
          <PasswordRequirementItem met={hasSpecialCharacter}>
            Must contain one special character
          </PasswordRequirementItem>
        </div>
      </div>

      <Button type="submit" className="w-full" loading={isSubmitting}>
        Get started – It&apos;s Free
      </Button>
    </form>
  );
}
