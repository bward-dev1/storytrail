import NavBar from "@/components/NavBar";
import LoadingPanel from "@/components/LoadingPanel";

export default function Loading() {
  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <LoadingPanel label="Loading your library…" />
      </main>
    </>
  );
}