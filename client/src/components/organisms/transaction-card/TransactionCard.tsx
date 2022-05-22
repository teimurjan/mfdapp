import { Transaction } from "../../../context";
import { useGiphy } from "../../../hooks";
import { shortenAddress } from "../../../utils";
import { Card, Tooltip, Typography } from "../../atoms";

interface Props {
  transaction: Transaction;
  className?: string;
}

const TransactionCard = ({
  className,
  transaction: { addressTo, addressFrom, amount, message, timestamp, keyword },
}: Props) => {
  const gifUrl = useGiphy(keyword);

  return (
    <Card className={className}>
      <Typography.H6 tw="text-center mb-4" variant="secondary">
        ⏰ {timestamp}
      </Typography.H6>

      <Tooltip placement="top" content={addressFrom}>
        <div>
          <Typography.BASE variant="secondary">From: </Typography.BASE>
          <Typography.BASE>{shortenAddress(addressFrom)}</Typography.BASE>
        </div>
      </Tooltip>

      <Tooltip placement="top" content={addressTo}>
        <div>
          <Typography.BASE variant="secondary">To: </Typography.BASE>
          <Typography.BASE>{shortenAddress(addressTo)}</Typography.BASE>
        </div>
      </Tooltip>

      <div>
        <Typography.BASE variant="secondary">Amount: </Typography.BASE>
        <Typography.BASE>{amount}</Typography.BASE>
      </div>

      <div>
        <Typography.BASE variant="secondary">Message: </Typography.BASE>
        <Typography.BASE>{message}</Typography.BASE>
      </div>

      <img tw="mt-8" src={gifUrl} alt={keyword} />
    </Card>
  );
};

export default TransactionCard;
