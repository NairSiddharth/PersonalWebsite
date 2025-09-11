"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import profile from "@/data/profile.json";

// Same gradients as navbar for consistency
const gradients = [
  'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', // Dusk
  'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)', // Pink Flavour
  'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)', // Blue Skies
  'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)', // Teen Notebook
  'linear-gradient(90deg, #fa709a 0%, #fee140 100%)', // Sunset
  'linear-gradient(90deg, #30cfd0 0%, #330867 100%)', // Deep Space
  'linear-gradient(90deg, #a8edea 0%, #fed6e3 100%)', // Soft Cherish
  'linear-gradient(90deg, #ff9a9e 0%, #fecfef 100%)', // Young Passion
  'linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%)', // Deep Blue
  'linear-gradient(90deg, #fdcbf1 0%, #e6dee9 100%)', // Cloudy Knoxville
  'linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)', // Winter Neva
  'linear-gradient(90deg, #d299c2 0%, #fef9d7 100%)', // Dusty Grass
  'linear-gradient(90deg, #89f7fe 0%, #66a6ff 100%)', // Sky Blue
  'linear-gradient(90deg, #fddb92 0%, #d1fdff 100%)', // Sand Strike
  'linear-gradient(90deg, #9890e3 0%, #b1f4cf 100%)', // Northern Lights
];

export default function Footer() {
  const pathname = usePathname();
  const [currentGradient, setCurrentGradient] = useState(gradients[0]);
  const [gradientPosition, setGradientPosition] = useState(0);

  // Change gradient when pathname changes (synced with navbar)
  useEffect(() => {
    // Use pathname as seed for consistent gradient between navbar and footer
    const pathHash = pathname.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const gradientIndex = pathHash % gradients.length;
    setCurrentGradient(gradients[gradientIndex]);
  }, [pathname]);

  // Animate gradient position
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPosition((prev) => (prev + 1) % 200);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Only sections with fragment are "on-page" sections
  const sections = [
    { title: "About", href: "/" },
    { title: "Contact", href: "/", fragment: "contact", page: "/" },
    { title: "Resume", href: "/resume" },
    { title: "Experience", href: "/experience" },
    { title: "Projects", href: "/projects" },
    { title: "Offscreen", href: "/ensemble" },
  ];

  return (
    <>
      {/* Animated Gradient Border - Top of Footer */}
      <div 
        className="w-full h-[1px] transition-all duration-1000 ease-in-out relative overflow-hidden"
        style={{ 
          background: currentGradient,
          backgroundSize: '100% 100%',
          backgroundPosition: `${gradientPosition}%`,
          opacity: 0.8,
          filter: 'brightness(.5)',
        }}
      >
      </div>

      <footer className="pt-8 pb-6 mt-auto w-full bg-background">
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="flex flex-col items-center gap-4 lg:pr-32">
            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-4">
              {sections.map((sec) => {
                // Handle fragment links dynamically
                if (sec.fragment && sec.page === pathname) {
                  // On-page fragment → scroll smoothly without changing URL
                  return (
                    <a
                      key={sec.title}
                      href={sec.href}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(sec.fragment)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="hover:text-foreground transition-colors text-sm font-medium relative group"
                    >
                      {sec.title}
                      {/* Hover gradient underline */}
                      <span 
                        className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                        style={{ background: currentGradient }}
                      />
                    </a>
                  );
                }

                // Normal link → navigate to the page
                return (
                  <a
                    key={sec.title}
                    href={sec.href}
                    className="hover:text-foreground transition-colors text-sm font-medium relative group"
                  >
                    {sec.title}
                    {/* Hover gradient underline */}
                    <span 
                      className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                      style={{ background: currentGradient }}
                    />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <div className="text-muted-foreground text-sm text-center">
              © {new Date().getFullYear()} Siddharth Nair. All rights reserved.
            </div>
          </div>

          {/* Right-side buttons with gradient hover effect */}
          <div className="flex flex-col items-center gap-2 mt-4 lg:absolute lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:mt-0">
            <Button 
              asChild 
              variant="default" 
              size="sm"
              className="relative overflow-hidden group"
            >
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2">
                <span 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundImage: currentGradient }}
                />
                <Mail className="w-4 h-4 relative z-10" /> 
                <span className="relative z-10">Email Me</span>
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="sm"
              className="relative overflow-hidden group"
            >
              <a
                href={`https://www.linkedin.com/in/${profile.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ background: currentGradient }}
                />
                <Linkedin className="w-4 h-4 relative z-10" /> 
                <span className="relative z-10">LinkedIn</span>
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
}