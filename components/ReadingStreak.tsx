export default function ReadingStreak({ days }: { days: number }) {
  return (
    <div className="hero-gradient text-white rounded-2xl p-4 shadow">
      <p className="text-xs uppercase tracking-wide opacity-80">Reading streak</p>
      <p className="text-3xl font-bold mt-1">
        {days} {days === 1 ? "day" : "days"}
      </p>
      <p className="text-sm opacity-80 mt-1">
        Keep going — you&apos;re on fire 🔥
      </p>
    </div>
  );
}