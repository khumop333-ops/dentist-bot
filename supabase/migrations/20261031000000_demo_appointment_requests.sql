create table public.demo_appointment_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  reference text unique not null,
  full_name text not null,
  phone text not null,
  email text,
  patient_type text not null check (patient_type in ('new','existing','unsure')),
  appointment_type text not null,
  preferred_day text,
  preferred_time_window text,
  consent boolean not null default false,
  status text not null default 'demo_new',
  is_demo boolean not null default true
);
alter table public.demo_appointment_requests enable row level security;
revoke all on public.demo_appointment_requests from anon, authenticated;
-- The service role bypasses RLS; no public read or write policies are created.
