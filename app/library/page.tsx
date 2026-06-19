import NavBar from "@/components/NavBar";
import ReadingStreak from "@/components/ReadingStreak";
import LibraryClient from "@/components/LibraryClient";
import { listBooks } from "@/lib/books/queries";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  let books: Awaited<ReturnType<typeof listBooks>> = [];
  try {
    books = await listBooks();
  } catch {
    books = [];
  }

  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-kr-ink">My library</h1>
            <p className="text-kr-muted">
              Every book you&apos;ve read, are reading, or want to read.
            </p>
          </div>
          <ReadingStreak days={7} />
        </header>

        <LibraryClient initialBooks={books} />
      </main>
    </>
  );
}