"use client";

import { useState } from "react";

export default function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => {
        const active = hover || value;
        return (
          <button
            key={n}
            type="button"
            aria-label={`Rate ${n}`}
            onMouseEnter={() => setHover(n)}
            onClick={() => onChange(n)}
            className={`text-2xl ${
              n <= active ? "text-kr-gold" : "text-kr-muted/30"
            }`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}