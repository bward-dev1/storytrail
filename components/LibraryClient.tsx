"use client";

import { useMemo, useState } from "react";
import BookCard from "@/components/BookCard";
import FilterPills from "@/components/FilterPills";
import { track } from "@/lib/analytics/events";

type Book = {
  id: string;
  title: string;
  author: string | null;
  cover_url: string | null;
  lexile: number | null;
  page_count: number | null;
};

const READING_LEVELS = ["Early", "Middle", "Advanced"];

function lexileToLevel(lexile: number | null): string {
  if (lexile == null) return "Middle";
  if (lexile < 500) return "Early";
  if (lexile < 900) return "Middle";
  return "Advanced";
}

export default function LibraryClient({ initialBooks }: { initialBooks: Book[] }) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<string>("all");

  const filtered = useMemo(() => {
    return initialBooks.filter((b) => {
      const matchQuery =
        !query ||
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        (b.author ?? "").toLowerCase().includes(query.toLowerCase());
      const matchLevel = level === "all" || lexileToLevel(b.lexile) === level;
      return matchQuery && matchLevel;
    });
  }, [initialBooks, query, level]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          placeholder="Search by title or author"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length === 3) track("library_search", { q: e.target.value });
          }}
          className="w-full sm:max-w-sm border border-kr-muted/20 rounded-lg px-3 py-2"
        />
        <FilterPills levels={READING_LEVELS} active={level} onChange={(l) => { track("library_filter", { level: l }); setLevel(l); }} />
      </div>

      {filtered.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((b) => (
            <BookCard
              key={b.id}
              id={b.id}
              title={b.title}
              author={b.author}
              coverUrl={b.cover_url}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white shadow-sm p-8 text-center text-kr-muted">
          No books match — try a different search or filter.
        </div>
      )}
    </div>
  );
}