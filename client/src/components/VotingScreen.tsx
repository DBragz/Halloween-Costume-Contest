import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContestantCard from './ContestantCard';

interface Contestant {
  id: number;
  name: string;
  description: string;
  votes: number;
}

interface VotingScreenProps {
  onBack: () => void;
}

export default function VotingScreen({ onBack }: VotingScreenProps) {
  const [votedFor, setVotedFor] = useState<number | null>(null);
  
  // TODO: remove mock functionality
  const [contestants, setContestants] = useState<Contestant[]>([
    {
      id: 1,
      name: 'Vampire Lord',
      description: 'Classic vampire costume with custom fangs, flowing cape, and authentic Victorian-era clothing.',
      votes: 42,
    },
    {
      id: 2,
      name: 'Cyberpunk Witch',
      description: 'Futuristic witch with LED-lit hat, neon accents, and holographic crystal ball.',
      votes: 38,
    },
    {
      id: 3,
      name: 'Steampunk Inventor',
      description: 'Victorian inventor with working gear mechanisms, brass goggles, and steam-powered gadgets.',
      votes: 35,
    },
    {
      id: 4,
      name: 'Zombie Astronaut',
      description: 'Space explorer turned zombie with torn NASA suit and glowing alien parasite effects.',
      votes: 29,
    },
    {
      id: 5,
      name: 'Ice Queen',
      description: 'Frozen sorceress with crystalline dress, icicle crown, and magical snowflake effects.',
      votes: 27,
    },
    {
      id: 6,
      name: 'Pirate Captain',
      description: 'Weathered sea captain with authentic leather gear, compass, and treasured loot.',
      votes: 24,
    },
  ]);

  const handleVote = (id: number) => {
    if (votedFor !== null) return;
    
    setVotedFor(id);
    setContestants(prev =>
      prev.map(contestant =>
        contestant.id === id
          ? { ...contestant, votes: contestant.votes + 1 }
          : contestant
      )
    );
    console.log('Voted for contestant:', id);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover-elevate"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="font-display font-bold text-4xl text-foreground text-glow-blue">
            Vote for Contestants
          </h1>
        </div>

        {votedFor && (
          <div className="mb-6 p-4 bg-chart-1/10 border-2 border-chart-1 rounded-md glow-purple text-center">
            <p className="text-chart-1 font-display font-semibold">
              Thank you for voting! Your vote has been recorded.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contestants.map((contestant) => (
            <ContestantCard
              key={contestant.id}
              {...contestant}
              hasVoted={votedFor === contestant.id}
              onVote={handleVote}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
