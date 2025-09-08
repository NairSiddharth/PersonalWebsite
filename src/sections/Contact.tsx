import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin } from "lucide-react";
import profile from "@/data/profile.json";

export default function Contact() {
  return (
    <section id="contact" className="py-12 px-6 max-w-3xl mx-auto text-center">
      {/* Contact Section */}
      <h2 className="text-3xl font-bold mb-2">Let’s Connect</h2>

      {/* Status Badge from config */}
      <Badge variant="secondary" className="mb-6">
        🌟 {profile.status}
      </Badge>

      <p className="text-muted-foreground mb-8">
        I’m always open to new opportunities, collaborations, or just a friendly
        chat. Feel free to reach out!
      </p>

      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        <Button asChild variant="default" size="lg">
          <a href={`mailto:${profile.email}`} className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Me
          </a>
        </Button>

        <Button asChild variant="outline" size="lg">
          <a
            href={`https://www.linkedin.com/in/${profile.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>
        </Button>
      </div>

      {/* Footer-style mini version */}
      <footer className="border-t pt-6 mt-12 flex justify-center gap-6 text-muted-foreground">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-2 hover:text-foreground transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span>Email</span>
        </a>

        <a
          href={`https://www.linkedin.com/in/${profile.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-foreground transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          <span>LinkedIn</span>
        </a>
      </footer>
    </section>
  );
}
