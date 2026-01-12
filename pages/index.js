import Link from 'next/link';
import NavBar from '../components/NavBar';
import worlds from '../data/sampleWorlds.json';
import quests from '../data/sampleQuests.json';

export default function Home() {
  return (
    <div className="min-h-screen p-6 space-y-6">
      <NavBar />
      <header className="p-8 card">
        <h1 className="text-4xl text-logo">Infinite Bastion</h1>
        <p className="mt-2 text-lg text-gray-300">A cosmic fantasy nexus for co-op storytelling and RPG-style missions.</p>
        <div className="mt-4">
          <Link href="/quests"><a className="px-4 py-2 rounded neon bg-cyan-800/30">Play Quests</a></Link>
          <Link href="/builder"><a className="ml-3 px-4 py-2 rounded neon bg-cyan-800/20">Open Builder</a></Link>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 card">
          <h3 className="text-xl neon">Worlds</h3>
          <ul className="mt-3">
            {worlds.map(w => <li key={w.id} className="py-2 border-b border-white/3">
              <div className="font-medium">{w.title}</div>
              <div className="text-sm text-gray-400">{w.description}</div>
            </li>)}
          </ul>
        </div>

        <div className="p-4 card">
          <h3 className="text-xl neon">Featured Quests</h3>
          <ul className="mt-3">
            {quests.map(q => <li key={q.id} className="py-2 border-b border-white/3">
              <div className="font-medium">{q.title}</div>
              <div className="text-sm text-gray-400">World: {q.world}</div>
            </li>)}
          </ul>
        </div>
      </section>
    </div>
  );
}
