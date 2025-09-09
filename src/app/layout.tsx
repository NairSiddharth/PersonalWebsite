"use client";

import "../styles/globals.css"; // Add this line
import { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { AccessibilityToolbar } from "@/components/accessibility-toolbar";
interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-body transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <TooltipProvider>
            <main className="flex-1 pt-24">{children}</main>
          </TooltipProvider>
          <Footer />
          <AccessibilityToolbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
