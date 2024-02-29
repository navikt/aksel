import cl from "clsx";
import Link from "next/link";
import React from "react";
import ErrorBoundary from "@/error-boundary";
import { amplitudeLogNavigation } from "@/logging";

type AkselLinkProps = {
  href: string;
  children: React.ReactNode;
  inverted?: boolean;
  className?: string;
};

const AkselLink = ({
  href,
  children,
  inverted = false,
  className,
}: AkselLinkProps) => {
  return (
    <Link
      href={href}
      passHref
      className={cl("group relative w-fit pr-5 focus:outline-none", className, {
        "white focus-visible:bg-blue-200 focus-visible:text-text-default focus-visible:shadow-[0_0_0_3px_var(--a-blue-200)]":
          inverted,
        "text-deepblue-500 focus-visible:bg-blue-800 focus-visible:text-text-on-action focus-visible:shadow-[0_0_0_3px_var(--a-blue-800)] group-hover:text-deepblue-800":
          !inverted,
      })}
      onClick={(e) =>
        amplitudeLogNavigation("link", e.currentTarget.getAttribute("href"))
      }
    >
      {children}
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cl(
          "ml-2 h-[20px] w-[10px] scale-[0.85] transition-[width,right] group-hover:w-[16px]",
          "absolute right-[5px] top-1/2 -translate-y-1/2 rotate-180 group-hover:right-0",
        )}
        aria-hidden
      >
        <path
          d="M8 17.5L2.12132 11.6213C0.949744 10.4497 0.949746 8.55025 2.12132 7.37868L8 1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M16 9.72266L8 9.72266"
          strokeWidth="1.5"
          stroke="currentColor"
          className="hidden group-hover:block"
        />
      </svg>
    </Link>
  );
};

export default function Component(props: AkselLinkProps) {
  return (
    <ErrorBoundary boundaryName="AkselLink">
      <AkselLink {...props} />
    </ErrorBoundary>
  );
}
