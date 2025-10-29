import { ArrowLeft } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import ContestantCard from './ContestantCard';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { useWeb3 } from '@/contexts/Web3Context';
import type { Contestant } from '@shared/schema';

interface VotingScreenProps {
  onBack: () => void;
  votedFor: string | null;
  setVotedFor: (id: string | null) => void;
}

export default function VotingScreen({ onBack, votedFor, setVotedFor }: VotingScreenProps) {
  const { toast } = useToast();
  const { account } = useWeb3();
  
  const { data: contestants = [], isLoading, isError } = useQuery<Contestant[]>({
    queryKey: ['/api', 'contestants'],
  });

  const voteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('POST', `/api/contestants/${id}/vote`, {
        walletAddress: account
      });
      if (!res.ok) {
        const error = await res.json();
        // If the error includes votedFor info, return it so we can sync state
        throw { message: error.error || 'Failed to vote', votedFor: error.votedFor };
      }
      return res.json();
    },
    onSuccess: (data, id) => {
      setVotedFor(id);
      queryClient.invalidateQueries({ queryKey: ['/api', 'contestants'] });
      queryClient.invalidateQueries({ queryKey: ['/api', 'votes', account] });
      toast({
        title: "Vote Recorded!",
        description: "Thank you for voting!",
      });
    },
    onError: (error: any) => {
      // If the server indicates the user already voted, sync the local state
      if (error.votedFor) {
        setVotedFor(error.votedFor);
      }
      toast({
        title: "Error",
        description: error.message || "Failed to record vote. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleVote = (id: string) => {
    if (votedFor !== null || voteMutation.isPending) return;
    voteMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover-elevate"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="font-display font-bold text-2xl sm:text-4xl text-chart-2">
            Vote for Contestants
          </h1>
        </div>

        {votedFor && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-chart-1/10 border-2 border-chart-1 rounded-md glow-purple text-center">
            <p className="text-chart-1 font-display font-semibold text-sm sm:text-base">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
