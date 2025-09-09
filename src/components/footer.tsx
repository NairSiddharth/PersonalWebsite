"use client";

import { Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import profile from "@/data/profile.json";

export default function Footer() {
  const sections = [
    { title: "About", href: "#about" },
    { title: "Resume", href: "#resume" },
    { title: "Projects", href: "#projects" },
    { title: "Experience", href: "#experience" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t pt-8 pb-6 mt-12 max-w-4xl mx-auto px-6 text-center sm:text-left">
      <div className="flex items-center sm:flex-row  justify-center sm:justify-between gap-4 mb-6 flex-wrap">
        <div className="flex flew-row flex-wrap gap-4 justify-center">
          {sections.map((sec) => (
            <a key={sec.title} href={sec.href} className="hover:text-foreground transition-colors">
              {sec.title}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="flex gap-5 mt-2 sm:mt-0">
          <Button asChild variant="default" size="sm">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Me
            </a>
          </Button>

          <Button asChild variant="outline" size="sm">
            <a href={`https://www.linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </Button>
        </div>
      </div>

      <div className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} Siddharth Nair. All rights reserved.
      </div>
    </footer>
  );
}
