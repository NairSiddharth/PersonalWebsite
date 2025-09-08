"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import rawResumeData from "@/data/resume.json";

// --- 1. TypeScript interfaces ---
interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;          // Business impact
  description: string[];    // Technical points
  skills: string[];         // Tech stack / skills
}

interface ResumeData {             // Overall resume summary
  experience: ExperienceItem[];
}

// --- 2. Cast imported JSON to typed variable ---
const resumeData: ResumeData = rawResumeData;

// --- 3. Component ---
export default function Experience() {
  const experiences = resumeData.experience;
  const MAX_VISIBLE_SKILLS = 5;

  return (
    <section className="space-y-6 py-12 px-6 max-w-4xl mx-auto">
      <h2 className="font-heading text-3xl text-center">Experience</h2>

      <div className="space-y-6">
        {experiences.map((exp, idx) => {
          const visibleSkills = exp.skills.slice(0, MAX_VISIBLE_SKILLS);
          const remainingSkills = exp.skills.slice(MAX_VISIBLE_SKILLS);

          return (
            <div key={idx} className="border rounded-lg p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                <h3 className="font-semibold text-xl">{exp.role}</h3>
                <span className="text-sm text-muted-foreground">
                  {exp.company} | {exp.location} | {exp.startDate} - {exp.endDate}
                </span>
              </div>

              <p className="font-body text-base mb-2">{exp.summary}</p>

              <ul className="list-disc list-inside mb-4 space-y-1">
                {exp.description.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>

              {/* Skills badges */}
              <TooltipProvider>
                <div className="flex flex-wrap gap-2">
                  {visibleSkills.map((skill, i) => (
                    <Badge key={i} variant="secondary">{skill}</Badge>
                  ))}

                  {remainingSkills.length > 0 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary">+{remainingSkills.length} more</Badge>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {remainingSkills.map((skill, i) => (
                            <Badge key={i} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </TooltipProvider>
            </div>
          );
        })}
      </div>
    </section>
  );
}
