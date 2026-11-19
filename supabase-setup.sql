-- Run in your Supabase SQL editor.
-- Public gallery. Drawings publish immediately after submission.
-- IMPORTANT: public posting can be abused. See README for launch precautions.
create extension if not exists pgcrypto;
create table if not exists public.sketches (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  strokes jsonb not null,
  constraint strokes_are_array check (jsonb_typeof(strokes) = 'array'),
  constraint strokes_count check (jsonb_array_length(strokes) between 1 and 70),
  constraint strokes_size check (pg_column_size(strokes) < 90000)
);
create index if not exists sketches_created_at_idx on public.sketches(created_at desc);
alter table public.sketches enable row level security;
revoke all on public.sketches from public;
grant select, insert on public.sketches to anon;
create policy "visitors can view sketches" on public.sketches for select to anon using (true);
create policy "visitors can submit sketches" on public.sketches for insert to anon with check (true);
-- No public update or delete permission; delete from the dashboard as owner.
