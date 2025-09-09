"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import resumeData from "@/data/resume.json";

const MAX_VISIBLE_SKILLS = 5;

// Map skills to color schemes (used as Tailwind classes)
const skillCategories: Record<string, string> = {
  // Languages
  Python: "bg-purple-100 text-purple-800",
  SQL: "bg-purple-100 text-purple-800",
  Oracle: "bg-purple-100 text-purple-800",
  Postgres: "bg-purple-100 text-purple-800",
  MySQL: "bg-purple-100 text-purple-800",
  Java: "bg-purple-100 text-purple-800",
  JavaScript: "bg-purple-100 text-purple-800",
  TypeScript: "bg-purple-100 text-purple-800",
  Bash: "bg-purple-100 text-purple-800",

  // Data Engineering & ML
  ETL: "bg-blue-100 text-blue-800",
  "Data Pipelines": "bg-blue-100 text-blue-800",
  "Vector Databases": "bg-blue-100 text-blue-800",
  "Relational & Non-Relational Databases": "bg-blue-100 text-blue-800",
  Pandas: "bg-blue-100 text-blue-800",
  "scikit-learn": "bg-blue-100 text-blue-800",
  AWS: "bg-blue-100 text-blue-800",
  Sagemaker: "bg-blue-100 text-blue-800",
  "Generative AI": "bg-blue-100 text-blue-800",
  OpenAI: "bg-blue-100 text-blue-800",
  LangChain: "bg-blue-100 text-blue-800",
  LangGraph: "bg-blue-100 text-blue-800",
  Pydantic: "bg-blue-100 text-blue-800",
  MCP: "bg-blue-100 text-blue-800",

  // Backend & APIs
  "REST APIs": "bg-red-100 text-red-800",
  FastAPI: "bg-red-100 text-red-800",
  "Spring Boot": "bg-red-100 text-red-800",
  Microservices: "bg-red-100 text-red-800",

  // Frontend & Visualization
  React: "bg-green-100 text-green-800",
  HTML5: "bg-green-100 text-green-800",
  CSS: "bg-green-100 text-green-800",
  Plotly: "bg-green-100 text-green-800",
  Seaborn: "bg-green-100 text-green-800",
  Voila: "bg-green-100 text-green-800",
  Figma: "bg-green-100 text-green-800",

  // DevOps & Infrastructure
  Azure: "bg-orange-100 text-orange-800",
  Terraform: "bg-orange-100 text-orange-800",
  Git: "bg-orange-100 text-orange-800",
  "CI/CD": "bg-orange-100 text-orange-800",
  Redis: "bg-orange-100 text-orange-800",
  "AWS S3": "bg-orange-100 text-orange-800",
  "AWS Lambda": "bg-orange-100 text-orange-800",
  "AWS Aurora": "bg-orange-100 text-orange-800",
  "AWS RDS": "bg-orange-100 text-orange-800",

  // Methodologies & Tools
  "Agile Methodology": "bg-teal-100 text-teal-800",
  Waterfall: "bg-teal-100 text-teal-800",
  Jira: "bg-teal-100 text-teal-800",
  Confluence: "bg-teal-100 text-teal-800",
  Playwright: "bg-teal-100 text-teal-800",
};

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setExperiences(resumeData.experience);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="experience" className="space-y-8 flex flex-col items-center">
      <h2 className="font-heading text-3xl text-center">Experience</h2>

      {experiences.map((exp, index) => {
        const visibleSkills = exp.skills.slice(0, MAX_VISIBLE_SKILLS);
        const remainingSkills = exp.skills.slice(MAX_VISIBLE_SKILLS);

        return (
          <Card key={index} className="w-full max-w-3xl text-center shadow-md">
            <CardHeader className="text-center">
              <CardTitle>{exp.role}</CardTitle>
              <CardDescription>
                {exp.company} — {exp.location} ({exp.startDate} - {exp.endDate})
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="mb-2">{exp.summary}</p>
              <ul className="list-disc list-inside space-y-1 mb-4">
                {exp.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <div className="flex flex-wrap justify-center gap-2">
                {visibleSkills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm font-medium cursor-default ${skillCategories[skill] || "bg-gray-100 text-gray-800"} hover:opacity-90 transition`}
                  >
                    {skill}
                  </span>
                ))}

                {remainingSkills.length > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 cursor-pointer hover:opacity-90 transition">
                        +{remainingSkills.length} more
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="flex flex-wrap gap-1 max-w-xs justify-center">
                      {remainingSkills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1 rounded-full text-sm font-medium cursor-default ${skillCategories[skill] || "bg-gray-100 text-gray-800"} hover:opacity-90 transition`}
                        >
                          {skill}
                        </span>
                      ))}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
