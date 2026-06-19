import { createClient } from "@/lib/supabase/server";

export type Book = {
  id: string;
  title: string;
  author: string | null;
  cover_url: string | null;
  lexile: number | null;
  page_count: number | null;
};

export async function listBooks(): Promise<Book[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("books")
    .select("id,title,author,cover_url,lexile,page_count")
    .order("title", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getBook(id: string): Promise<Book | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("books")
    .select("id,title,author,cover_url,lexile,page_count")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}