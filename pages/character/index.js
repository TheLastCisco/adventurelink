import NavBar from '../../components/NavBar';
import CharacterForm from '../../components/CharacterForm';
import { useState } from 'react';

export default function CharacterPage() {
  const [saved, setSaved] = useState(null);

  function handleSave(char) {
    // In a real app you'd save to Supabase here. For now store in localStorage.
    try {
      const list = JSON.parse(localStorage.getItem('characters') || '[]');
      list.push(char);
      localStorage.setItem('characters', JSON.stringify(list));
      setSaved(char);
      alert('Character saved locally (localStorage). Later: wire to Supabase.');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="min-h-screen p-6">
      <NavBar />
      <main>
        <h2 className="text-3xl neon">Character Creator</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-6">
          <CharacterForm onSave={handleSave} />
          <div className="p-4 card">
            <h4 className="text-lg">Saved Characters (local)</h4>
            <ul className="mt-2 text-sm">
              {(JSON.parse(typeof window !== 'undefined' ? (localStorage.getItem('characters') || '[]') : '[]')).map((c, i)=>(
                <li key={i} className="py-1">{c.name} — {c.klass}</li>
              ))}
            </ul>
            {saved && (
              <div className="mt-3 text-xs text-gray-400">Last saved: {saved.name}</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
