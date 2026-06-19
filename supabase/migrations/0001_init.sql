-- StoryTrail schema
create extension if not exists "pgcrypto";

create type role as enum ('child', 'parent', 'teacher');

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text not null,
  role role not null,
  age int
);

create table households (
  id uuid primary key default gen_random_uuid(),
  primary_parent uuid references profiles(id)
);

create table children (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references households(id) on delete cascade,
  display_name text not null,
  grade int,
  reading_level text
);

create table books (
  id uuid primary key default gen_random_uuid(),
  isbn13 text unique,
  title text not null,
  author text,
  cover_url text,
  lexile int,
  page_count int,
  tags text[] default '{}'
);

create table progress (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references children(id) on delete cascade,
  book_id uuid references books(id) on delete cascade,
  status text check (status in ('want','reading','finished')) not null,
  pages_read int default 0,
  rating int check (rating between 1 and 5),
  started_at timestamptz default now(),
  finished_at timestamptz
);

create table approvals (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references profiles(id),
  child_id uuid references children(id) on delete cascade,
  action text check (action in ('request','approve','deny')) not null,
  subject text,
  payload jsonb,
  resolved_at timestamptz
);

-- Row Level Security
alter table profiles enable row level security;
alter table households enable row level security;
alter table children enable row level security;
alter table books enable row level security;
alter table progress enable row level security;
alter table approvals enable row level security;

create policy "profiles self read" on profiles
  for select using (auth.uid() = id);
create policy "profiles self update" on profiles
  for update using (auth.uid() = id);

create policy "children household scoped" on children
  for all using (
    household_id in (
      select household_id from children where id = auth.uid()
    )
  );

create policy "books readable by all" on books
  for select using (true);

create policy "progress child scoped" on progress
  for all using (
    child_id in (
      select id from children where id = auth.uid()
    )
  );

create policy "approvals parent scoped" on approvals
  for all using (parent_id = auth.uid());