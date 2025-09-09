"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const RESUME_URL = "/Siddharth_Nair_Resume.pdf";

export default function Resume() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let pdfjs: any;
    let getDocument: any;
    let GlobalWorkerOptions: any;

    const loadPdf = async () => {
      try {
         // Import PDF.js dynamically
        pdfjs = await import("pdfjs-dist");
        getDocument = pdfjs.getDocument;
        GlobalWorkerOptions = pdfjs.GlobalWorkerOptions;

        // Use PDF.js CDN worker
        GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${
          pdfjs.version || "3.11.313"
        }/pdf.worker.min.js`;

        const pdf = await getDocument(RESUME_URL).promise;
        const page = await pdf.getPage(1);

        if (!canvasRef.current || !containerRef.current) return;

        const containerWidth = containerRef.current.clientWidth;
        const viewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        await page.render({ canvas, canvasContext: context, viewport: scaledViewport }).promise;
      } catch (err) {
        console.error("Error loading PDF:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, []);

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

      <div
        ref={containerRef}
        className="relative w-full border rounded-lg overflow-hidden mb-4"
      >
        {loading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        <canvas ref={canvasRef} className="w-full" />
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
