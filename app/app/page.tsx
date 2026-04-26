import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Story from "@/components/Story";
import Features from "@/components/Features";
import Manifesto from "@/components/Manifesto";
import Testimonials from "@/components/Testimonials";
import ScaleShowcase from "@/components/ScaleShowcase";
import Faq from "@/components/Faq";
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
      <Faq />
      <FinalCta />
    </main>
  );
}
