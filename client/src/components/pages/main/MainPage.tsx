import { useCallback, useMemo, useState } from "react";
import { useTransactor, useWallet } from "../../../context";
import { Button } from "../../atoms";
import { Transactions, TransferETHForm } from "../../organisms";
import { DefaultTemplate } from "../../templates";

const MainPage = () => {
  const [shouldShowTransactions, setShouldShowTransactions] = useState(false);
  const { connectWallet, currentAccount, isInitialized } = useWallet();

  const handleGoToTransactionsClick = useCallback(() => {
    setShouldShowTransactions(true);
  }, []);

  const handleTransferClick = useCallback(() => {
    setShouldShowTransactions(false);
  }, []);

  const children = useMemo(() => {
    if (!currentAccount) {
      return <Button onClick={connectWallet}>Connect Wallet</Button>;
    }
    if (shouldShowTransactions) {
      return <Transactions onTransferClick={handleTransferClick} />;
    }

    return (
      <TransferETHForm onGoToTransactionsClick={handleGoToTransactionsClick} />
    );
  }, [
    currentAccount,
    connectWallet,
    shouldShowTransactions,
    handleGoToTransactionsClick,
    handleTransferClick,
  ]);

  return <DefaultTemplate>{isInitialized && children}</DefaultTemplate>;
};

export default MainPage;
