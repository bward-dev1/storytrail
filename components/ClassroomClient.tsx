"use client";

import { useEffect, useState } from "react";

type Student = {
  id: string;
  display_name: string;
  grade: number | null;
  reading_level: string | null;
  streak: number;
};

export default function ClassroomClient() {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/classroom", { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        setStudents(json.students ?? []);
        if (json.error) setError(json.error);
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!students) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-8 text-center text-kr-muted">
        Loading class…
      </div>
    );
  }

  if (!students.length) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-8 text-center text-kr-muted">
        No students enrolled yet.
      </div>
    );
  }

  const top = students[0]?.streak ?? 0;

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {students.map((s) => {
        const widthPct = top > 0 ? Math.max(8, Math.round((s.streak / top) * 100)) : 8;
        return (
          <div key={s.id} className="rounded-2xl bg-white shadow-sm p-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-semibold text-kr-ink">{s.display_name}</h3>
              <span className="text-xs text-kr-muted">
                {s.grade != null ? `Grade ${s.grade}` : "—"}
                {s.reading_level ? ` · ${s.reading_level}` : ""}
              </span>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-bold text-kr-deep">{s.streak}</span>
              <span className="text-sm text-kr-muted mb-1">
                day{s.streak === 1 ? "" : "s"} streak
              </span>
            </div>
            <div className="h-2 rounded-full bg-kr-bg overflow-hidden">
              <div
                className="cta-gradient h-full"
                style={{ width: `${widthPct}%` }}
                aria-hidden
              />
            </div>
          </div>
        );
      })}

      {error ? (
        <p className="text-sm text-red-600 sm:col-span-2" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}