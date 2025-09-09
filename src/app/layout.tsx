"use client";

import { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground font-body transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <nav className="fixed top-0 w-full backdrop-blur bg-background/70 z-50 border-b border-border p-4 flex justify-between items-center">
            <div className="font-bold text-lg">Siddharth Nair</div>
            <ModeToggle />
          </nav>

          <TooltipProvider>
            <main className="pt-24">{children}</main>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
