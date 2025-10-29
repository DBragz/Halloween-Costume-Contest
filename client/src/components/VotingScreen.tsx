import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import ContestantCard from './ContestantCard';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import type { Contestant } from '@shared/schema';

interface VotingScreenProps {
  onBack: () => void;
}

export default function VotingScreen({ onBack }: VotingScreenProps) {
  const { toast } = useToast();
  const [votedFor, setVotedFor] = useState<string | null>(null);
  
  const { data: contestants = [], isLoading, isError } = useQuery<Contestant[]>({
    queryKey: ['/api', 'contestants'],
  });

  const voteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('POST', `/api/contestants/${id}/vote`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api', 'contestants'] });
      toast({
        title: "Vote Recorded!",
        description: "Thank you for voting!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to record vote. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleVote = (id: string) => {
    if (votedFor !== null || voteMutation.isPending) return;
    setVotedFor(id);
    voteMutation.mutate(id);
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

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Loading contestants...
            </p>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-destructive text-lg">
              Failed to load contestants. Please try again later.
            </p>
          </div>
        ) : contestants.length === 0 ? (
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
                id={contestant.id}
                personName={contestant.personName}
                costumeName={contestant.costumeName}
                votes={contestant.votes}
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
