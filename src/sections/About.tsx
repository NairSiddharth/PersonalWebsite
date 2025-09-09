"use client";

import profile from "@/data/profile.json";
import resumeData from "@/data/resume.json";
import { Badge } from "@/components/ui/badge";

export default function About() {
  // Use the latest experience to determine current/previous employer
  const latestExperience = resumeData.experience[0];
  const currentEmployer = latestExperience?.company || "";

  // Determine employment text dynamically
  const employmentText =
    profile.status.toLowerCase().includes("happily employed")
      ? `Currently employed at ${currentEmployer}.`
      : profile.status.toLowerCase().includes("looking")
      ? `Previously at ${currentEmployer}.`
      : "";

  return (
    <section className="flex flex-col items-center justify-center py-12 px-6 max-w-4xl mx-auto space-y-6 text-center">
      {/* Profile Picture */}
      <img
        src="/moi.jpg"
        alt={profile.name}
        className="w-24 h-24 sm:w-24 sm:h-24 rounded-full shadow-lg object-cover border-4 border-primary"
      />

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
