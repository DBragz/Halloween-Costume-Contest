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
      <nav className="border-b border-chart-3/30 bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-black to-chart-3 rounded-md flex items-center justify-center glow-orange">
              <Trophy className="w-6 h-6 text-chart-3" />
            </div>
            <h1 className="font-display font-bold text-xl bg-gradient-to-r from-black to-chart-3 bg-clip-text text-transparent">
              Halloween Contest
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setLocation('/rankings')}
              variant="ghost"
              className="font-display text-chart-3 hover-elevate"
              data-testid="nav-rankings"
            >
              <Trophy className="w-4 h-4 mr-2 text-chart-3" />
              Rankings
            </Button>
            <Button
              onClick={() => setLocation('/admin')}
              variant="ghost"
              className="font-display text-chart-3 hover-elevate"
              data-testid="nav-admin"
            >
              <UserCog className="w-4 h-4 mr-2 text-chart-3" />
              Admin
            </Button>
            <div className="px-4 py-2 border-2 border-chart-3 bg-chart-3/10 rounded-md glow-orange">
              <p className="text-sm font-mono text-chart-3">
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
