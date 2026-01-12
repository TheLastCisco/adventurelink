import NavBar from '../../components/NavBar';
import worlds from '../../data/sampleWorlds.json';

export default function Worlds() {
  return (
    <div className="min-h-screen p-6 space-y-6">
      <NavBar />
      <main>
        <h2 className="text-3xl neon">Worlds</h2>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {worlds.map(w => (
            <div key={w.id} className="p-4 card">
              <div className="font-semibold">{w.title}</div>
              <div className="text-sm text-gray-400">{w.description}</div>
              <div className="mt-2 text-xs text-gray-500">Genre: {w.genre}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
