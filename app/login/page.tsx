import NavBar from "@/components/NavBar";

export default function LoginPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-md mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-kr-ink mb-1">Sign in</h1>
        <p className="text-kr-muted mb-6">Use the email your parent signed you up with.</p>
        <form className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-kr-muted">Email</span>
            <input
              type="email"
              required
              className="border border-kr-muted/20 rounded-lg px-3 py-2"
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-kr-muted">Password</span>
            <input
              type="password"
              required
              className="border border-kr-muted/20 rounded-lg px-3 py-2"
            />
          </label>
          <button className="cta-gradient text-white rounded-lg px-3 py-2 font-semibold">
            Sign in
          </button>
        </form>
      </main>
    </>
  );
}