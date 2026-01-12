import Link from 'next/link';

export default function NavBar() {
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
      <div className="text-sm opacity-80">Infinite Bastion • Prototype</div>
    </nav>
  );
}
