-- 1. INITIALIZE DYNAMIC REGISTRATION INGRESS MANIFEST TABLE FIRST
create table public.profiles (
    id uuid default gen_random_uuid() primary key,
    github_username text not null unique,
    secure_email text not null,
    engineering_vector text not null,
    commit_frequency text default 'LIVE_TIMELINE_ACTIVE' not null,
    ingress_status text default 'VERIFIED' not null check (ingress_status in ('VERIFIED', 'COMPILING', 'FLAGGED')),
    audit_status text default 'CLEAR' not null check (audit_status in ('CLEAR', 'WAITING', 'ERROR')),
    created_at timestamptz default timezone('utc'::text, now()) not null
);

-- OPTIMIZE INDEX ROADS FOR HIGH-VELOCITY LOOKUP CHANNELS
create index idx_profiles_username on public.profiles(github_username);
create index idx_profiles_created_at on public.profiles(created_at desc);

-- 2. SECURE EXTENSION REPLICATION FOR REALTIME TRAFFIC ONLY AFTER RELEATION CREATION
alter publication supabase_realtime add table public.profiles;

-- 3. SPECIFICATION LOOKBOOK REGISTRY MANIFEST TABLE
create table public.lookbook_specs (
    id bigint generated always as identity primary key,
    entry_ref text not null unique,
    title text not null,
    category text not null,
    metadata_json jsonb not null,
    payload_matrix text not null,
    vector_affinity text not null check (vector_affinity in ('fullstack', 'ai', 'devops', 'frontend')),
    created_at timestamptz default timezone('utc'::text, now()) not null
);

create index idx_lookbook_affinity on public.lookbook_specs(vector_affinity);
