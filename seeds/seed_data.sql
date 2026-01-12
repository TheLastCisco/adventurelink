-- Insert sample worlds and a sample quest (adapted from scaffold data)

INSERT INTO public.worlds (id, title, description, genre)
VALUES
('nebula-falls', 'Nebula Falls', 'A crystalline skyline and rivers of starlight.', 'sci-fi/fantasy')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.worlds (id, title, description, genre)
VALUES
('elders-wood', 'Elders'' Wood', 'Mossy glades where ancient stones whisper.', 'fantasy')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.quests (id, title, world, start, nodes)
VALUES (
  'quest-001',
  'Portal at Nebula Falls',
  'nebula-falls',
  'start',
  '[
    {"id":"start","text":"A portal flickers by the waterfall. You sense a call to adventure.","choices":[{"text":"Approach the portal","to":"portal"},{"text":"Search the area","to":"search"}]},
    {"id":"portal","text":"The portal swirls with cosmos-light. A voice asks: ''Who enters?''","choices":[{"text":"Step through","to":"beyond"},{"text":"Hesitate and retreat","to":"retreat"}]},
    {"id":"search","text":"You find an old rune stone with markings of safe passage.","choices":[{"text":"Use the rune","to":"portal"},{"text":"Keep searching","to":"trap"}]},
    {"id":"beyond","text":"You arrive in a starlit field — the quest continues in your party''s chronicles.","choices":[]},
    {"id":"retreat","text":"You leave the portal intact. An enigmatic ally appears and offers help.","choices":[]},
    {"id":"trap","text":"A sleeping guardian wakens. End of branch — or a combat demo next?","choices":[]}
  ]'
)
ON CONFLICT (id) DO NOTHING;
