import NavBar from '../../components/NavBar';
import PartyArea from '../../components/PartyArea';

export default function PartyPage() {
  return (
    <div className="min-h-screen p-6">
      <NavBar />
      <main>
        <h2 className="text-3xl neon">Party — Create / Join</h2>
        <div className="mt-4">
          <PartyArea />
        </div>
        <p className="mt-4 text-sm text-gray-400">Note: This is a local prototype. For real-time sync, we'll integrate Supabase Realtime later.</p>
      </main>
    </div>
  );
}
