import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { PageBackground } from "@/components/page-background";
import { MotionProvider } from "@/components/motion/motion-provider";

export default function Home() {
  return (
    <MotionProvider>
      <PageBackground />
      <main className="relative z-10 text-white overflow-x-clip space-y-10 md:space-y-20">
        <Navigation />
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </MotionProvider>
  );
}
