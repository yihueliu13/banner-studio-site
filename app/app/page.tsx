import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Story from "@/components/Story";
import Features from "@/components/Features";
import Manifesto from "@/components/Manifesto";
import Testimonials from "@/components/Testimonials";
import ScaleShowcase from "@/components/ScaleShowcase";
import FinalCta from "@/components/FinalCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Story />
      <Features />
      <Manifesto />
      <Testimonials />
      <ScaleShowcase />

      {/* FAQ placeholder(D-3 取代) */}
      <section
        id="faq"
        className="min-h-screen flex items-center justify-center bg-bg-story-card"
      >
        <p className="text-text-muted">scroll 區段(Block 10 placeholder)</p>
      </section>

      <FinalCta />
    </main>
  );
}
