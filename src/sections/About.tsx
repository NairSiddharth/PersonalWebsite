"use client";

import profile from "@/data/profile.json";
import resumeData from "@/data/resume.json";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function About() {
  // Latest experience for employment text
  const latestExperience = resumeData.experience[0];
  const currentEmployer = latestExperience?.company || "";

  const employmentText =
    profile.status.toLowerCase().includes("happily employed")
      ? `Currently employed at ${currentEmployer}.`
      : profile.status.toLowerCase().includes("looking")
      ? `Previously at ${currentEmployer}.`
      : "";

  return (
    <section className="flex flex-col items-center justify-center py-12 px-6 max-w-4xl mx-auto space-y-6 text-center">
      {/* Profile Picture */}
      <Avatar className="w-24 h-24 sm:w-24 sm:h-24 border-4 border-primary shadow-lg">
        <AvatarImage src="/moi.jpg" alt={profile.name} />
        <AvatarFallback>{profile.name[0]}</AvatarFallback>
      </Avatar>

      {/* Header */}
      <h1 className="text-4xl font-bold">Who Am I?</h1>

      {/* Status Badge */}
      <Badge variant="secondary" className="mb-2">
        🌟 {profile.status}
      </Badge>

      {/* Employment Badge */}
      {employmentText && (
        <Badge variant="default" className="mb-4">
          {employmentText}
        </Badge>
      )}

      {/* Description */}
      <p className="text-base text-muted-foreground max-w-2xl">
        {profile.summary}
      </p>
    </section>
  );
}
