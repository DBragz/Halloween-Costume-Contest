import { useState } from 'react';
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from 'wagmi';
import { config } from './lib/wagmi';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Web3Provider, useWeb3 } from "@/contexts/Web3Context";
import WelcomeScreen from "@/components/WelcomeScreen";
import UserChoiceScreen from "@/components/UserChoiceScreen";
import ContestRegistrationForm from "@/components/ContestRegistrationForm";
import VotingScreen from "@/components/VotingScreen";
import LiveRankingsDashboard from "@/components/LiveRankingsDashboard";
import AdminPanel from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";
import { Trophy, UserCog } from "lucide-react";

function MainApp() {
  const [, setLocation] = useLocation();
  const { account } = useWeb3();

  if (!account) {
    return <WelcomeScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-chart-1 to-chart-3 rounded-md flex items-center justify-center glow-purple">
              <Trophy className="w-6 h-6 text-background" />
            </div>
            <h1 className="font-display font-bold text-xl text-foreground">
              Halloween Contest
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setLocation('/rankings')}
              variant="ghost"
              className="font-display hover-elevate"
              data-testid="nav-rankings"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Rankings
            </Button>
            <Button
              onClick={() => setLocation('/admin')}
              variant="ghost"
              className="font-display hover-elevate"
              data-testid="nav-admin"
            >
              <UserCog className="w-4 h-4 mr-2" />
              Admin
            </Button>
            <div className="px-4 py-2 border-2 border-chart-2 bg-chart-2/10 rounded-md glow-blue">
              <p className="text-sm font-mono text-foreground">
                {account.slice(0, 6)}...{account.slice(-4)}
              </p>
            </div>
          </div>
        </div>
      </nav>

      <Switch>
        <Route path="/">
          <UserChoiceScreen
            onEnterContest={() => setLocation('/register')}
            onGoToVoting={() => setLocation('/vote')}
          />
        </Route>
        <Route path="/register">
          <ContestRegistrationForm
            onBack={() => setLocation('/')}
            onSubmit={(data) => {
              console.log('Registration submitted:', data);
              setLocation('/');
            }}
          />
        </Route>
        <Route path="/vote">
          <VotingScreen onBack={() => setLocation('/')} />
        </Route>
        <Route path="/rankings">
          <LiveRankingsDashboard onBack={() => setLocation('/')} />
        </Route>
        <Route path="/admin">
          <AdminPanel onBack={() => setLocation('/')} />
        </Route>
      </Switch>
    </div>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Web3Provider>
            <MainApp />
          </Web3Provider>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
