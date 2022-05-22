import tw, { styled } from "twin.macro";

interface Props {
  variant?: "danger";
}

const Alert = styled.div(({ variant }: Props) => [
  tw`p-5`,
  !variant && tw`bg-white`,
  variant === "danger" && tw`bg-red-200`,
]);

export default Alert;
