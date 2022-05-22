import { useEffect, useState } from "react";
import { useCallback } from "react";
import { createContext, ReactNode, useContext } from "react";
import { noop } from "../../utils";

const { ethereum } = window;

interface WalletContextValue {
  connectWallet: () => Promise<void>;
  currentAccount?: string;
  isInitialized: boolean;
}

const WalletContext = createContext<WalletContextValue>({
  connectWallet: noop.async,
  isInitialized: false,
});

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [currentAccount, setCurrentAccount] = useState<string>();
  const [isInitialized, setIsInitialized] = useState(false);

  const showNoWalletAlert = useCallback(() => {
    alert("Please install MetaMask (ethereum object can't be found).");
  }, []);

  const checkIfWalletConnected = useCallback(async () => {
    try {
      if (!ethereum) {
        return showNoWalletAlert();
      }

      const accounts = await ethereum.request?.({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (e) {
      showNoWalletAlert();
    } finally {
      setIsInitialized(true);
    }
  }, [showNoWalletAlert]);

  const connectWallet = useCallback(async () => {
    try {
      if (!ethereum) {
        return showNoWalletAlert();
      }

      const accounts = await ethereum.request?.({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (e) {
      showNoWalletAlert();
    } finally {
      setIsInitialized(true);
    }
  }, [showNoWalletAlert]);

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <WalletContext.Provider
      value={{ currentAccount, connectWallet, isInitialized }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
