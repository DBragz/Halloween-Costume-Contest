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
  const contestants: Contestant[] = [];

  const handleVote = (id: number) => {
    if (votedFor !== null) return;
    setVotedFor(id);
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
          <h1 className="font-display font-bold text-4xl text-chart-2">
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

        {contestants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No contestants have entered yet. Be the first to enter the contest!
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
