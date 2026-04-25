export default function Home() {
  return (
    <main>
      {/* Hero placeholder(A-4 補完整) */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="text-center">
          <h1 className="text-[clamp(40px,6vw,56px)] font-semibold leading-[1.1] tracking-tight">
            你以為要 4 小時的 banner
            <br />
            現在 3 分鐘
          </h1>
          <p className="mt-6 text-text-secondary max-w-[560px] mx-auto">
            (這是 A-3 開發 placeholder,Block 02 Hero 完整版會在 A-4 取代)
          </p>
        </div>
      </section>

      {/* Dummy 高度區段(讓 nav scroll 變色可測) */}
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
