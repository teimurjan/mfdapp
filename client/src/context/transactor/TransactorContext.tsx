import { ethers } from "ethers";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getContractInfo, noop } from "../../utils";
import { useWallet } from "../wallet";

const { ethereum } = window;

const getEthereumContract = async () => {
  if (!ethereum) {
    throw new Error("Ethereum is not available on the page.");
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contractInfo = await getContractInfo();

  return new ethers.Contract(contractInfo.address, contractInfo.abi, signer);
};

export interface Transaction {
  addressTo: string;
  addressFrom: string;
  timestamp: string;
  message: string;
  keyword: string;
  amount: number;
}

const formatTransaction = (transaction: any): Transaction => ({
  addressTo: transaction.receiver,
  addressFrom: transaction.sender,
  timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
  message: transaction.message,
  keyword: transaction.keyword,
  amount: parseInt(transaction.amount._hex) / 10 ** 18,
});

export interface TransferPayload {
  receiver: string;
  amount: string;
  keyword: string;
  message: string;
}

interface TransactorContextValue {
  transfer: (payload: TransferPayload) => Promise<void>;
  transactions: Transaction[];
  isLoading: boolean;
}

const TransactorContext = createContext<TransactorContextValue>({
  transfer: noop.async,
  transactions: [],
  isLoading: false,
});

interface TransactorProviderProps {
  children: ReactNode;
}

export const TransactorProvider = ({ children }: TransactorProviderProps) => {
  const { currentAccount, isInitialized } = useWallet();
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const ethereumMethodCall = useCallback(
    async (fn: () => Promise<void>) => {
      if (!isInitialized) return;

      if (currentAccount) {
        try {
          setIsLoading(true);
          await fn();
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      } else {
        throw new Error("MetaMask account is not linked.");
      }
    },
    [currentAccount, isInitialized]
  );

  const transfer = useCallback(
    async (payload: TransferPayload) => {
      await ethereumMethodCall(async () => {
        const contract = await getEthereumContract();
        const hexAmount = ethers.utils.parseEther(payload.amount).toHexString();

        await ethereum?.request?.({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: payload.receiver,
              gas: "0x5208", // 21000 GWEI,
              value: hexAmount,
            },
          ],
        });

        const hash = await contract.addToBlockchain(
          payload.receiver,
          hexAmount,
          payload.message,
          payload.keyword
        );
        await hash.wait();

        const nextTransactionCount = await contract.getTransactionCount();
        setTransactionCount(nextTransactionCount.toNumber());
      });
    },
    [currentAccount, ethereumMethodCall]
  );

  const getAllTransactions = useCallback(async () => {
    await ethereumMethodCall(async () => {
      const contract = await getEthereumContract();
      const allTransactions = await contract.getAllTransactions();
      setTransactions(allTransactions.map(formatTransaction));
    });
  }, [ethereumMethodCall]);

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  console.log(transactions);

  return (
    <TransactorContext.Provider value={{ transfer, transactions, isLoading }}>
      {children}
    </TransactorContext.Provider>
  );
};

export const useTransactor = () => useContext(TransactorContext);
