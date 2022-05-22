import { MouseEventHandler } from "react";
import { Form } from "react-final-form";
import { Alert, Button, InputField, Typography, CardForm } from "../../atoms";
import { TransferPayload, useTransactor } from "../../../context";

interface Props {
  onGoToTransactionsClick: MouseEventHandler<HTMLButtonElement>;
}

const TransferETHForm = ({ onGoToTransactionsClick }: Props) => {
  const { transfer, isLoading } = useTransactor();

  return (
    <Form<TransferPayload>
      onSubmit={transfer}
      render={({ handleSubmit, submitting, error }) => (
        <CardForm onSubmit={handleSubmit}>
          <Typography.H4 tw="mb-8 text-center">Transfer ETH</Typography.H4>

          {error && (
            <Alert tw="mb-4" variant="danger">
              Something went wrong. Try again later, please.
            </Alert>
          )}

          <InputField
            tw="mb-2"
            name="receiver"
            type="text"
            placeholder="Receiver"
          />
          <InputField
            tw="mb-2"
            name="amount"
            type="text"
            placeholder="Amount (ETH)"
          />
          <InputField
            tw="mb-2"
            name="keyword"
            type="text"
            placeholder="Keyword (GIF)"
          />
          <InputField
            tw="mb-2"
            name="message"
            type="text"
            placeholder="Message"
          />

          <Button tw="mt-2" type="submit" loading={submitting || isLoading}>
            Send
          </Button>
          <Button
            variant="link"
            disabled={submitting || isLoading}
            onClick={onGoToTransactionsClick}
          >
            Go to transactions
          </Button>
        </CardForm>
      )}
    />
  );
};

export default TransferETHForm;
