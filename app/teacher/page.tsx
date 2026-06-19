import NavBar from "@/components/NavBar";
import ReadingStreak from "@/components/ReadingStreak";

const MOCK_CLASS = [
  { name: "Avery", streak: 12 },
  { name: "Diego", streak: 9 },
  { name: "Priya", streak: 15 },
  { name: "Kai", streak: 3 },
];

export default function TeacherPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-kr-ink mb-1">Classroom</h1>
        <p className="text-kr-muted mb-6">Reading streaks across your class.</p>

        <div className="grid sm:grid-cols-2 gap-4">
          {MOCK_CLASS.map((c) => (
            <ReadingStreak key={c.name} days={c.streak} />
          ))}
        </div>
      </main>
    </>
  );
}