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
      </div>
    </div>
  );
}
