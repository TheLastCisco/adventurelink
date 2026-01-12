import { useState } from 'react';

/**
 * Very basic in-browser quest builder that creates JSON nodes.
 * UX is intentionally minimal for prototype. You can expand later.
 */
export default function QuestBuilder({ onExport }) {
  const [nodes, setNodes] = useState([
    { id: 'start', text: 'You stand at a shimmering portal...', choices: [{ text: 'Enter', to: 'portal' }] },
    { id: 'portal', text: 'A world of stars unfolds...', choices: [{ text: 'Venture on', to: 'end' }] },
    { id: 'end', text: 'You reach the nexus.', choices: [] }
  ]);

  function addNode() {
    const id = `n${Date.now()}`;
    setNodes([...nodes, { id, text: 'New node text', choices: [] }]);
  }
  function updateNode(idx, key, val) {
    const copy = [...nodes];
    copy[idx][key] = val;
    setNodes(copy);
  }
  function exportJSON() {
    const q = { id: `quest-${Date.now()}`, title: 'New Quest', start: nodes[0].id, nodes };
    onExport?.(q);
  }

  return (
    <div className="space-y-4">
      {nodes.map((n, idx) => (
        <div key={n.id} className="p-3 card">
          <div className="flex items-center justify-between">
            <div className="font-medium">{n.id}</div>
            <div className="text-sm text-gray-400">Choices: {n.choices?.length ?? 0}</div>
          </div>
          <textarea value={n.text} onChange={(e) => updateNode(idx, 'text', e.target.value)} className="w-full mt-2 p-2 rounded bg-black/10" rows={3} />
        </div>
      ))}
      <div className="flex gap-3">
        <button onClick={addNode} className="px-4 py-2 rounded bg-cyan-700/40 neon">Add Node</button>
        <button onClick={exportJSON} className="px-4 py-2 rounded bg-gold-400" style={{background: 'linear-gradient(90deg,#ffd37e,#ffc86b)'}}>Export JSON</button>
      </div>
    </div>
  );
}
