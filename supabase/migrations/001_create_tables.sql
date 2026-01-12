-- Create core tables for AdventureLink

CREATE TABLE IF NOT EXISTS public.worlds (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  genre text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.quests (
  id text PRIMARY KEY,
  title text NOT NULL,
  world text REFERENCES public.worlds(id),
  start text,
  nodes jsonb,
  created_by uuid,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.characters (
  id text PRIMARY KEY,
  owner uuid REFERENCES auth.users ON DELETE CASCADE,
  data jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.parties (
  id text PRIMARY KEY,
  code text UNIQUE,
  host uuid REFERENCES auth.users,
  members jsonb,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Row Level Security example for characters (only owners can manage)
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can manage their characters"
  ON public.characters
  FOR ALL
  USING (owner = auth.uid())
  WITH CHECK (owner = auth.uid());

-- Note: enabling RLS and policies assumes you will manage migrations in Supabase and have Auth enabled.
