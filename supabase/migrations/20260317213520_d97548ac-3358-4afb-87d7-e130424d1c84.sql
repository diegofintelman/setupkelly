
create table if not exists public.progresso (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  checked     jsonb not null default '{}'::jsonb,
  active_step int  not null default 0,
  updated_at  timestamptz not null default now()
);

create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_progresso_updated_at
  before update on progresso
  for each row execute function update_updated_at();

create policy "leitura_publica" on progresso for select using (true);
create policy "escrita_publica" on progresso for insert with check (true);
create policy "atualizacao_publica" on progresso for update using (true);
