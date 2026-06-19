import { createClient } from "@/lib/supabase/server";

export type Progress = {
  id: string;
  child_id: string;
  book_id: string;
  status: "want" | "reading" | "finished";
  pages_read: number;
  rating: number | null;
  started_at: string;
  finished_at: string | null;
};

export async function listProgress(childId: string): Promise<Progress[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("child_id", childId)
    .order("started_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function upsertProgress(p: Partial<Progress> & { child_id: string; book_id: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("progress")
    .upsert(p, { onConflict: "child_id,book_id" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export function streakDays(progress: Progress[]): number {
  if (!progress.length) return 0;
  const dates = new Set(
    progress.map((p) => (p.finished_at ?? p.started_at).slice(0, 10))
  );
  let streak = 0;
  const cursor = new Date();
  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}