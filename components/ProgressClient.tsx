"use client";

import { useState, useTransition } from "react";
import StarRating from "@/components/StarRating";
import ParentApprovalBadge from "@/components/ParentApprovalBadge";
import { track } from "@/lib/analytics/events";

type Progress = {
  status: "want" | "reading" | "finished";
  pages_read: number;
  rating: number | null;
};

const STATUSES: Progress["status"][] = ["want", "reading", "finished"];

export default function ProgressClient({
  bookId,
  childId,
  initial,
}: {
  bookId: string;
  childId: string;
  initial: Progress | null;
}) {
  const [status, setStatus] = useState<Progress["status"]>(initial?.status ?? "want");
  const [pages, setPages] = useState<number>(initial?.pages_read ?? 0);
  const [rating, setRating] = useState<number>(initial?.rating ?? 0);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const save = (next: Partial<Progress>) => {
    setError(null);
    start(async () => {
      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            child_id: childId,
            book_id: bookId,
            status: next.status ?? status,
            pages_read: next.pages_read ?? pages,
            rating: next.rating ?? (rating || undefined),
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        const p = json.progress as Progress;
        setStatus(p.status);
        setPages(p.pages_read);
        setRating(p.rating ?? 0);
        track("progress_updated", { status: p.status });
      } catch (e) {
        setError((e as Error).message);
      }
    });
  };

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            disabled={pending}
            onClick={() => save({ status: s })}
            className={`text-sm rounded-full px-3 py-1 border transition ${
              status === s
                ? "cta-gradient text-white border-transparent"
                : "border-kr-muted/20 text-kr-muted hover:text-kr-deep"
            }`}
          >
            {s === "want" ? "Want to read" : s === "reading" ? "Reading" : "Finished"}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-kr-muted" htmlFor="pages">
          Pages read
        </label>
        <input
          id="pages"
          type="number"
          min={0}
          value={pages}
          onChange={(e) => setPages(Number(e.target.value))}
          onBlur={() => save({ pages_read: pages })}
          className="w-24 border border-kr-muted/20 rounded-lg px-3 py-1"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-kr-muted">Your rating</span>
        <StarRating
          value={rating}
          onChange={(n) => {
            setRating(n);
            save({ rating: n });
          }}
        />
        <ParentApprovalBadge state="pending" />
      </div>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}