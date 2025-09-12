"use client";
import { useEffect, useState, useRef } from "react";
import profile from "@/data/profile.json";
import resumeData from "@/data/resume.json";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, MessageCircle } from "lucide-react";

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
    // Check if TypeIt is already loaded
    if (window.TypeIt) {
      initializeTypeIt();
      return;
    }

    // Only load script if TypeIt isn't available
    const existingScript = document.querySelector('script[src*="typeit"]');
    if (existingScript) {
      // Script exists but TypeIt isn't ready yet, wait for it
      const checkTypeIt = setInterval(() => {
        if (window.TypeIt) {
          clearInterval(checkTypeIt);
          initializeTypeIt();
        }
      }, 100);
      return () => clearInterval(checkTypeIt);
    }

    // Load TypeIt from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/typeit/8.7.1/index.umd.js';
    script.async = true;
    
    script.onload = () => {
      initializeTypeIt();
    };

    script.onerror = () => {
      console.error('Failed to load TypeIt script');
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
      // Don't remove script as it might be used by other components
    };

    function initializeTypeIt() {
      if (typeItRef.current && window.TypeIt && !instanceRef.current) {
        // Clear any existing content in the element
        typeItRef.current.innerHTML = '';
        
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
    }
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

interface AboutProps {
  onConnectClick: () => void;
}

export default function About({ onConnectClick }: AboutProps) {
  const [showGreeting, setShowGreeting] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Latest experience for employment text - removed as discussed

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
      
      {/* About section with connect button */}
      <section className={`py-12 transition-opacity duration-800 ${showGreeting ? 'opacity-0' : 'opacity-100'}`}>
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">About Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Building innovative solutions with modern technology and a passion for continuous learning.
            </p>
          </div>

          {/* Avatar and Name Section */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-48 h-48 lg:w-56 lg:h-56 shadow-xl ring-4 ring-background">
              <AvatarImage src="/moi.jpg" alt={profile.name} />
              <AvatarFallback className="text-3xl">{profile.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              {/* Removed employment text as discussed */}
              <Badge variant="secondary" className="mt-2">
                🌟 {profile.status}
              </Badge>
            </div>
          </div>

          {/* Bio */}
          <Card className="border-muted">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line text-center">
                {profile.summary}
              </p>
            </CardContent>
          </Card>

          {/* Currently Learning */}
          <Card className="bg-muted/30 border-muted">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <span className="relative flex h-3 w-3 mt-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium mb-2">Currently Exploring</p>
                  <p className="text-sm text-muted-foreground">
                    Sveltekit for full-stack development, Algorithm development for recommendations based off user history, A new recipe book (Unofficial Studio Ghibli Cookbook FTW)!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Let's Connect Button - Prominent CTA */}
          <div className="text-center pt-4">
            <Button 
              onClick={onConnectClick}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Let's Connect
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Ready to collaborate? Let's discuss opportunities!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}