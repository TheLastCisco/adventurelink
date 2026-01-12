# AdventureLink — Infinite Bastion (Prototype)

A prototype Next.js (Pages Router) + Tailwind CSS app for cooperative fantasy quests and branching storytelling. Includes a simple in-browser quest builder, character creator (local), party create/join mock, a combat demo, and Supabase client wiring for future database/realtime integration.

## Features included in this scaffold
- Next.js Pages Router structure
- Tailwind CSS with a dark "cosmic fantasy nexus" theme
- Pages: Home, Worlds, Quests (list + play), Quest Builder, Character (create), Party (create/join), Combat Demo
- Simple QuestPlayer component that plays branching quests from JSON
- QuestBuilder component (in-browser) that exports quest JSON
- Supabase client wiring (`lib/supabaseClient.js`) — add env vars to connect
- Seed data: `/data/sampleWorlds.json`, `/data/sampleQuests.json`
- README with run & deploy instructions

## Local development

1. Clone (or if you asked me to push, the repo will be `https://github.com/TheLastCisco/adventurelink`)
2. Install:
   - Node 18+ recommended
   - npm install

3. Create `.env.local` from `.env.local.example` and set:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Run:
```
npm run dev
```
Open http://localhost:3000

## Supabase integration notes
- `lib/supabaseClient.js` is configured to use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- For production, configure project-level env vars in Vercel (do NOT commit service_role keys to the repo).
- Tables you might create in Supabase:
  - worlds (id, title, description, genre, metadata json)
  - quests (id, title, world, start, nodes jsonb, created_by)
  - characters (id, owner, data jsonb)
  - parties (id, code, members jsonb, metadata)
- For realtime party sync, use Supabase Realtime or Postgres replication / websockets.

## Deploying to Vercel
1. Link your GitHub repo in Vercel (or use `vercel` CLI).
2. Set environment variables in Vercel dashboard:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
3. Deploy. Vercel will detect Next.js and build.

## Next steps & roadmap (suggested)
- Persist quests/characters/parties to Supabase
- Add user auth (Supabase Auth)
- Enable Realtime for party sync (Supabase Realtime or edge functions)
- Add rich editor for Quest Builder (visual node graph)
- Implement permissions and RLS policies for multi-user data
- Add analytics and instrumentation

---

I'm pushing this now as requested.
