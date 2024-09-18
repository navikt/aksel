import { ReactNode } from "@tanstack/react-router";

export const Page = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col lg:w-[81ch] w-full m-auto">{children}</div>
  );
};
