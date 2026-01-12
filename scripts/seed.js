// Simple seed script using SUPABASE_SERVICE_ROLE_KEY. Run with:
// SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed.js

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function seed() {
  try {
    const worlds = [
      { id: 'nebula-falls', title: 'Nebula Falls', description: 'A crystalline skyline and rivers of starlight.', genre: 'sci-fi/fantasy' },
      { id: 'elders-wood', title: "Elders' Wood", description: 'Mossy glades where ancient stones whisper.', genre: 'fantasy' }
    ];

    const quests = [
      {
        id: 'quest-001',
        title: 'Portal at Nebula Falls',
        world: 'nebula-falls',
        start: 'start',
        nodes: [
          { id: 'start', text: 'A portal flickers by the waterfall. You sense a call to adventure.', choices: [{ text: 'Approach the portal', to: 'portal' }, { text: 'Search the area', to: 'search' }] },
          { id: 'portal', text: "The portal swirls with cosmos-light. A voice asks: 'Who enters?'", choices: [{ text: 'Step through', to: 'beyond' }, { text: 'Hesitate and retreat', to: 'retreat' }] },
          { id: 'search', text: 'You find an old rune stone with markings of safe passage.', choices: [{ text: 'Use the rune', to: 'portal' }, { text: 'Keep searching', to: 'trap' }] },
          { id: 'beyond', text: "You arrive in a starlit field — the quest continues in your party's chronicles.", choices: [] },
          { id: 'retreat', text: 'You leave the portal intact. An enigmatic ally appears and offers help.', choices: [] },
          { id: 'trap', text: 'A sleeping guardian wakens. End of branch — or a combat demo next?', choices: [] }
        ]
      }
    ];

    const { error: e1 } = await supabase.from('worlds').upsert(worlds);
    if (e1) throw e1;
    console.log('Worlds seeded');

    const { error: e2 } = await supabase.from('quests').upsert(quests);
    if (e2) throw e2;
    console.log('Quests seeded');

    console.log('Seed complete');
  } catch (err) {
    console.error('Seed failed', err);
    process.exit(1);
  }
}

seed();
