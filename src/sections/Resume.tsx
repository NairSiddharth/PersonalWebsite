"use client";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const RESUME_URL = "/Siddharth_Nair_Resume.pdf";

export default function Resume() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = RESUME_URL;
    link.download = "Siddharth_Nair_Resume.pdf";
    link.click();
  };

  return (
    <section id="resume" className="space-y-6 py-12 px-6 max-w-4xl mx-auto">
      <h2 className="font-heading text-3xl text-center">Resume</h2>
      <p className="font-body text-base text-center">
        Preview my resume below or download a copy.
      </p>
      
      <div className="relative w-full border rounded-lg overflow-hidden mb-4">
        <iframe 
          src={RESUME_URL}
          className="w-full h-[800px] border-0"
          title="Resume Preview"
          loading="lazy"
        />
      </div>
      
      <div className="flex justify-center mt-2">
        <Button
          onClick={handleDownload}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <ArrowDown className="w-4 h-4" />
          Download Resume
        </Button>
      </div>
    </section>
  );
}