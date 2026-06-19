# StoryTrail

Hi, I'm Brandon — and I'm 12. I built StoryTrail so you can keep track of every book you've read, and watch your reading streak grow.

StoryTrail lives under the KiddReads umbrella. It uses the same brand palette, voice, and Supabase stack as `kiddreads-site`.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind v4 with the `--kr-*` design tokens
- Supabase (Postgres + Auth + RLS)
- Plausible analytics (kid-safe, cookie-less)
- Deployed on Vercel as a preview per push and prod on tag `v*`

## Local development

```bash
pnpm install
cp .env.example .env.local      # fill in Supabase + Plausible
pnpm db:reset                   # runs migrations + seed
pnpm dev                        # http://localhost:3000
```

## Project layout

```
app/
├─ page.tsx                     # landing
├─ library/                     # child bookshelf
├─ parent/                      # approval queue
├─ teacher/                     # classroom roster
├─ login/ + signup/
└─ api/                         # books, progress, approvals
components/                     # BookCard, StarRating, ReadingStreak, NavBar, ParentApprovalBadge
lib/                            # supabase, books, progress, analytics
supabase/migrations/0001_init.sql
.github/workflows/ci.yml
```

## Deploy

- Each push to `main` ships a Vercel preview.
- Tag `v*` pushes to production.
- The production URL is `https://storytrail.kiddreads.com`.

## Ship checklist (per slice)

- [ ] pnpm lint, typecheck, test, build all green
- [ ] Lighthouse 95+ on the new pages
- [ ] RLS policies reviewed
- [ ] No PII in Plausible events
- [ ] Empty/loading states designed
- [ ] Mobile + tablet tested