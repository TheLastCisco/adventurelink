import NavBar from '../../components/NavBar';
import CharacterForm from '../../components/CharacterForm';
import { useState, useEffect, useContext } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { AuthContext } from '../../contexts/AuthContext';

export default function CharacterPage() {
  const { user } = useContext(AuthContext);
  const [saved, setSaved] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setCharacters([]);
      return;
    }
    let mounted = true;
    setLoading(true);
    (async () => {
      const { data, error } = await supabase
        .from('characters')
        .select('id, data')
        .eq('owner', user.id)
        .order('created_at', { ascending: false });
      if (error) {
        console.error(error);
      } else if (mounted) {
        setCharacters(data || []);
      }
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [user]);

  async function handleSave(char) {
    if (!user) return alert('Please sign in to save characters.');
    try {
      // generate a non-demo id (UUID) on the client
      const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `char-${Date.now()}`;
      const payload = { id, owner: user.id, data: char };
      // insert (use upsert if you want to allow updates)
      const { error } = await supabase.from('characters').insert(payload);
      if (error) throw error;
      setSaved(char);
      // refresh list
      const { data } = await supabase.from('characters').select('id, data').eq('owner', user.id).order('created_at', { ascending: false });
      setCharacters(data || []);
      alert('Character saved to Supabase.');
    } catch (e) {
      console.error(e);
      alert('Failed to save character. See console.');
    }
  }

  return (
    <div className="min-h-screen p-6">
      <NavBar />
      <main>
        <h2 className="text-3xl neon">Character Creator</h2>
        {!user ? (
          <div className="mt-4 p-4 card">Please sign in to create and save characters.</div>
        ) : (
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            <CharacterForm onSave={handleSave} />
            <div className="p-4 card">
              <h4 className="text-lg">Saved Characters (Supabase)</h4>
              {loading ? <div className="text-sm text-gray-400">Loading…</div> : (
                <ul className="mt-2 text-sm">
                  {characters.map((c, i) => (
                    <li key={i} className="py-1">{c.data?.name} — {c.data?.klass}</li>
                  ))}
                </ul>
              )}
              {saved && (
                <div className="mt-3 text-xs text-gray-400">Last saved: {saved.name}</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
