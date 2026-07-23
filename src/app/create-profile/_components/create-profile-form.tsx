"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { InputGroup } from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PricingCard } from "./pricing-card";

const ROLE_OPTIONS = [
  "Senior Leader",
  "Executive Leader",
  "Owner / Founder",
  "President / CEO",
  "Executive Pastor",
  "Pastor",
  "Associate Pastor",
  "Campus Pastor",
  "Marriage Pastor",
  "Family Life Pastor",
  "Ministry Leader",
  "Church Staff",
  "Director",
  "Program Director",
  "Department Leader",
  "Manager",
  "Team Leader",
  "Supervisor",
  "Coordinator",
  "HR Leader",
  "People Operations",
  "Coach",
  "Counselor",
  "Consultant",
  "Trainer",
  "Facilitator",
  "Chaplain",
  "Teacher / Educator",
  "School Administrator",
  "Nonprofit Leader",
  "Volunteer Leader",
  "Board Member",
  "Community Leader",
  "Small Group Leader",
  "Group Facilitator",
  "Administrative Staff",
  "Operations Staff",
  "Member / Participant",
  "Other",
];

const PRIMARY_GOAL_OPTIONS = [
  "Launch a marriage ministry",
  "Strengthen our existing marriage ministry",
  "Recruit Marriage Champions",
  "Train our marriage ministry team",
  "Start using HeartChart with couples",
  "Start using WeDo with couples",
  "Host a date night event",
  "Start a couples small group",
  "Start or improve pre-marriage ministry",
  "Start or improve marriage mentoring",
  "Help couples in crisis",
  "Support couples after betrayal",
  "Address conflict and communication issues",
  "Help couples grow spiritually",
  "Improve follow-up with couples",
  "Find trusted marriage resources",
  "Get certified in a relationship assessment",
  "Become a 5 Love Languages Coach",
  "Build a church-wide relationship strategy",
  "Equip our staff or campus leaders",
  "Expand marriage ministry across campuses",
  "Refer another church leader to AMFM",
  "Explore what AMFM can help us do",
];

const FREE_MEMBERSHIP_BENEFITS = [
  "Give couples free access to HeartChart",
  "Brand the experience with your church logo",
  "See simple relationship-health insights",
  "Add campuses, locations, or ministry teams",
  "Get up and running in one Sunday",
  "No credit card needed",
];

export function CreateProfileForm() {
  const [organizationName, setOrganizationName] = useState("");
  const [location, setLocation] = useState("");
  const [averageWeeklyAttendance, setAverageWeeklyAttendance] = useState("");
  const [website, setWebsite] = useState("");
  const [role, setRole] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
  }

  return (
    <form className="contents" onSubmit={handleSubmit}>
      <CardContent className="flex flex-col gap-10 pt-5 lg:flex-row lg:items-start">
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="organization-name" required>
              Church or Organization name
            </Label>
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
              <Label htmlFor="location" required>
                Location
              </Label>
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
              <Label htmlFor="average-weekly-attendance" required>
                Average Weekly Attendance
              </Label>
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

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="website" required>
              Website
            </Label>
            <InputGroup
              id="website"
              type="text"
              addon="http://"
              placeholder="yourchurch.com"
              required
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="role" required>
              Your role
            </Label>
            <Select name="role" required value={role} onValueChange={setRole}>
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="primary-goal" required>
              Your primary goal
            </Label>
            <Select
              name="primaryGoal"
              required
              value={primaryGoal}
              onValueChange={setPrimaryGoal}
            >
              <SelectTrigger id="primary-goal" className="w-full">
                <SelectValue placeholder="What's your main objective? " />
              </SelectTrigger>
              <SelectContent>
                {PRIMARY_GOAL_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full lg:w-92 lg:shrink-0">
          <PricingCard title="Free Membership" benefits={FREE_MEMBERSHIP_BENEFITS} />
        </div>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-0 px-0 pt-8 pb-0">
        <div className="border-border-secondary border-t" />
        <div className="flex justify-end px-6 py-6">
          <Button type="submit" loading={isSubmitting}>
            Start using HeartChart
          </Button>
        </div>
      </CardFooter>
    </form>
  );
}
