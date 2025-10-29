import WalletConnectButton from './WalletConnectButton';

export default function WelcomeScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-12">
        <div className="space-y-6">
          <div className="inline-block">
            <h1 className="font-display font-bold text-6xl md:text-7xl text-white mb-2">
              Halloween
            </h1>
            <h1 className="font-display font-bold text-6xl md:text-7xl bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 bg-clip-text text-transparent">
              Costume Contest
            </h1>
          </div>
          <p className="text-xl text-white font-sans max-w-lg mx-auto">
            Connect your Web3 wallet to enter the contest or vote for your favorite costume
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <WalletConnectButton />
          <p className="text-sm text-white">
            Requires MetaMask or compatible Web3 wallet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="p-6 bg-background border-2 border-chart-1 rounded-md glow-purple">
            <h3 className="font-display font-bold text-xl text-chart-1 mb-2 text-glow-purple">Enter Contest</h3>
            <p className="text-sm text-chart-1">
              Submit your costume and compete for the top spot
            </p>
          </div>
          <div className="p-6 bg-background border-2 border-chart-2 rounded-md glow-blue">
            <h3 className="font-display font-bold text-xl text-chart-2 mb-2 text-glow-blue">Vote</h3>
            <p className="text-sm text-chart-2">
              Support your favorite costumes with your vote
            </p>
          </div>
          <div className="p-6 bg-background border-2 border-chart-3 rounded-md glow-orange">
            <h3 className="font-display font-bold text-xl text-chart-3 mb-2 text-glow-orange">Live Rankings</h3>
            <p className="text-sm text-chart-3">
              Watch the leaderboard update in real-time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
