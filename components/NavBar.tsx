import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full border-b border-kr-muted/10 bg-white/70 backdrop-blur sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-kr-ink">
          StoryTrail
        </Link>
        <ul className="flex gap-4 text-sm text-kr-muted">
          <li>
            <Link href="/library" className="hover:text-kr-deep">
              Library
            </Link>
          </li>
          <li>
            <Link href="/parent" className="hover:text-kr-deep">
              Parent
            </Link>
          </li>
          <li>
            <Link href="/teacher" className="hover:text-kr-deep">
              Teacher
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="cta-gradient text-white px-3 py-1 rounded-lg"
            >
              Sign in
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}