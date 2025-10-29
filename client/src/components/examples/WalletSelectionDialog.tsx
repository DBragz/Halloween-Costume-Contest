import { useState } from 'react';
import WalletSelectionDialog from '../WalletSelectionDialog';
import { Button } from '@/components/ui/button';

export default function WalletSelectionDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Button onClick={() => setOpen(true)}>Open Wallet Selection</Button>
      <WalletSelectionDialog
        open={open}
        onOpenChange={setOpen}
        onSelectMetaMask={() => {
          console.log('MetaMask selected');
          setOpen(false);
        }}
        onSelectWalletConnect={() => {
          console.log('WalletConnect selected');
          setOpen(false);
        }}
      />
    </div>
  );
}
