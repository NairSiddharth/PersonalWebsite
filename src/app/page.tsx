import About from "@/sections/About";
import Resume from "@/sections/Resume";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <main className="space-y-16">
      <About />
      <Resume />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
