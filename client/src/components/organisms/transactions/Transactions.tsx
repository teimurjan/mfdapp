import { Fragment, MouseEventHandler } from "react";
import { useTransactor } from "../../../context";
import { Button } from "../../atoms";
import TransactionCard from "../transaction-card";

interface Props {
  onTransferClick: MouseEventHandler<HTMLButtonElement>;
}

const Transactions = ({ onTransferClick }: Props) => {
  const { transactions } = useTransactor();

  return (
    <Fragment>
      <div tw="flex flex-row">
        {transactions.map((transaction) => (
          <TransactionCard
            key={
              transaction.addressFrom +
              transaction.addressTo +
              transaction.timestamp
            }
            tw="mr-2"
            transaction={transaction}
          />
        ))}
      </div>

      <Button tw="mt-4" onClick={onTransferClick}>
        Transfer ETH
      </Button>
    </Fragment>
  );
};

export default Transactions;
