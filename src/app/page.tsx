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
      <About />
      <Resume />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
