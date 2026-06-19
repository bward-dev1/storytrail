"use client";

import { useState, useTransition } from "react";
import ParentApprovalBadge from "@/components/ParentApprovalBadge";
import { track } from "@/lib/analytics/events";

type Approval = {
  id: string;
  child_id: string;
  parent_id: string | null;
  action: "request" | "approve" | "deny";
  subject: string;
  payload: Record<string, unknown> | null;
  resolved_at: string | null;
};

export default function ApprovalsClient({ initial }: { initial: Approval[] }) {
  const [rows, setRows] = useState<Approval[]>(initial);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const resolve = (id: string, action: "approve" | "deny") => {
    setError(null);
    start(async () => {
      try {
        const res = await fetch("/api/approvals", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ approval_id: id, action }),
        });
        if (!res.ok) throw new Error(await res.text());
        const { approval } = await res.json();
        setRows((prev) =>
          prev.map((r) => (r.id === approval.id ? (approval as Approval) : r))
        );
        track("approval_resolved", { action });
      } catch (e) {
        setError((e as Error).message);
      }
    });
  };

  if (!rows.length) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-8 text-center text-kr-muted">
        Nothing waiting on you right now. 
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {rows.map((row) => {
        const state = row.resolved_at
          ? row.action === "approve"
            ? "approved"
            : "denied"
          : "pending";
        return (
          <div
            key={row.id}
            className="rounded-2xl bg-white shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div>
              <p className="font-semibold text-kr-ink">{row.subject}</p>
              {row.payload ? (
                <p className="text-xs text-kr-muted mt-1 break-words">
                  {Object.entries(row.payload)
                    .map(([k, v]) => `${k}: ${String(v)}`)
                    .join(" · ")}
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <ParentApprovalBadge state={state as "pending" | "approved" | "denied"} />
              {!row.resolved_at ? (
                <>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => resolve(row.id, "approve")}
                    className="text-sm rounded-lg px-3 py-1 cta-gradient text-white disabled:opacity-60"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => resolve(row.id, "deny")}
                    className="text-sm rounded-lg px-3 py-1 border border-kr-muted/20 text-kr-muted hover:text-kr-deep disabled:opacity-60"
                  >
                    Deny
                  </button>
                </>
              ) : null}
            </div>
          </div>
        );
      })}

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}