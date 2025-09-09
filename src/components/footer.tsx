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
    { title: "Contact", href: "/" },
  ];

  return (
    <footer className="border-t pt-8 pb-6 mt-auto w-full bg-background">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
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

        {/* Contact Buttons */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-4">
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

      <div className="text-muted-foreground text-sm text-center sm:text-left max-w-4xl mx-auto px-6">
        © {new Date().getFullYear()} Siddharth Nair. All rights reserved.
      </div>
    </footer>
  );
}
