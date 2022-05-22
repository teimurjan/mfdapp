import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const DefaultTemplate = ({ children }: Props) => {
  return (
    <div tw="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 px-2">
      {children}
    </div>
  );
};

export default DefaultTemplate;
