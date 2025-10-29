import { createContext, useContext, ReactNode } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';

interface Web3ContextType {
  account: string | null;
  isConnecting: boolean;
  connectMetaMask: () => Promise<void>;
  connectWalletConnect: () => Promise<void>;
  disconnectWallet: () => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const { address, isConnecting: wagmiConnecting } = useAccount();
  const { connectAsync, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const connectMetaMask = async () => {
    const injectedConnector = connectors.find((c) => c.id === 'injected');
    if (!injectedConnector) {
      throw new Error('MetaMask connector not available. Please install MetaMask browser extension.');
    }
    await connectAsync({ connector: injectedConnector });
  };

  const connectWalletConnect = async () => {
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
        connectMetaMask,
        connectWalletConnect,
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
