import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { listBooks } from "@/lib/books/queries";

const query = z.object({
  q: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const params = query.safeParse(Object.fromEntries(req.nextUrl.searchParams));
  if (!params.success) {
    return NextResponse.json({ error: params.error.flatten() }, { status: 400 });
  }
  const books = await listBooks();
  const q = params.data.q?.toLowerCase();
  const filtered = q
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          (b.author ?? "").toLowerCase().includes(q)
      )
    : books;
  return NextResponse.json({ books: filtered });
}