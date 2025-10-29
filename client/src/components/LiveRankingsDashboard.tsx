import { Trophy, Medal, Award, ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Contestant } from '@shared/schema';

interface LiveRankingsDashboardProps {
  onBack?: () => void;
}

export default function LiveRankingsDashboard({ onBack }: LiveRankingsDashboardProps) {
  const { data: contestants = [], isLoading, isError } = useQuery<Contestant[]>({
    queryKey: ['/api', 'contestants'],
    refetchInterval: 5000,
  });

  const sortedContestants = [...contestants].sort((a, b) => b.votes - a.votes);
  const topThree = sortedContestants.slice(0, 3);
  const remaining = sortedContestants.slice(3);

  const getPodiumIcon = (position: number) => {
    switch (position) {
      case 0: return <Trophy className="w-12 h-12" />;
      case 1: return <Medal className="w-10 h-10" />;
      case 2: return <Award className="w-10 h-10" />;
      default: return null;
    }
  };

  const getPodiumColors = (position: number) => {
    switch (position) {
      case 0: return 'bg-background border-chart-3 text-chart-3 glow-orange-intense';
      case 1: return 'bg-background border-chart-2 text-chart-2 glow-blue-intense';
      case 2: return 'bg-background border-chart-1 text-chart-1 glow-purple-intense';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-muted-foreground hover-elevate"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <h1 className="font-display font-bold text-2xl sm:text-5xl bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 bg-clip-text text-transparent">
            LIVE RANKINGS
          </h1>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Loading rankings...
            </p>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-destructive text-lg">
              Failed to load rankings. Please try again later.
            </p>
          </div>
        ) : contestants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No contestants or votes yet. Enter the contest or start voting!
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 mb-6 sm:mb-12">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-chart-2 rounded-full animate-pulse glow-blue"></div>
              <p className="text-xs sm:text-sm text-muted-foreground">Live updates every 5 seconds</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-12">
          {topThree.map((contestant, index) => (
            <Card
              key={contestant.id}
              className={`p-4 sm:p-8 ${getPodiumColors(index)} border-2 transition-all ${
                index === 0 ? 'md:col-span-3 lg:col-span-1' : ''
              }`}
              data-testid={`card-rank-${index + 1}`}
            >
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-background/50 border-2 rounded-full">
                  {getPodiumIcon(index)}
                </div>
                <div>
                  <Badge className="mb-2 font-display text-xs sm:text-sm" data-testid={`badge-position-${index + 1}`}>
                    {index === 0 ? '1st' : index === 1 ? '2nd' : '3rd'} Place
                  </Badge>
                  <h2 className="font-display font-bold text-xl sm:text-2xl mb-1 sm:mb-2">
                    {contestant.personName}
                  </h2>
                  <p className="text-xs sm:text-sm mb-3 sm:mb-4">
                    {contestant.costumeName}
                  </p>
                  <div className="pt-3 sm:pt-4 border-t border-current/20">
                    <p className="text-3xl sm:text-5xl font-display font-bold" data-testid={`text-votes-rank-${index + 1}`}>
                      {contestant.votes}
                    </p>
                    <p className="text-xs sm:text-sm opacity-80">Votes</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {remaining.length > 0 && (
          <div className="space-y-3 sm:space-y-4">
            <h2 className="font-display font-semibold text-xl sm:text-2xl text-foreground mb-4 sm:mb-6">
              Other Contestants
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {remaining.map((contestant, index) => (
                <Card
                  key={contestant.id}
                  className="p-3 sm:p-6 bg-background border-2 border-chart-1 glow-purple flex items-center justify-between hover-elevate"
                  data-testid={`card-contestant-${contestant.id}`}
                >
                  <div className="flex items-center gap-3 sm:gap-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-chart-1/20 border-2 border-chart-1 rounded-full flex items-center justify-center">
                      <span className="font-display font-bold text-base sm:text-xl text-chart-1">
                        {index + 4}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-base sm:text-lg text-chart-1">
                        {contestant.personName}
                      </h3>
                      <p className="text-xs sm:text-sm text-chart-1">
                        {contestant.costumeName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl sm:text-3xl font-display font-bold text-chart-1" data-testid={`text-votes-${contestant.id}`}>
                      {contestant.votes}
                    </p>
                    <p className="text-xs text-chart-1">Votes</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}
