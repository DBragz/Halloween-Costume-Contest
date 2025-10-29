import { createContext, useContext, ReactNode } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

interface Web3ContextType {
  account: string | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const { address, isConnecting: wagmiConnecting } = useAccount();
  const { connectAsync, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const connectWallet = async () => {
    const walletConnectConnector = connectors.find((c) => c.id === 'walletConnect');
    if (!walletConnectConnector) {
      throw new Error('WalletConnect connector not available.');
    }
    await connectAsync({ connector: walletConnectConnector });
  };

  const disconnectWallet = () => {
    disconnect();
  };

  return (
    <Web3Context.Provider
      value={{
        account: address || null,
        isConnecting: wagmiConnecting || isPending,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}
