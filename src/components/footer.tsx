"use client";
import { Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import profile from "@/data/profile.json";

export default function Footer() {
  const sections = [
    { title: "About", href: "/" },
    { title: "Resume", href: "/resume" },
    { title: "Projects", href: "/projects" },
    { title: "Experience", href: "/experience" },
    { title: "Offscreen", href: "/ensemble" },

  ];

  return (
    <footer className="border-t pt-8 pb-6 mt-auto w-full bg-background">
      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Center content with right padding to avoid button overlap */}
        <div className="flex flex-col items-center gap-4 lg:pr-32">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {sections.map((sec) => (
              <a
                key={sec.title}
                href={sec.href}
                className="hover:text-foreground transition-colors text-sm font-medium"
              >
                {sec.title}
              </a>
            ))}
          </div>
          
          {/* Copyright Notice */}
          <div className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} Siddharth Nair. All rights reserved.
          </div>
        </div>
        
        {/* Absolute positioned buttons on far right, vertically centered */}
        <div className="flex flex-col items-center gap-2 mt-4 lg:absolute lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:mt-0">
          <Button asChild variant="default" size="sm">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> Email Me
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a
              href={`https://www.linkedin.com/in/${profile.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}