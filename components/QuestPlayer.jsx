import { useState } from 'react';

/**
 * Simple branching quest player that expects quest JSON:
 * { id, title, nodes: [{ id, text, choices: [{text, to}] }] }
 */
export default function QuestPlayer({ quest }) {
  const [nodeId, setNodeId] = useState(quest?.start || (quest?.nodes?.[0]?.id ?? null));
  const node = quest?.nodes?.find(n => n.id === nodeId);

  if (!quest || !node) return <div className="p-6">No quest loaded.</div>;

  return (
    <div className="p-6 space-y-4 card">
      <h3 className="text-2xl">{quest.title}</h3>
      <div className="text-gray-200">{node.text}</div>

      <div className="space-y-2">
        {node.choices?.length ? node.choices.map((c, i) => (
          <button key={i} onClick={() => setNodeId(c.to)} className="w-full py-2 px-3 text-left rounded-md bg-gradient-to-r from-cyan-800/30 to-transparent border border-cyan-600/30 neon">
            {c.text}
          </button>
        )) : <div className="italic text-sm text-gray-400">End of quest branch.</div>}
      </div>
    </div>
  );
}
