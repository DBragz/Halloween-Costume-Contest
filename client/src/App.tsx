import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Web3Provider, useWeb3 } from "@/contexts/Web3Context";
import WelcomeScreen from "@/components/WelcomeScreen";
import ContestRegistrationForm from "@/components/ContestRegistrationForm";
import VotingScreen from "@/components/VotingScreen";
import LiveRankingsDashboard from "@/components/LiveRankingsDashboard";
import AdminPanel from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";
import { Trophy, UserCog, LogOut, Ghost, Vote } from "lucide-react";
import type { Vote as VoteType } from "@shared/schema";

function MainApp() {
  const [, setLocation] = useLocation();
  const { account, disconnectWallet } = useWeb3();
  const [votedFor, setVotedFor] = useState<string | null>(null);

  // Fetch vote status from database
  const { data: voteData } = useQuery<VoteType | null>({
    queryKey: ['/api', 'votes', account],
    enabled: !!account,
  });

  // Update votedFor when vote data is loaded or account changes
  useEffect(() => {
    if (voteData) {
      setVotedFor(voteData.contestantId);
    } else {
      setVotedFor(null);
    }
  }, [voteData, account]);

  if (!account) {
    return <WelcomeScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-chart-3/30 bg-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-black to-chart-3 rounded-md flex items-center justify-center glow-orange">
              <Trophy className="w-4 h-4 sm:w-6 sm:h-6 text-chart-3" />
            </div>
            <h1 className="font-display font-bold text-sm sm:text-xl text-chart-3">
              <span className="hidden sm:inline">Halloween Costume Contest</span>
              <span className="sm:hidden">Halloween</span>
            </h1>
          </div>
          <div className="flex items-center gap-1 sm:gap-4">
            <Button
              onClick={() => setLocation('/register')}
              variant="ghost"
              className="font-display hover-elevate text-chart-3 sm:px-4"
              data-testid="nav-enter-contest"
            >
              <Ghost className="w-4 h-4 text-chart-3 sm:mr-2" />
              <span className="hidden sm:inline">Enter Contest</span>
            </Button>
            <Button
              onClick={() => setLocation('/vote')}
              variant="ghost"
              disabled={votedFor !== null}
              className={`font-display hover-elevate sm:px-4 ${
                votedFor !== null
                  ? 'text-muted-foreground cursor-not-allowed opacity-50'
                  : 'text-chart-3'
              }`}
              data-testid="nav-vote"
            >
              <Vote className={`w-4 h-4 sm:mr-2 ${votedFor !== null ? 'text-muted-foreground' : 'text-chart-3'}`} />
              <span className="hidden sm:inline">Vote</span>
            </Button>
            <Button
              onClick={() => setLocation('/rankings')}
              variant="ghost"
              className="font-display hover-elevate text-chart-3 sm:px-4"
              data-testid="nav-rankings"
            >
              <Trophy className="w-4 h-4 text-chart-3 sm:mr-2" />
              <span className="hidden sm:inline">Rankings</span>
            </Button>
            <Button
              onClick={() => setLocation('/admin')}
              variant="ghost"
              className="font-display hover-elevate text-chart-3 sm:px-4"
              data-testid="nav-admin"
            >
              <UserCog className="w-4 h-4 text-chart-3 sm:mr-2" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
            <div className="hidden sm:block px-4 py-2 border-2 border-chart-3 bg-chart-3/10 rounded-md glow-orange">
              <p className="text-sm font-mono text-chart-3">
                {account.slice(0, 6)}...{account.slice(-4)}
              </p>
            </div>
            <Button
              onClick={disconnectWallet}
              variant="ghost"
              size="icon"
              className="hover-elevate text-chart-3"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 text-chart-3" />
            </Button>
          </div>
        </div>
      </nav>

      <Switch>
        <Route path="/">
          <LiveRankingsDashboard />
        </Route>
        <Route path="/register">
          <ContestRegistrationForm
            onBack={() => setLocation('/rankings')}
          />
        </Route>
        <Route path="/vote">
          <VotingScreen 
            onBack={() => setLocation('/rankings')} 
            votedFor={votedFor}
            setVotedFor={setVotedFor}
          />
        </Route>
        <Route path="/rankings">
          <LiveRankingsDashboard />
        </Route>
        <Route path="/admin">
          <AdminPanel onBack={() => setLocation('/rankings')} />
        </Route>
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Web3Provider>
          <MainApp />
        </Web3Provider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
