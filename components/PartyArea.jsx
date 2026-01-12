import { useState } from 'react';

/**
 * Very small local mock of party creation/joining; later replace with Supabase / realtime.
 */
export default function PartyArea() {
  const [code, setCode] = useState('');
  const [party, setParty] = useState(null);

  function createParty() {
    const id = Math.random().toString(36).slice(2,8).toUpperCase();
    setParty({ id, members: [{ name: 'You (host)' }]});
  }
  function joinParty() {
    if (!code) return alert('Enter a code to join');
    setParty({ id: code, members: [{ name: 'You' }, { name: 'Friend1' }, { name: 'Friend2' }]});
  }

  return (
    <div className="p-4 card space-y-3">
      {!party ? (
        <>
          <div className="flex gap-2">
            <button onClick={createParty} className="px-4 py-2 rounded neon bg-cyan-800/30">Create Party</button>
            <input placeholder="Party code" value={code} onChange={(e)=>setCode(e.target.value)} className="p-2 rounded bg-black/10" />
            <button onClick={joinParty} className="px-4 py-2 rounded neon bg-cyan-800/30">Join</button>
          </div>
        </>
      ) : (
        <>
          <div className="text-sm">Party <span className="neon">{party.id}</span></div>
          <ul className="list-disc pl-6">
            {party.members.map((m,i)=>(<li key={i}>{m.name}</li>))}
          </ul>
        </>
      )}
    </div>
  );
}
