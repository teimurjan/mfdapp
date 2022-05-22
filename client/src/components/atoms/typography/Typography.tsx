import tw, { styled } from "twin.macro";

interface Props {
  variant?: "secondary";
}

const getCommonStyles = ({ variant }: Props) => [
  !variant && tw`text-white`,
  variant === "secondary" && tw`text-pink-200`,
];

const Typography = {
  H1: styled.h1((props: Props) => [...getCommonStyles(props), tw`text-6xl`]),
  H2: styled.h2((props: Props) => [...getCommonStyles(props), tw`text-5xl`]),
  H3: styled.h3((props: Props) => [...getCommonStyles(props), tw`text-4xl`]),
  H4: styled.h4((props: Props) => [...getCommonStyles(props), tw`text-3xl`]),
  H5: styled.h5((props: Props) => [...getCommonStyles(props), tw`text-2xl`]),
  H6: styled.h6((props: Props) => [...getCommonStyles(props), tw`text-xl`]),
  SMALL: styled.small((props: Props) => [
    ...getCommonStyles(props),
    tw`text-sm`,
  ]),
  BASE: styled.span((props: Props) => [
    ...getCommonStyles(props),
    tw`text-base`,
  ]),
};

export default Typography;
