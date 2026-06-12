-- NightFury reviews schema. Run this in the Supabase SQL Editor.

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  product_slug text not null,
  name text not null,
  location text,
  rating int not null check (rating between 1 and 5),
  title text not null,
  body text not null,
  media jsonb not null default '[]'::jsonb,
  variant text
);

-- If the table already exists from an earlier version, add the column:
alter table public.reviews add column if not exists variant text;

alter table public.reviews enable row level security;

-- Anyone can read reviews.
create policy "Public read reviews"
  on public.reviews for select
  using (true);

-- Anyone can submit a review (no auth on the public site).
create policy "Public insert reviews"
  on public.reviews for insert
  with check (true);

-- Storage bucket for review photos/videos.
insert into storage.buckets (id, name, public)
values ('review-media', 'review-media', true)
on conflict (id) do nothing;

create policy "Public read review media"
  on storage.objects for select
  using (bucket_id = 'review-media');

create policy "Public upload review media"
  on storage.objects for insert
  with check (bucket_id = 'review-media');
