import NavBar from "@/components/NavBar";
import ApprovalsClient from "@/components/ApprovalsClient";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Approval = {
  id: string;
  child_id: string;
  parent_id: string | null;
  action: "request" | "approve" | "deny";
  subject: string;
  payload: Record<string, unknown> | null;
  resolved_at: string | null;
};

export default async function ParentPage() {
  let approvals: Approval[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("approvals")
      .select("id,child_id,parent_id,action,subject,payload,resolved_at")
      .order("action", { ascending: true })
      .limit(50);
    approvals = (data ?? []) as Approval[];
  } catch {
    approvals = [];
  }

  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-kr-ink mb-1">Parent dashboard</h1>
        <p className="text-kr-muted mb-6">
          Approve what your child wants to read, see their progress.
        </p>

        <ApprovalsClient initial={approvals} />
      </main>
    </>
  );
}