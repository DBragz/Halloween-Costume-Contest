import { Wallet, Smartphone, QrCode } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface WalletSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectMetaMask: () => void;
  onSelectWalletConnect: () => void;
}

export default function WalletSelectionDialog({
  open,
  onOpenChange,
  onSelectMetaMask,
  onSelectWalletConnect,
}: WalletSelectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-2 border-chart-1 glow-purple max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-foreground text-center">
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription className="text-center text-white">
            Choose your preferred wallet to continue
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <Card
            onClick={onSelectMetaMask}
            className="p-6 bg-background border-2 border-chart-3 cursor-pointer hover-elevate active-elevate-2 transition-all glow-orange"
            data-testid="card-metamask"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-chart-3/20 border-2 border-chart-3 rounded-full flex items-center justify-center glow-orange-intense">
                <Wallet className="w-6 h-6 text-chart-3" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                  MetaMask
                </h3>
                <p className="text-sm text-chart-3">
                  Browser extension wallet
                </p>
              </div>
            </div>
          </Card>

          <Card
            onClick={onSelectWalletConnect}
            className="p-6 bg-background border-2 border-chart-2 cursor-pointer hover-elevate active-elevate-2 transition-all glow-blue"
            data-testid="card-walletconnect"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-chart-2/20 border-2 border-chart-2 rounded-full flex items-center justify-center glow-blue-intense">
                <Smartphone className="w-6 h-6 text-chart-2" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                  WalletConnect
                </h3>
                <p className="text-sm text-chart-2">
                  Mobile wallets & more
                </p>
              </div>
            </div>
          </Card>

          <div className="pt-4 border-t border-border">
            <div className="flex items-start gap-3 text-xs text-muted-foreground">
              <QrCode className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                WalletConnect supports Trust Wallet, Rainbow, Coinbase Wallet, and 700+ other wallets
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
