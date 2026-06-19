import NavBar from "@/components/NavBar";
import StarRating from "@/components/StarRating";
import ParentApprovalBadge from "@/components/ParentApprovalBadge";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  // TODO: fetch from Supabase using `lib/books/queries.ts`.
  const book = {
    id: bookId,
    title: "The Wild Robot",
    author: "Peter Brown",
    pageCount: 288,
    lexile: 760,
    coverUrl: null,
  };

  return (
    <>
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-44 aspect-[3/4] bg-kr-bg rounded-2xl flex items-center justify-center text-kr-muted">
            {book.coverUrl ? null : "Cover"}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-kr-ink">{book.title}</h1>
            <p className="text-kr-muted">by {book.author}</p>
            <p className="text-sm text-kr-muted mt-2">
              {book.pageCount} pages · Lexile {book.lexile}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm text-kr-muted">Your rating:</span>
              <StarRating value={0} onChange={() => {}} />
              <ParentApprovalBadge state="pending" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}