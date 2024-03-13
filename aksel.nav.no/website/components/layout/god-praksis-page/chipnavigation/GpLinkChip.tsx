import cl from "clsx";
import NextLink from "next/link";
import {
  ChevronRightIcon,
  FileFillIcon,
  TagFillIcon,
} from "@navikt/aksel-icons";

type GpLinkChipProps = {
  type: "innholdstype" | "tema";
  children?: React.ReactNode;
  href: string;
};

export function GpLinkChip({ children, type, href }: GpLinkChipProps) {
  return (
    <NextLink
      href={href}
      className={cl(
        "group flex min-h-8 w-fit items-center whitespace-nowrap rounded-full px-2 py-1 ring-1 ring-inset hover:underline focus:outline-none focus-visible:shadow-focus-gap",
        {
          "bg-teal-100 text-teal-700 ring-teal-700": type === "tema",
          "bg-violet-100 text-violet-600 ring-violet-600":
            type === "innholdstype",
        },
      )}
    >
      {type === "tema" ? (
        <TagFillIcon className="text-teal-700" aria-hidden />
      ) : (
        <FileFillIcon className="text-violet-600" aria-hidden />
      )}
      <span className="ml-05 leading-none text-text-default">{children}</span>
      <ChevronRightIcon
        fontSize="1.5rem"
        aria-hidden
        className="transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
      />
    </NextLink>
  );
}
