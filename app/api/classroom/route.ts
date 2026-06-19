import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { streakDays, type Progress } from "@/lib/progress/calc";

type StudentRow = {
  id: string;
  display_name: string;
  grade: number | null;
  reading_level: string | null;
  streak: number;
};

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: children, error: childErr } = await supabase
      .from("children")
      .select("id,display_name,grade,reading_level")
      .order("display_name", { ascending: true });
    if (childErr) throw childErr;

    const rows: StudentRow[] = [];
    for (const child of children ?? []) {
      const { data: progressRows } = await supabase
        .from("progress")
        .select("status,pages_read,rating,started_at,finished_at")
        .eq("child_id", child.id);
      const mapped: Progress[] = (progressRows ?? []).map((p) => ({
        id: "",
        child_id: child.id,
        book_id: "",
        status: p.status as Progress["status"],
        pages_read: p.pages_read ?? 0,
        rating: p.rating ?? null,
        started_at: p.started_at ?? new Date().toISOString(),
        finished_at: p.finished_at,
      }));
      rows.push({
        ...child,
        streak: streakDays(mapped),
      });
    }

    rows.sort((a, b) => b.streak - a.streak);
    return NextResponse.json({ students: rows });
  } catch (e) {
    return NextResponse.json({ students: [], error: (e as Error).message }, { status: 200 });
  }
}