import { ReactNode } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";

export const PlainText = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <p className={twMerge("text-xl", className, `mb-9`)}>{children}</p>;
};
