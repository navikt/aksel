import NextLink from "next/link";
import { ChevronRightIcon, TagFillIcon } from "@navikt/aksel-icons";

type GpTemaLinkProps = {
  children?: React.ReactNode;
  href: string;
};

export function GpTemaLink({ children, href, ...rest }: GpTemaLinkProps) {
  return (
    <NextLink
      href={href}
      className="group flex min-h-8 w-fit items-center whitespace-nowrap rounded-full bg-teal-100 px-2 py-1 ring-1 ring-inset ring-teal-700 hover:underline focus:outline-none focus-visible:shadow-focus-gap"
      {...rest}
    >
      <TagFillIcon className="text-teal-700" aria-hidden />
      <span className="ml-05 leading-none text-text-default">{children}</span>
      <ChevronRightIcon
        fontSize="1.5rem"
        aria-hidden
        className="text-teal-700 transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
      />
    </NextLink>
  );
}
