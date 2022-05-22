import { ButtonHTMLAttributes } from "react";
import tw, { styled } from "twin.macro";
import Loader from "../loader";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "link";
  loading?: boolean;
}

const StyledButton = styled.button(({ variant }: Pick<Props, "variant">) => [
  tw`flex items-center justify-center py-2 px-4 rounded border-white border-2 text-white transition-colors`,
  !variant &&
    tw`hover:bg-white hover:text-indigo-500 disabled:bg-white disabled:text-indigo-500`,
  variant === "link" && tw`underline border-0`,
]);

const Button = ({ variant, children, loading, ...rest }: Props) => (
  <StyledButton variant={variant} {...rest}>
    {children}
    <Loader tw="-mr-6 ml-2" style={{ opacity: loading ? 1 : 0 }} />
  </StyledButton>
);

export default Button;
