-- Execute no SQL Editor do Supabase (projeto → SQL → New query).
-- Tabela de envios do formulário de contato da landing.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  service text not null,
  message text not null
);

comment on table public.contact_submissions is 'Leads do formulário do site (landing Utopia).';

alter table public.contact_submissions enable row level security;

-- Apenas inserção anónima (landing pública). Não expor leitura ao anon.
create policy "contact_submissions_insert_anon"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- Opcional: política para authenticated / service role ler no dashboard;
-- por defeito só vês os dados no Table Editor com a conta do projeto.
