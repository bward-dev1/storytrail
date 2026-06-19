import NavBar from "@/components/NavBar";
import ReadingStreak from "@/components/ReadingStreak";
import { createClient } from "@/lib/supabase/server";
import { streakDays } from "@/lib/progress/calc";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  let books: Awaited<ReturnType<typeof import("@/lib/books/queries").listBooks>> = [];
  let streak = 0;
  try {
    const supabase = await createClient();
    const { data: bookRows } = await supabase
      .from("books")
      .select("id,title,author,cover_url,lexile,page_count")
      .order("title", { ascending: true });
    books = bookRows ?? [];

    const { data: child } = await supabase
      .from("children")
      .select("id")
      .limit(1)
      .maybeSingle();
    if (child?.id) {
      const { data: progressRows } = await supabase
        .from("progress")
        .select("status,pages_read,rating,started_at,finished_at")
        .eq("child_id", child.id);
      streak = streakDays(
        (progressRows ?? []).map((p) => ({
          ...p,
          child_id: child.id!,
          book_id: "",
          id: "",
        }))
      );
    }
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
          <ReadingStreak days={streak} />
        </header>

        <LibraryFeed initialBooks={books} />
      </main>
    </>
  );
}

import LibraryClient from "@/components/LibraryClient";
function LibraryFeed({ initialBooks }: { initialBooks: Awaited<ReturnType<typeof import("@/lib/books/queries").listBooks>> }) {
  return <LibraryClient initialBooks={initialBooks} />;
}