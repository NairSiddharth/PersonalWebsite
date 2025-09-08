"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import resumeData from "@/data/resume.json";

const MAX_VISIBLE_SKILLS = 5;

interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
  description: string[];
  skills: string[];
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    setExperiences(resumeData.experience);
  }, []);

  return (
    <section className="space-y-8">
      <h2 className="font-heading text-3xl">Experience</h2>

      {experiences.map((exp, index) => {
        const visibleSkills = exp.skills.slice(0, MAX_VISIBLE_SKILLS);
        const remainingSkills = exp.skills.slice(MAX_VISIBLE_SKILLS);

        return (
          <div
            key={index}
            className="space-y-2 p-4 border rounded-lg bg-card text-card-foreground"
          >
            {/* Role and Company */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h3 className="font-heading text-xl">{exp.role}</h3>
                <p className="font-body text-sm text-muted-foreground">
                  {exp.company} — {exp.location}
                </p>
              </div>
              <span className="font-body text-sm text-muted-foreground">
                {exp.startDate} - {exp.endDate}
              </span>
            </div>

            {/* Summary */}
            <p className="font-body text-base mt-2">{exp.summary}</p>

            {/* Description */}
            <ul className="list-disc list-inside space-y-1 mt-2">
              {exp.description.map((item, idx) => (
                <li key={idx} className="font-body text-sm text-foreground">
                  {item}
                </li>
              ))}
            </ul>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mt-3">
              {visibleSkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}

              {remainingSkills.length > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="secondary">+{remainingSkills.length} more</Badge>
                  </TooltipTrigger>
                  <TooltipContent className="flex flex-wrap gap-1 max-w-xs">
                    {remainingSkills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
