import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Dummy 區段(讓 nav scroll 變色 + nav anchor 可測,後續 block 取代) */}
      <section
        id="story"
        className="min-h-screen flex items-center justify-center bg-bg-story-card"
      >
        <p className="text-text-muted">scroll 區段(Block 04 placeholder)</p>
      </section>
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
