import NavBar from '../components/NavBar';
import { useState } from 'react';

export default function CombatDemo() {
  const [enemyHp, setEnemyHp] = useState(20);
  const [log, setLog] = useState([]);

  function attack() {
    const dmg = Math.floor(Math.random() * 6) + 1;
    setEnemyHp(h => Math.max(0, h - dmg));
    setLog(l => [`You hit for ${dmg} damage`, ...l].slice(0, 10));
  }

  function enemyTurn() {
    const dmg = Math.floor(Math.random() * 5) + 1;
    setLog(l => [`Enemy hits you for ${dmg}`, ...l].slice(0, 10));
  }

  return (
    <div className="min-h-screen p-6">
      <NavBar />
      <main>
        <h2 className="text-3xl neon">Combat Demo</h2>
        <div className="mt-4 p-4 card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Foe: Star Warden</div>
              <div className="text-xl">HP: <span className="neon">{enemyHp}</span></div>
            </div>
            <div>
              <button disabled={enemyHp<=0} onClick={() => { attack(); enemyTurn(); }} className="px-4 py-2 rounded neon bg-cyan-800/30">Attack</button>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm text-gray-400">Combat Log</h4>
            <ul className="mt-2 list-disc pl-6">
              {log.map((l,i)=>(<li key={i}>{l}</li>))}
            </ul>
            {enemyHp <= 0 && <div className="mt-3 text-gold-400 neon">Enemy defeated!</div>}
          </div>
        </div>
      </main>
    </div>
  );
}
