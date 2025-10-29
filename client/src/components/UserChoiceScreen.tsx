import { Ghost, Vote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useWeb3 } from '@/contexts/Web3Context';

interface UserChoiceScreenProps {
  onEnterContest: () => void;
  onGoToVoting: () => void;
}

export default function UserChoiceScreen({ onEnterContest, onGoToVoting }: UserChoiceScreenProps) {
  const { account } = useWeb3();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="font-display font-bold text-4xl text-foreground text-glow-purple">
            Halloween Costume Contest
          </h1>
          {account && (
            <div className="px-4 py-2 border-2 border-chart-2 bg-chart-2/10 rounded-md glow-blue">
              <p className="text-sm font-mono text-foreground">
                {account.slice(0, 6)}...{account.slice(-4)}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card
            onClick={onEnterContest}
            className="p-12 bg-background border-2 border-chart-3 cursor-pointer hover-elevate active-elevate-2 transition-all glow-orange group"
            data-testid="card-enter-contest"
          >
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-chart-3/20 border-2 border-chart-3 rounded-full glow-orange-intense">
                <Ghost className="w-12 h-12 text-chart-3" />
              </div>
              <div className="space-y-3">
                <h2 className="font-display font-bold text-3xl text-chart-3">
                  Enter Contest
                </h2>
                <p className="text-chart-3 text-lg">
                  Submit your Halloween costume and compete for the top spot in the rankings
                </p>
              </div>
            </div>
          </Card>

          <Card
            onClick={onGoToVoting}
            className="p-12 bg-background border-2 border-chart-2 cursor-pointer hover-elevate active-elevate-2 transition-all glow-blue group"
            data-testid="card-vote-contestants"
          >
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-chart-2/20 border-2 border-chart-2 rounded-full glow-blue-intense">
                <Vote className="w-12 h-12 text-chart-2" />
              </div>
              <div className="space-y-3">
                <h2 className="font-display font-bold text-3xl text-chart-2">
                  Vote for Contestants
                </h2>
                <p className="text-chart-2 text-lg">
                  Browse all costume entries and cast your vote for your favorite
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
