import Link from 'next/link';
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import SignInModal from './SignInModal';

export default function NavBar() {
  const { user, signOut, initializing } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  function openSignIn() {
    if (initializing) return; // prevent opening modal while auth is initializing
    setOpen(true);
  }

  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between card">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <a className="text-logo text-xl">AdventureLink</a>
        </Link>
        <Link href="/worlds"><a className="ml-4 neon">Worlds</a></Link>
        <Link href="/quests"><a className="ml-4 neon">Quests</a></Link>
        <Link href="/builder"><a className="ml-4 neon">Builder</a></Link>
        <Link href="/character"><a className="ml-4 neon">Character</a></Link>
        <Link href="/party"><a className="ml-4 neon">Party</a></Link>
        <Link href="/combat-demo"><a className="ml-4 neon">Combat Demo</a></Link>
      </div>

      <div className="flex items-center space-x-4">
        {initializing ? (
          <div className="w-24 h-6 bg-black/10 rounded animate-pulse" />
        ) : user ? (
          <>
            <div className="text-sm opacity-90">{user.email}</div>
            <button onClick={() => signOut()} className="px-3 py-1 rounded neon bg-cyan-800/30">Sign Out</button>
          </>
        ) : (
          <>
            <button onClick={openSignIn} className="px-3 py-1 rounded neon bg-cyan-800/30">Sign In</button>
            {open && !initializing && <SignInModal open={open} onClose={() => setOpen(false)} />}
          </>
        )}
      </div>
    </nav>
  );
}
