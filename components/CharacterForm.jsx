import { useState } from 'react';

export default function CharacterForm({ initial = {}, onSave }) {
  const [name, setName] = useState(initial.name || '');
  const [klass, setKlass] = useState(initial.klass || 'Wanderer');
  const [bio, setBio] = useState(initial.bio || '');

  function save() {
    const char = { id: initial.id || `char-${Date.now()}`, name, klass, bio, created_at: new Date().toISOString() };
    onSave?.(char);
  }

  return (
    <div className="p-4 card space-y-3">
      <input placeholder="Character name" value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-2 rounded bg-black/10" />
      <input placeholder="Class" value={klass} onChange={(e)=>setKlass(e.target.value)} className="w-full p-2 rounded bg-black/10" />
      <textarea placeholder="Short bio" rows={4} value={bio} onChange={(e)=>setBio(e.target.value)} className="w-full p-2 rounded bg-black/10" />
      <div className="flex justify-end">
        <button onClick={save} className="px-4 py-2 rounded neon bg-cyan-800/30">Save Character</button>
      </div>
    </div>
  );
}
