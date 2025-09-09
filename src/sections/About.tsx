"use client";
import { useEffect, useState, useRef } from "react";
import profile from "@/data/profile.json";
import resumeData from "@/data/resume.json";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
            "Welcome! 👋",
            "I'm Siddharth Nair",
            "Thanks for visiting my portfolio",
            "Let's explore together..."
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
        
        {/* Optional: Click anywhere to skip */}
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
  const employmentText =
    profile.status.toLowerCase().includes("happily employed")
      ? `Currently employed at ${currentEmployer}.`
      : profile.status.toLowerCase().includes("looking")
      ? `Previously at ${currentEmployer}.`
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
    }, 300); // Faster transition for skip
  };

  return (
    <>
      {showGreeting && (
        <div className={`transition-opacity duration-800 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <GreetingScreen onComplete={handleGreetingComplete} onSkip={handleSkip} />
        </div>
      )}
      
      {/* Your existing About content */}
      <section className={`flex flex-col items-center justify-center py-12 px-6 max-w-4xl mx-auto space-y-6 text-center transition-opacity duration-800 ${showGreeting ? 'opacity-0' : 'opacity-100'}`}>
        {/* Profile Picture */}
        <Avatar className="w-36 h-36 sm:w-24 sm:h-24 shadow-sm">
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
    </>
  );
}