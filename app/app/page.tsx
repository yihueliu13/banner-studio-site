import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Story from "@/components/Story";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Story />

      {/* Dummy 區段(後續 block 取代) */}
      <section
        id="features"
        className="min-h-screen flex items-center justify-center"
      >
        <p className="text-text-muted">scroll 區段(Block 05 placeholder)</p>
      </section>
      <section
        id="faq"
        className="min-h-screen flex items-center justify-center bg-bg-story-card"
      >
        <p className="text-text-muted">scroll 區段(Block 10 placeholder)</p>
      </section>
      <section
        id="apply"
        className="min-h-screen flex items-center justify-center"
      >
        <p className="text-text-muted">scroll 區段(Block 09 placeholder)</p>
      </section>
    </main>
  );
}
