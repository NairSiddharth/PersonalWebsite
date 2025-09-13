"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Mail, Linkedin, Github, FileText, Calendar, Clock, MessageSquare, Sparkles, ChevronUp } from "lucide-react";
import profile from "@/data/profile.json";
import { getEmail } from "@/lib/email";

interface ContactProps {
  onHide?: () => void;
}

export default function Contact({ onHide }: ContactProps) {
  // Availability status
  const currentHour = new Date().getHours();
  const isWorkingHours = currentHour >= 9 && currentHour <= 18;
  
  return (
    <div className="py-12 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Header with optional close button */}
        <div className="text-center relative">
          <h2 className="text-3xl font-bold mb-2">Let's Connect</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm always open to new opportunities, collaborations, or just a friendly chat about technology and innovation.
          </p>
          
          {/* Optional collapse button */}
          {onHide && (
            <Button
              onClick={onHide}
              variant="ghost"
              size="sm"
              className="absolute -top-2 right-0 text-muted-foreground hover:text-foreground"
            >
              <ChevronUp className="w-4 h-4" />
              <span className="sr-only">Hide contact section</span>
            </Button>
          )}
        </div>

        {/* Availability Status Card */}
        <Card className="border-muted bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="relative flex h-3 w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isWorkingHours ? 'bg-green-400' : 'bg-yellow-400'} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${isWorkingHours ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  </span>
                </div>
                <div>
                  <p className="font-medium">
                    {isWorkingHours ? 'Available for quick response' : 'Away - will respond soon'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Typical response time: {isWorkingHours ? '< 2 hours' : '< 24 hours'}
                  </p>
                </div>
              </div>
              <Badge variant="secondary">
                <Clock className="w-3 h-3 mr-1" />
                Houston, TX (CST)
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primary CTA - Email with Hover Cards */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Email (Preferred)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Best for project inquiries, opportunities, or detailed discussions
              </p>
              
              <HoverCard openDelay={300} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Button asChild variant="outline" className="w-full">
                    <a href={`mailto:${getEmail()}`}
                    target="_blank"
                      rel="noopener noreferrer">
                      Send me an email
                    </a>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent 
                  side="top" 
                  className="w-[600px] p-0" 
                  sideOffset={10}
                  alignOffset={0}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* What to Expect Card */}
                    <div className="p-4 border-r border-border">
                      <div className="flex items-center gap-2 mb-3">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        <h4 className="font-semibold text-sm">What to Expect</h4>
                      </div>
                      <ul className="space-y-2 text-xs">
                        <li className="flex items-start gap-2">
                          <Sparkles className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                          <span>Prompt, thoughtful response</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Sparkles className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                          <span>Open to coffee chats (virtual/in-person)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Sparkles className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                          <span>Technical discussions & career advice</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Sparkles className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                          <span>Freelance & consulting opportunities</span>
                        </li>
                      </ul>
                    </div>

                    {/* Prefer a Call Card */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-primary" />
                        <h4 className="font-semibold text-sm">Prefer a Call?</h4>
                      </div>
                      <div className="space-y-3">
                        <p className="text-xs text-muted-foreground">
                          Mention in your email if you'd like a 15-30 minute intro call
                        </p>
                        <Badge variant="outline" className="text-xs">
                          Mon-Fri, 10am-6pm CST
                        </Badge>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>Usually available same day</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardContent>
          </Card>

          {/* LinkedIn */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Linkedin className="w-5 h-5 text-blue-600" />
                LinkedIn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Let's connect professionally and stay in touch
              </p>
              <Button asChild variant="outline" className="w-full">
                <a
                  href={`https://www.linkedin.com/in/${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View my profile
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* GitHub */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Github className="w-5 h-5" />
                GitHub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Check out my code and open-source contributions
              </p>
              <Button asChild variant="outline" className="w-full">
                <a
                  href={`https://github.com/${profile.github || 'yourusername'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View repositories
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Resume Download */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Download my latest resume in PDF format
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="/resume.pdf" download>
                  Download Resume
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}