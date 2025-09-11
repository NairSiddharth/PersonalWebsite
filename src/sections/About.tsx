"use client";
import { useEffect, useState, useRef } from "react";
import profile from "@/data/profile.json";
import resumeData from "@/data/resume.json";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, MapPin, Briefcase, GraduationCap, Code } from "lucide-react";

// TypeIt interface for TypeScript
interface TypeItInstance {
  go(): TypeItInstance;
  destroy(): void;
}

declare global {
  interface Window {
    TypeIt: any;
  }
}

interface GreetingScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

function GreetingScreen({ onComplete, onSkip }: GreetingScreenProps) {
  const typeItRef = useRef<HTMLSpanElement>(null);
  const instanceRef = useRef<TypeItInstance | null>(null);

  useEffect(() => {
    // Load TypeIt from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/typeit/8.7.1/index.umd.js';
    script.async = true;
    
    script.onload = () => {
      if (typeItRef.current && window.TypeIt) {
        // Create TypeIt instance
        instanceRef.current = new window.TypeIt(typeItRef.current, {
          strings: [
            "Hi! 👋",
            "I'm Siddharth Nair",
            "Thanks for visiting my personal website",
            "Take a look around!"
          ],
          speed: 75,
          deleteSpeed: 50,
          waitUntilVisible: true,
          cursor: true,
          cursorChar: "|",
          cursorSpeed: 1000,
          afterComplete: () => {
            // Wait a moment then fade out and show main content
            setTimeout(() => {
              onComplete();
            }, 2000);
          }
        }).go();
      }
    };

    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center relative max-w-2xl mx-auto px-6">
        {/* Skip Button */}
        <Button
          onClick={onSkip}
          variant="ghost"
          size="sm"
          className="absolute -top-4 -right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
          <span className="sr-only">Skip animation</span>
        </Button>

        <div className="text-4xl md:text-6xl font-heading text-foreground mb-6">
          <span ref={typeItRef}></span>
        </div>
        
        <div className="w-16 h-1 bg-primary mx-auto animate-pulse mb-8"></div>
        
        {/*Click anywhere to skip */}
        <p className="text-sm text-muted-foreground">
          Click <X className="w-3 h-3 inline" /> to skip or wait for the animation to complete
        </p>
      </div>
    </div>
  );
}

export default function About() {
  const [showGreeting, setShowGreeting] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Latest experience for employment text
  const latestExperience = resumeData.experience[0];
  const currentEmployer = latestExperience?.company || "";
  const currentRole = latestExperience?.role || "";
  
  // Calculate years of experience
  const firstExperience = resumeData.experience[resumeData.experience.length - 1];
  const yearsOfExperience = new Date().getFullYear() - new Date(firstExperience?.startDate || "2021-06-01").getFullYear();
  
  // Get top skills (first 8 from different categories)
  const topSkills = [
    "Python", "TypeScript", "React", "AWS", 
    "Machine Learning", "FastAPI", "Docker", "PostgreSQL"
  ];

  // Quick stats for compact display
  const quickStats = [
    { icon: MapPin, value: "Houston, TX" },
    { icon: Briefcase, value: `${yearsOfExperience}+ years exp` },
    { icon: GraduationCap, value: "Texas A&M" },
    { icon: Code, value: "Full-Stack" }
  ];

  const employmentText =
    profile.status.toLowerCase().includes("happily employed")
      ? `${currentRole} at ${currentEmployer}`
      : profile.status.toLowerCase().includes("looking")
      ? `Previously ${currentRole} at ${currentEmployer}`
      : "";

  useEffect(() => {
    const hasSeenGreeting = sessionStorage.getItem('hasSeenGreeting');
    if (!hasSeenGreeting) {
      setShowGreeting(true);
    }
  }, []);

  const handleGreetingComplete = () => {
    sessionStorage.setItem('hasSeenGreeting', 'true');
    setFadeOut(true);
    setTimeout(() => {
      setShowGreeting(false);
    }, 800);
  };

  const handleSkip = () => {
    sessionStorage.setItem('hasSeenGreeting', 'true');
    setFadeOut(true);
    setTimeout(() => {
      setShowGreeting(false);
    }, 300);
  };

  return (
    <>
      {showGreeting && (
        <div className={`transition-opacity duration-800 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <GreetingScreen onComplete={handleGreetingComplete} onSkip={handleSkip} />
        </div>
      )}
      
      {/* Compact About section optimized for side-by-side layout */}
      <section className={`py-8 transition-opacity duration-800 ${showGreeting ? 'opacity-0' : 'opacity-100'}`}>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-left">About Me</h2>
            
            {/* Avatar and Name Section */}
            <div className="flex flex-col items-center space-y-4 mb-6">
              <Avatar className="w-48 h-48 lg:w-56 lg:h-56 shadow-xl ring-4 ring-background">
                <AvatarImage src="/moi.jpg" alt={profile.name} />
                <AvatarFallback className="text-3xl">{profile.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-sm text-muted-foreground">{employmentText}</p>
                <Badge variant="secondary" className="mt-2">
                  🌟 {profile.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Bio */}
          <Card className="border-muted">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {profile.summary}
              </p>
            </CardContent>
          </Card>

          {/* Quick Stats Grid - 2x2
          <div className="grid grid-cols-2 gap-2">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs font-medium truncate">{stat.value}</span>
                </div>
              );
            })}
          </div> */}

          {/* Skills
          <div>
            <h3 className="text-sm font-semibold mb-3">Core Technologies</h3>
            <div className="flex flex-wrap gap-1.5">
              {topSkills.slice(0, 6).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs px-2 py-0.5">
                  {skill}
                </Badge>
              ))}
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                +20 more
              </Badge>
            </div>
          </div> */}

          {/* Currently Learning - Compact Card */}
          <Card className="bg-muted/30 border-muted">
            <CardContent className="p-3">
              <div className="flex items-start gap-2">
                <span className="relative flex h-2 w-2 mt-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold mb-1">Currently Exploring</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    Sveltekit for Full-Stack Development, Algorithm Development, & a new recipe book (Unofficial Studio Ghibli Cookbook FTW)!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        
        </div>
      </section>
    </>
  );
}