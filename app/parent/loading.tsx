import NavBar from "@/components/NavBar";
import LoadingPanel from "@/components/LoadingPanel";

export default function Loading() {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <LoadingPanel label="Loading approvals…" />
      </main>
    </>
  );
}