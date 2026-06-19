import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { listProgress, upsertProgress } from "@/lib/progress/calc";

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
  return NextResponse.json({ progress: row });
}