import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ContestantCardProps {
  id: number;
  name: string;
  description: string;
  votes: number;
  hasVoted: boolean;
  onVote: (id: number) => void;
}

export default function ContestantCard({ id, name, description, votes, hasVoted, onVote }: ContestantCardProps) {
  return (
    <Card
      className={`p-6 bg-card border-2 transition-all ${
        hasVoted
          ? 'border-chart-1 glow-purple opacity-90'
          : 'border-card-border hover-elevate'
      }`}
      data-testid={`card-contestant-${id}`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-display font-semibold text-xl text-foreground mb-2">
              {name}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {description}
            </p>
          </div>
          {hasVoted && (
            <Badge className="bg-chart-1/20 border-chart-1 text-chart-1 glow-purple" data-testid="badge-voted">
              <Check className="w-3 h-3 mr-1" />
              Voted
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-3xl font-display font-bold text-chart-2 text-glow-blue" data-testid={`text-votes-${id}`}>
              {votes}
            </p>
            <p className="text-xs text-muted-foreground">Votes</p>
          </div>

          <Button
            onClick={() => onVote(id)}
            disabled={hasVoted}
            className={`${
              hasVoted
                ? 'bg-muted text-muted-foreground'
                : 'bg-chart-2 hover:bg-chart-2 border-2 border-chart-2 text-black glow-blue-intense'
            } font-display font-semibold`}
            data-testid={`button-vote-${id}`}
          >
            {hasVoted ? 'Already Voted' : 'Vote'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
