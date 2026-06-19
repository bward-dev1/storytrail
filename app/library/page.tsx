import NavBar from "@/components/NavBar";
import BookCard from "@/components/BookCard";
import ReadingStreak from "@/components/ReadingStreak";

// TODO: swap mock data for `lib/books/queries.ts` once Supabase is wired.
const MOCK_BOOKS = [
  {
    id: "1",
    title: "The Wild Robot",
    author: "Peter Brown",
    coverUrl: null,
    rating: 5,
  },
  {
    id: "2",
    title: "Amari and the Night Brothers",
    author: "B. B. Alston",
    coverUrl: null,
    rating: 4,
  },
  {
    id: "3",
    title: "The Last Cuentista",
    author: "Donna Barba Higuera",
    coverUrl: null,
    rating: null,
  },
  {
    id: "4",
    title: "Restart",
    author: "Gordon Korman",
    coverUrl: null,
    rating: 3,
  },
];

export default function LibraryPage() {
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MOCK_BOOKS.map((b) => (
            <BookCard key={b.id} {...b} />
          ))}
        </div>
      </main>
    </>
  );
}