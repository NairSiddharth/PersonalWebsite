"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Github, FileText, Calendar, Clock, MessageSquare, Sparkles } from "lucide-react";
import profile from "@/data/profile.json";

export default function Contact() {
  // Availability status
  const currentHour = new Date().getHours();
  const isWorkingHours = currentHour >= 9 && currentHour <= 18;
  
  return (
    <section id="contact" className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Contact Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-2 text-right">Let's Connect</h2>
            <p className="text-muted-foreground max-w-2xl">
              I'm always open to new opportunities, collaborations, or just a friendly chat about technology and innovation.
            </p>
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
            {/* Primary CTA - Email */}
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
                <Button asChild variant="outline" className="w-full">
                  <a href={`mailto:${profile.email}`}
                  target="_blank"
                    rel="noopener noreferrer">
                    Send me an email
                  </a>
                </Button>
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

          {/* What to Expect */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                What to Expect When You Reach Out
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                  <span>A prompt, thoughtful response tailored to your inquiry</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                  <span>Open to coffee chats, virtual or in-person (Houston area)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                  <span>Happy to discuss technical challenges, career advice, or collaboration ideas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                  <span>Available for freelance projects and consulting opportunities</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Schedule a Call Option */}
          <div className="text-center p-6 rounded-lg border border-dashed border-muted-foreground/25">
            <Calendar className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-semibold mb-2">Prefer a Quick Call?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Mention in your email if you'd like to schedule a 15-30 minute intro call
            </p>
            <Badge variant="outline">Usually available Mon-Fri, 10am-6pm CST</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}