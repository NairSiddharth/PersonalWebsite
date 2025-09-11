import About from "@/sections/About";
import Resume from "@/sections/Resume";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Contact from "@/sections/Contact";

// Server Component: metadata allowed here
export const metadata = {
  title: "Siddharth Nair Portfolio",
  description: "Personal portfolio and resume website",
};

export default function Home() {
  return (
    <main className="space-y-16">
      {/* Hero Section - Full Width About
      <About />
      
      {/* Contact Section - Can be full width or constrained */}
      {/* <Contact /> */} 
      
      {/* Alternative Layout Option: Side by Side
          Uncomment below and comment out above to use side-by-side layout */}
      
      { <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto px-6">
        <About />
        <Contact />
      </div> }
      

    </main>
  );
}