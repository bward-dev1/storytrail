import NavBar from "@/components/NavBar";
import ReadingStreak from "@/components/ReadingStreak";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const supabase = (await import("@/lib/supabase/server")).createClient;
  const client = await supabase();

  const { data: book } = await client
    .from("books")
    .select("id,title,author,page_count,lexile,cover_url")
    .eq("id", bookId)
    .maybeSingle();

  const { data: progress } = await client
    .from("progress")
    .select("status,pages_read,rating")
    .eq("book_id", bookId)
    .maybeSingle();

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

              {progress?.status ? (
                <p className="mt-4 text-sm text-kr-deep">
                  Current status: <span className="font-semibold">{progress.status}</span>
                </p>
              ) : null}

              <div className="mt-6">
                <ReadingStreak days={0} />
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}