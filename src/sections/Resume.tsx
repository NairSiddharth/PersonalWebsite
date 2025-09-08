"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { ArrowDown } from "lucide-react";

// PDF.js worker
GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Local PDF in public folder
const RESUME_URL = "/Siddharth_Nair_Resume.pdf";

export default function Resume() {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load PDF
  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadedPdf = await getDocument(RESUME_URL).promise;
        setPdf(loadedPdf);

        // Render the single page
        if (loadedPdf.numPages > 0) {
          const page = await loadedPdf.getPage(1);
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
        }
      } catch (error) {
        console.error("Error loading PDF:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, []);

  // Download PDF
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = RESUME_URL;
    link.download = "Siddharth_Nair_Resume.pdf";
    link.click();
  };

  return (
    <section className="space-y-6 py-12 px-6 max-w-4xl mx-auto">
      <h2 className="font-heading text-3xl text-center">Resume</h2>
      <p className="font-body text-base text-center">
        Preview my resume below or download a copy.
      </p>

      <div
        ref={containerRef}
        className="relative w-full border rounded-lg overflow-hidden mb-4"
      >
        {loading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <canvas ref={canvasRef} className="w-full" />
      </div>

      <div className="flex justify-center mt-2">
        <Button onClick={handleDownload} variant="secondary" className="flex items-center gap-2">
          <ArrowDown className="w-4 h-4" />
          Download Resume
        </Button>
      </div>
    </section>
  );
}
