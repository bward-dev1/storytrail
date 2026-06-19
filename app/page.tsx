export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4 text-kr-ink">
        StoryTrail
      </h1>
      <p className="text-lg text-kr-muted max-w-xl mb-8">
        Hi, I&apos;m Brandon — and I&apos;m 12. I built StoryTrail so you can
        keep track of every book you&apos;ve read, and see your reading streak
        grow.
      </p>
      <a
        href="/library"
        className="cta-gradient text-white font-semibold rounded-2xl px-6 py-3 shadow-md hover:scale-105 transition"
      >
        Open my library
      </a>
    </main>
  );
}