export default function LoadingPanel({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl bg-white shadow-sm p-8 text-center text-kr-muted"
    >
      <span className="inline-block animate-pulse">{label}</span>
    </div>
  );
}