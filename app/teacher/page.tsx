import NavBar from "@/components/NavBar";
import ClassroomClient from "@/components/ClassroomClient";

export const dynamic = "force-dynamic";

export default function TeacherPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-kr-ink mb-1">Classroom</h1>
        <p className="text-kr-muted mb-6">
          Reading streaks across your class — sorted longest to shortest.
        </p>
        <ClassroomClient />
      </main>
    </>
  );
}