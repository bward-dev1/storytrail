import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { listProgress, upsertProgress } from "@/lib/progress/calc";
import { createClient } from "@/lib/supabase/server";

const post = z.object({
  child_id: z.string().uuid(),
  book_id: z.string().uuid(),
  status: z.enum(["want", "reading", "finished"]),
  pages_read: z.number().int().min(0).optional(),
  rating: z.number().int().min(1).max(5).optional(),
});

export async function GET(req: NextRequest) {
  const childId = req.nextUrl.searchParams.get("child_id");
  if (!childId) return NextResponse.json({ error: "child_id required" }, { status: 400 });
  const progress = await listProgress(childId);
  return NextResponse.json({ progress });
}

export async function POST(req: NextRequest) {
  const body = post.safeParse(await req.json());
  if (!body.success) {
    return NextResponse.json({ error: body.error.flatten() }, { status: 400 });
  }

  const row = await upsertProgress({
    ...body.data,
    finished_at: body.data.status === "finished" ? new Date().toISOString() : null,
  });

  // Queue a parent approval request when a child rates a book or finishes it.
  const shouldQueue =
    body.data.status === "finished" ||
    (typeof body.data.rating === "number" && body.data.rating > 0);

  if (shouldQueue) {
    try {
      const supabase = await createClient();
      const subject =
        body.data.status === "finished"
          ? "Marked book finished"
          : `Rated book ${body.data.rating}/5`;
      await supabase.from("approvals").insert({
        child_id: body.data.child_id,
        action: "request",
        subject,
        payload: {
          book_id: body.data.book_id,
          status: body.data.status,
          rating: body.data.rating ?? null,
        },
      });
    } catch {
      // Best-effort: don't fail the progress write if the approval queue is unavailable.
    }
  }

  return NextResponse.json({ progress: row });
}