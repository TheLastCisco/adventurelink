import NavBar from '../../components/NavBar';
import Link from 'next/link';
import quests from '../../data/sampleQuests.json';

export default function Quests() {
  return (
    <div className="min-h-screen p-6 space-y-6">
      <NavBar />
      <main>
        <h2 className="text-3xl neon">Quests Archive</h2>
        <div className="mt-4 space-y-4">
          {quests.map(q => (
            <div key={q.id} className="p-4 card flex items-center justify-between">
              <div>
                <div className="font-medium">{q.title}</div>
                <div className="text-xs text-gray-400">ID: {q.id} • World: {q.world}</div>
              </div>
              <div>
                <Link href={`/quests/${q.id}`}><a className="px-3 py-2 rounded neon bg-cyan-800/30">Play</a></Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
