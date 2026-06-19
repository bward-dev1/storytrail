export default function FilterPills({
  levels,
  active,
  onChange,
}: {
  levels: string[];
  active: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {["all", ...levels].map((lvl) => {
        const isActive = lvl === active;
        return (
          <button
            key={lvl}
            type="button"
            onClick={() => onChange(lvl)}
            className={`text-sm rounded-full px-3 py-1 border transition ${
              isActive
                ? "cta-gradient text-white border-transparent"
                : "border-kr-muted/20 text-kr-muted hover:text-kr-deep"
            }`}
          >
            {lvl === "all" ? "All" : lvl}
          </button>
        );
      })}
    </div>
  );
}