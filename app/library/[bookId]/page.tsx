import NavBar from "@/components/NavBar";
import ProgressClient from "@/components/ProgressClient";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const supabase = await createClient();

  const { data: book } = await supabase
    .from("books")
    .select("id,title,author,page_count,lexile,cover_url")
    .eq("id", bookId)
    .maybeSingle();

  // For S2 we use the signed-in child. Until auth is wired, fall back to the
  // first child in the household so the UI is exercisable.
  const { data: child } = await supabase
    .from("children")
    .select("id")
    .limit(1)
    .maybeSingle();
  const childId = child?.id ?? null;

  const { data: progress } = childId
    ? await supabase
        .from("progress")
        .select("status,pages_read,rating")
        .eq("book_id", bookId)
        .eq("child_id", childId)
        .maybeSingle()
    : { data: null };

  return (
    <>
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-10">
        {!book ? (
          <p className="text-kr-muted">Book not found.</p>
        ) : (
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-44 aspect-[3/4] bg-kr-bg rounded-2xl flex items-center justify-center text-kr-muted overflow-hidden">
              {book.cover_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                "Cover"
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-kr-ink">{book.title}</h1>
              <p className="text-kr-muted">by {book.author ?? "Unknown"}</p>
              <p className="text-sm text-kr-muted mt-2">
                {book.page_count ?? "?"} pages · Lexile {book.lexile ?? "?"}
              </p>

              {childId ? (
                <ProgressClient
                  bookId={book.id}
                  childId={childId}
                  initial={progress ?? null}
                />
              ) : (
                <p className="mt-6 text-sm text-kr-muted">
                  Sign in as a child to log progress.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}