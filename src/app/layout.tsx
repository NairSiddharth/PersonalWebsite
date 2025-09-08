"use client";

import { ReactNode, useState, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <html lang="en">
      <head />
      <body className="bg-background text-foreground font-body transition-colors duration-300">
        <nav className="fixed top-0 w-full backdrop-blur bg-background/70 z-50 border-b border-border p-4 flex justify-between items-center">
          <div className="font-bold text-lg">Siddharth Nair</div>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded border border-border hover:bg-primary hover:text-primary-foreground"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </nav>

        {/* Wrap everything with TooltipProvider */}
        <TooltipProvider>
          <main className="pt-24">{children}</main>
        </TooltipProvider>
      </body>
    </html>
  );
}
