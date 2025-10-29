import WalletConnectButton from '../WalletConnectButton';
import { Web3Provider } from '@/contexts/Web3Context';

export default function WalletConnectButtonExample() {
  return (
    <Web3Provider>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <WalletConnectButton />
      </div>
    </Web3Provider>
  );
}
