import NavBar from "@/components/NavBar";
import ParentApprovalBadge from "@/components/ParentApprovalBadge";

const MOCK_QUEUE = [
  { id: "a1", child: "Stella", subject: "Add book: Restart", state: "pending" },
  { id: "a2", child: "Stella", subject: "Rate The Wild Robot 5★", state: "pending" },
  { id: "a3", child: "Stella", subject: "Mark Amari finished", state: "approved" },
];

export default function ParentPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-kr-ink mb-1">Parent dashboard</h1>
        <p className="text-kr-muted mb-6">
          Approve what your child wants to read, see their progress.
        </p>

        <ul className="divide-y divide-kr-muted/10 rounded-2xl bg-white shadow-sm">
          {MOCK_QUEUE.map((row) => (
            <li key={row.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-kr-ink">{row.subject}</p>
                <p className="text-sm text-kr-muted">for {row.child}</p>
              </div>
              <div className="flex items-center gap-3">
                <ParentApprovalBadge state={row.state as "pending" | "approved"} />
                <button className="text-sm cta-gradient text-white rounded-lg px-3 py-1">
                  Approve
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}