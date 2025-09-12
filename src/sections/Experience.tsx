"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import resumeData from "@/data/resume.json";

const MAX_VISIBLE_SKILLS = 5;

// Map skill CATEGORIES to color schemes (not individual skills)
const categoryColors: Record<string, string> = {
  "Languages": "bg-purple-100 text-purple-800",
  "Data Engineering & ML": "bg-blue-100 text-blue-800",
  "Backend & APIs": "bg-red-100 text-red-800",
  "Frontend & Visualization": "bg-green-100 text-green-800",
  "DevOps & Infrastructure": "bg-orange-100 text-orange-800",
  "Methodologies & Tools": "bg-teal-100 text-teal-800",
};

interface Experience {
  company: string;
  role: string;
  location: string;
  type: string;
  startDate: string;
  endDate: string;
  summary: string;
  description: string[];
  skills: string[];
  hasOverlap?: boolean;
  side?: 'left' | 'right';
  durationMonths?: number;
  sizeClass?: string;
  timelinePosition?: number;
  formattedStartDate?: string;
  formattedEndDate?: string;
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [mounted, setMounted] = useState(false);

  // Function to get skill color based on category
  const getSkillColor = (skill: string): string => {
    const skillCategories = resumeData.skillCategories || {};
    
    // Find which category this skill belongs to
    for (const [category, skills] of Object.entries(skillCategories)) {
      if (Array.isArray(skills) && skills.includes(skill)) {
        return categoryColors[category] || "bg-gray-100 text-gray-800";
      }
    }
    
    return "bg-gray-100 text-gray-800"; // Default color for unmapped skills
  };

  // Format date for display (e.g., "2025-06-01" -> "June 2025")
  const formatDateForDisplay = (dateStr: string): string => {
    if (dateStr === "Present" || dateStr.toLowerCase() === "present") {
      return "Present";
    }
    
    try {
      // Parse the date string and adjust for UTC to avoid timezone issues
      const [year, month] = dateStr.split('-').map(Number);
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      // month is 1-indexed in the string, but we need 0-indexed for array
      return `${monthNames[month - 1]} ${year}`;
    } catch {
      return dateStr; // Return as-is if parsing fails
    }
  };

  // Helper function to calculate months between dates
  const calculateDurationInMonths = (startDate: string, endDate: string): number => {
    try {
      const start = new Date(startDate);
      const end = endDate === "Present" ? new Date() : new Date(endDate);
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.warn(`Invalid dates for duration calculation: ${startDate} - ${endDate}`);
        return 0;
      }
      
      const yearsDiff = end.getFullYear() - start.getFullYear();
      const monthsDiff = end.getMonth() - start.getMonth();
      
      return yearsDiff * 12 + monthsDiff + 1; // +1 to include partial months
    } catch (error) {
      console.warn(`Error calculating duration:`, error);
      return 0;
    }
  };

  // Helper function to calculate timeline position based on start date
  const calculateTimelinePosition = (startDate: string, allExperiences: Experience[]): number => {
    try {
      const parseDate = (dateStr: string) => new Date(dateStr);
      const allStartDates = allExperiences.map(exp => parseDate(exp.startDate));
      const validDates = allStartDates.filter(date => !isNaN(date.getTime()));
      
      if (validDates.length === 0) return 0;
      
      const minDate = new Date(Math.min(...validDates.map(d => d.getTime())));
      const maxDate = new Date(Math.max(...validDates.map(d => d.getTime())));
      
      const totalTime = maxDate.getTime() - minDate.getTime();
      if (totalTime === 0) return 0;
      
      const expDate = parseDate(startDate);
      if (isNaN(expDate.getTime())) return 0;
      
      return ((expDate.getTime() - minDate.getTime()) / totalTime) * 100;
    } catch (error) {
      console.warn(`Error calculating timeline position for ${startDate}:`, error);
      return 0;
    }
  };

  // Helper function to get size class based on duration
  const getSizeClass = (durationMonths: number): string => {
    if (durationMonths <= 3) return "lg:w-4/12"; // Small (internships, short roles)
    if (durationMonths <= 12) return "lg:w-5/12"; // Medium (1 year or less)
    return "lg:w-6/12"; // Large (long-term positions)
  };

  // MOVE ALL HOOKS BEFORE ANY CONDITIONAL RETURNS
  
  // First useEffect: Process experiences data
  useEffect(() => {
    // Sort experiences by start date (most recent first)
    const sortedExperiences = [...resumeData.experience].sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateB.getTime() - dateA.getTime();
    });
    
    // Calculate duration and timeline position for each experience
    const experiencesWithMetadata = sortedExperiences.map(exp => ({
      ...exp,
      durationMonths: calculateDurationInMonths(exp.startDate, exp.endDate),
      timelinePosition: 0, // Will be calculated after we have all experiences
      formattedStartDate: formatDateForDisplay(exp.startDate),
      formattedEndDate: formatDateForDisplay(exp.endDate)
    }));

    // Calculate timeline positions
    experiencesWithMetadata.forEach(exp => {
      exp.timelinePosition = calculateTimelinePosition(exp.startDate, experiencesWithMetadata);
    });

    // Detect overlaps and assign sides
    const experiencesWithLayout = experiencesWithMetadata.map((exp, index) => {
      const currentStart = new Date(exp.startDate);
      const currentEnd = exp.endDate === "Present" ? new Date() : new Date(exp.endDate);
      
      // Find overlapping experiences
      const overlappingExperiences = experiencesWithMetadata.filter((otherExp, otherIndex) => {
        if (index === otherIndex) return false;
        
        const otherStart = new Date(otherExp.startDate);
        const otherEnd = otherExp.endDate === "Present" ? new Date() : new Date(otherExp.endDate);
        
        return (currentStart <= otherEnd && currentEnd >= otherStart);
      });
      
      const hasOverlap = overlappingExperiences.length > 0;
      let side: 'left' | 'right' = index % 2 === 0 ? 'left' : 'right';
      
      // If there's an overlap, put the longer role on the left, shorter on the right
      if (hasOverlap) {
        const longestOverlapping = overlappingExperiences.reduce((longest, current) => 
          current.durationMonths! > longest.durationMonths! ? current : longest
        );
        
        // If this is the longer role, put it on the left
        if (exp.durationMonths! >= longestOverlapping.durationMonths!) {
          side = 'left';
        } else {
          side = 'right';
        }
      }
      
      return {
        ...exp,
        hasOverlap,
        side,
        sizeClass: getSizeClass(exp.durationMonths!)
      };
    });
    
    setExperiences(experiencesWithLayout);
    setMounted(true);
  }, []);

  // Second useEffect: Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 800,          // controls speed
      easing: "ease-out-cubic",
      once: true,             // animate only the first time scrolling into view
      anchorPlacement: "center-bottom", // default for fade-up
    });
  }, []); // Run once on mount

  // NOW we can have conditional returns after all hooks
  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes flow {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        
        @keyframes hueRotate {
          0% {
            filter: hue-rotate(0deg) brightness(1.1);
          }
          100% {
            filter: hue-rotate(360deg) brightness(1.1);
          }
        }
        
        .timeline-gradient {
          background: linear-gradient(
            180deg,
            #667eea 0%,
            #764ba2 15%,
            #f093fb 30%,
            #f5576c 45%,
            #fda085 60%,
            #4facfe 75%,
            #43e97b 90%,
            #667eea 100%
          );
          background-size: 100% 300%;
          animation: flow 8s ease-in-out infinite, hueRotate 16s linear infinite;
          width: 4px;
        }
      `}</style>
      
      <section id="experience" className="space-y-8 py-12 px-6">
        <h2 className="font-heading text-3xl text-center mb-12">Experience</h2>

        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Animated Flowing Gradient Timeline - The vertical bar in the middle */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full hidden lg:block" style={{ width: '4px' }}>
              <div className="timeline-gradient h-full rounded-full shadow-lg" />
            </div>

            {/* Experience Items */}
            <div className="space-y-8">
              {experiences.map((exp, index) => {
                const visibleSkills = exp.skills.slice(0, MAX_VISIBLE_SKILLS);
                const remainingSkills = exp.skills.slice(MAX_VISIBLE_SKILLS);
                const isLeft = exp.side === 'left';

                return (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline Node - simplified overlap indicator */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden lg:flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full border-4 border-background shadow-lg ${
                        exp.hasOverlap ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-primary'
                      }`}>
                      </div>
                      
                      {/* Duration indicator under the node */}
                      <div className="mt-1 px-2 py-1 bg-muted rounded text-xs font-medium">
                        {exp.durationMonths && exp.durationMonths > 0 ? `${exp.durationMonths}mo` : '?'}
                      </div>
                    </div>

                    {/* Date Badge on Timeline - no variant change for overlap */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-12 hidden lg:block">
                      <Badge variant="secondary" className="px-3 py-1 text-xs font-medium whitespace-nowrap">
                        {exp.formattedStartDate} - {exp.formattedEndDate}
                      </Badge>
                    </div>

                    {/* Card Container with dynamic sizing and AOS animation */}
                    <div
                      className={`w-full ${exp.sizeClass || 'lg:w-5/12'} ${
                        isLeft ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'
                      }`}
                      data-aos="fade-up"
                      data-aos-delay={index * 100} // Stagger animations
                      data-aos-anchor-placement="center-bottom"
                    >
                      <Card
                        className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
                          isLeft ? 'lg:text-right' : 'lg:text-left'
                        } ${exp.hasOverlap ? 'ring-2 ring-orange-400 ring-opacity-40' : ''}`}
                      >
                        <CardHeader>
                          <CardTitle className="text-lg font-bold">{exp.role}</CardTitle>
                          <CardDescription className="text-base font-medium">
                            {exp.company} — {exp.location}
                            {exp.hasOverlap && (
                              <span className="ml-2 text-orange-600 text-sm font-semibold">
                                ● Concurrent Role
                              </span>
                            )}
                          </CardDescription>
                          {/* Mobile date and duration display */}
                          <div className="lg:hidden flex flex-wrap gap-2">
                            <Badge variant="secondary" className="px-2 py-1 text-xs">
                              {exp.formattedStartDate} - {exp.formattedEndDate}
                            </Badge>
                            <Badge variant="outline" className="px-2 py-1 text-xs">
                              {exp.durationMonths} months
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {exp.summary}
                          </p>
                          
                          <ul
                            className={`space-y-2 mb-6 text-sm ${
                              isLeft ? 'lg:text-right' : 'lg:text-left'
                            }`}
                          >
                            {exp.description.map((item, idx) => (
                              <li
                                key={idx}
                                className={`flex items-start ${isLeft ? 'lg:flex-row-reverse' : ''}`}
                              >
                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mx-3 flex-shrink-0"></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          <div className={`flex flex-wrap gap-2 ${isLeft ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                            {visibleSkills.map((skill) => (
                              <span
                                key={skill}
                                className={`px-3 py-1 rounded-full text-xs font-medium cursor-default ${getSkillColor(skill)} hover:opacity-90 transition`}
                              >
                                {skill}
                              </span>
                            ))}

                            {remainingSkills.length > 0 && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 cursor-pointer hover:opacity-90 transition">
                                    +{remainingSkills.length} more
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent 
                                  side="top" 
                                  className="bg-transparent border-0 shadow-none p-0 max-w-md"
                                  sideOffset={5}
                                >
                                  <div className="flex flex-wrap gap-1 justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-gray-200 dark:border-gray-700">
                                    {/* Show ALL skills when hovering, including the visible ones for completeness */}
                                    {exp.skills.map((skill) => (
                                      <span
                                        key={skill}
                                        className={`px-2 py-1 rounded-full text-xs font-medium cursor-default ${getSkillColor(skill)}`}
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Connector Line to Timeline (Desktop only) */}
                    <div className={`absolute top-8 transform -translate-y-1/2 h-0.5 bg-primary/30 hidden lg:block ${
                      isLeft ? 'right-1/2 mr-3' : 'left-1/2 ml-3'
                    }`} style={{
                      width: exp.sizeClass === 'lg:w-4/12' ? '8rem' : 
                             exp.sizeClass === 'lg:w-5/12' ? '6rem' : '4rem'
                    }}></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}