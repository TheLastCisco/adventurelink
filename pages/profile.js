import NavBar from '../components/NavBar';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user, signOut } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen p-6">
        <NavBar />
        <main className="mt-6">
          <div className="p-6 card">You are not signed in. Use Sign In to continue.</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <NavBar />
      <main className="mt-6 space-y-4">
        <h2 className="text-3xl neon">Profile</h2>
        <div className="p-4 card">
          <div className="text-sm text-gray-400">User ID</div>
          <div className="font-mono py-2">{user.id}</div>

          <div className="text-sm text-gray-400 mt-3">Email</div>
          <div className="py-2">{user.email}</div>

          <div className="text-sm text-gray-400 mt-3">User Metadata</div>
          <pre className="p-2 mt-2 rounded bg-black/10 text-sm overflow-auto"><code>{JSON.stringify(user.user_metadata || {}, null, 2)}</code></pre>

          <div className="mt-4 flex gap-3">
            <button onClick={() => signOut()} className="px-4 py-2 rounded neon bg-cyan-800/30">Sign Out</button>
          </div>
        </div>
      </main>
    </div>
  );
}
