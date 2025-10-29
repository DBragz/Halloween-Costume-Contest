import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/contexts/Web3Context';
import { useToast } from '@/hooks/use-toast';

export default function WalletConnectButton() {
  const { account, isConnecting, connectWallet } = useWeb3();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: 'Connection Error',
        description: 'Failed to connect wallet. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (account) {
    return (
      <div className="flex items-center gap-3" data-testid="wallet-connected">
        <div className="px-4 py-2 border-2 border-chart-2 bg-chart-2/10 rounded-md glow-blue">
          <p className="text-sm font-mono text-foreground">
            {account.slice(0, 6)}...{account.slice(-4)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-chart-2 hover:bg-chart-2 border-2 border-chart-2 text-black font-display font-semibold text-base px-8 py-6 glow-blue-intense"
      data-testid="button-connect-wallet"
    >
      <Wallet className="w-5 h-5 mr-2" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
}
