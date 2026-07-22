"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateProfileForm() {
  const [organizationName, setOrganizationName] = useState("");
  const [location, setLocation] = useState("");
  const [averageWeeklyAttendance, setAverageWeeklyAttendance] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
  }

  return (
    <form className="contents" onSubmit={handleSubmit}>
      <CardContent className="flex flex-col gap-5 pt-6">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="organization-name">Church or Organization name</Label>
          <Input
            id="organization-name"
            type="text"
            placeholder="Enter church or organization name"
            required
            value={organizationName}
            onChange={(event) => setOrganizationName(event.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="Enter your zip"
              required
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="average-weekly-attendance">Average Weekly Attendance</Label>
            <Input
              id="average-weekly-attendance"
              type="number"
              placeholder="Enter a number"
              required
              value={averageWeeklyAttendance}
              onChange={(event) => setAverageWeeklyAttendance(event.target.value)}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-border-secondary justify-end border-t pt-6">
        <Button type="submit" loading={isSubmitting}>
          Start using HeartChart
        </Button>
      </CardFooter>
    </form>
  );
}
