import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const post = z.object({
  approval_id: z.string().uuid(),
  action: z.enum(["approve", "deny"]),
});

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("approvals")
    .select("*")
    .is("resolved_at", null)
    .order("action", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ approvals: data });
}

export async function POST(req: NextRequest) {
  const body = post.safeParse(await req.json());
  if (!body.success) {
    return NextResponse.json({ error: body.error.flatten() }, { status: 400 });
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("approvals")
    .update({
      action: body.data.action === "approve" ? "approve" : "deny",
      resolved_at: new Date().toISOString(),
    })
    .eq("id", body.data.approval_id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ approval: data });
}