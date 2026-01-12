import NavBar from '../../components/NavBar';
import QuestBuilder from '../../components/QuestBuilder';
import { useState } from 'react';

export default function Builder() {
  const [exported, setExported] = useState(null);

  return (
    <div className="min-h-screen p-6">
      <NavBar />
      <main>
        <h2 className="text-3xl neon">Quest Builder</h2>
        <p className="text-sm text-gray-400">Create branching quests, export JSON, then import into your repo or Supabase later.</p>
        <div className="mt-4 grid md:grid-cols-2 gap-6">
          <div>
            <QuestBuilder onExport={(q)=>setExported(q)} />
          </div>
          <div>
            <h4 className="text-lg">Exported JSON</h4>
            <pre className="p-4 mt-2 card text-sm max-h-[60vh] overflow-auto"><code>{exported ? JSON.stringify(exported, null, 2) : 'Exported quest will appear here.'}</code></pre>
          </div>
        </div>
      </main>
    </div>
  );
}
