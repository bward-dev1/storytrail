export default function ParentApprovalBadge({
  state,
}: {
  state: "pending" | "approved" | "denied";
}) {
  const map: Record<string, string> = {
    pending: "bg-kr-gold/20 text-kr-gold",
    approved: "bg-kr-blue/15 text-kr-deep",
    denied: "bg-kr-muted/20 text-kr-muted",
  };
  return (
    <span
      className={`text-xs font-semibold rounded-full px-3 py-1 ${map[state]}`}
    >
      {state.toUpperCase()}
    </span>
  );
}