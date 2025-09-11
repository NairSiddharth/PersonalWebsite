"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

// Beautiful gradients inspired by uiGradients
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

const navLinks = [
  { label: "About", href: "/" },
  { label: "Contact", href: "/", fragment: "contact", page: "/" }, 
  { label: "Resume", href: "/resume" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Offscreen", href: "/ensemble" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentGradient, setCurrentGradient] = useState(gradients[0]);
  const pathname = usePathname();

  // Change gradient when pathname changes
  useEffect(() => {
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    setCurrentGradient(randomGradient);
  }, [pathname]);

  // Function to check if link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const renderLink = (link: any, isMobile = false) => {
    const active = isActive(link.href);

    // Case 1: fragment + same page → scroll only
    if (link.fragment && link.page === pathname) {
      return (
        <a
          key={link.label}
          href={`#${link.fragment}`}
          className={isMobile ? "w-full" : ""}
          onClick={() => isMobile && setMobileOpen(false)}
        >
          <Button
            variant={active ? "default" : "ghost"}
            className={active ? "bg-primary text-primary-foreground" : ""}
          >
            {link.label}
          </Button>
        </a>
      );
    }

    // Case 2: fragment + different page → navigate with full href#fragment
    if (link.fragment) {
      return (
        <Link
          key={link.label}
          href={`${link.href}#${link.fragment}`}
          className={isMobile ? "w-full" : ""}
          onClick={() => isMobile && setMobileOpen(false)}
        >
          <Button
            variant={active ? "default" : "ghost"}
            className={active ? "bg-primary text-primary-foreground" : ""}
          >
            {link.label}
          </Button>
        </Link>
      );
    }

    // Case 3: normal link
    return (
      <Link
        key={link.label}
        href={link.href}
        className={isMobile ? "w-full" : ""}
        onClick={() => isMobile && setMobileOpen(false)}
      >
        <Button
          variant={active ? "default" : "ghost"}
          className={active ? "bg-primary text-primary-foreground" : ""}
        >
          {link.label}
        </Button>
      </Link>
    );
  };

  return (
    <>
      <nav className="fixed top-0 w-full backdrop-opacity-100 bg-background/100 z-50 p-5 flex justify-between items-center">
        {/* Left: Dark Mode Toggle */}
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>

        {/* Right: Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => renderLink(link))}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Button
            variant="outline"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg flex flex-col z-50">
            {navLinks.map((link) => renderLink(link, true))}
          </div>
        )}
      </nav>
      
      {/* Animated Gradient Border */}
      <div 
        className="fixed top-[72px] w-full h-[1px] z-50 transition-all duration-1000 ease-in-out shadow-lg"
        style={{ 
          backgroundImage: currentGradient,
          opacity: .8,
          filter: 'brightness(.5)',
        }}
      />
    </>
  );
}