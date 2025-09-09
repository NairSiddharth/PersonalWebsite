"use client";

import { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Resume", href: "/resume" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full backdrop-blur bg-background/70 z-50 border-b border-border p-4 flex justify-between items-center">
      {/* Left: Dark Mode Toggle */}
      <div className="flex items-center gap-2">
        <ModeToggle />
        <span className="font-bold text-lg hidden sm:inline">Siddharth Nair</span>
      </div>

      {/* Right: Desktop Links */}
      <div className="hidden md:flex items-center gap-4">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Button variant="ghost">{link.label}</Button>
          </Link>
        ))}
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
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
