import { useRouter } from 'next/router';
import NavBar from '../../components/NavBar';
import QuestPlayer from '../../components/QuestPlayer';
import quests from '../../data/sampleQuests.json';

export default function QuestPage() {
  const router = useRouter();
  const { id } = router.query;
  const quest = quests.find(q => q.id === id);

  return (
    <div className="min-h-screen p-6">
      <NavBar />
      <main className="mt-6">
        {quest ? (
          <>
            <h2 className="text-3xl neon">{quest.title}</h2>
            <div className="mt-4">
              <QuestPlayer quest={quest} />
            </div>
          </>
        ) : (
          <div className="p-6 card">Quest not found (or loading)...</div>
        )}
      </main>
    </div>
  );
}
