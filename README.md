# StoryTrail

Hi, I'm Brandon — and I'm 12. I built StoryTrail so you can keep track of every book you've read, and watch your reading streak grow.

StoryTrail lives under the KiddReads umbrella. It uses the same brand palette, voice, and Supabase stack as `kiddreads-site`.

The companion **static site** (no build step) lives at [`storytrail-static/`](./storytrail-static/) — useful for design reviews and `python3 -m http.server` previews.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind v4 with the `--kr-*` design tokens
- Supabase (Postgres + Auth + RLS)
- Plausible analytics (kid-safe, cookie-less)
- Vercel (preview per push, prod on tag `v*`)

## Local development

```bash
pnpm install
cp .env.example .env.local      # fill in Supabase + Plausible
pnpm db:reset                   # runs migrations + seed
pnpm dev                        # http://localhost:3000
```

## Project layout

```
app/                  routes (App Router) + API
├─ page.tsx           landing
├─ library/           child bookshelf
├─ parent/            approval queue
├─ teacher/           classroom roster
├─ login/ + signup/
└─ api/               books, progress, approvals, classroom
components/           BookCard, StarRating, ReadingStreak, NavBar, ParentApprovalBadge, …
lib/                  supabase, books, progress, analytics
supabase/migrations/  0001_init.sql
.github/workflows/ci.yml
vercel.json           preview + prod settings, security headers
```

## Deploy

- Each push to `main` ships a Vercel preview.
- Tag `v*` pushes to production.
- Production URL: `https://storytrail.kiddreads.com`.

## Ship checklist (per slice)

- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` all green
- [ ] Lighthouse 95+ on the new pages
- [ ] RLS policies reviewed; households isolated
- [ ] No PII in Plausible events (`track()` only emits action names + level filters)
- [ ] Empty + loading states designed (`loading.tsx` per route segment)
- [ ] Mobile + tablet tested (Tailwind responsive classes verified)
- [ ] Security headers present (`vercel.json` covers X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- [ ] `.env.example` updated if new vars were added
- [ ] Migration is idempotent and reversible

## Tagging a release

```bash
git tag -f v0.1.0 && git push --force --tags
# Vercel deploys the tag to prod
```

## Domain setup

`storytrail.kiddreads.com` should be added in Vercel → Project → Domains, and a CNAME from `storytrail.kiddreads.com → cname.vercel-dns.com` set in the kiddreads DNS.