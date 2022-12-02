import { BodyShort, Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import { logNav } from "../..";
import { AkselTemaT } from "../../../pages";
import cl from "classnames";

export const TemaCard = ({
  title,
  refCount,
  compact = false,
  urlPrefix = "tema",
  slug,
}: AkselTemaT & { compact?: boolean; urlPrefix?: string }) => {
  return (
    <NextLink href={`/${urlPrefix}/${slug.current}`} passHref>
      <a
        className="focus-visible:shadow-focus group relative rounded-r-md rounded-l bg-white shadow transition-colors ease-in-out focus:outline-none sm:shadow-md"
        onClick={(e) =>
          logNav(
            "temakort",
            window.location.pathname,
            e.currentTarget.getAttribute("href")
          )
        }
      >
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-3 rounded-l bg-orange-200 group-hover:bg-orange-300"
        />
        <div
          className={cl("grid h-full justify-items-start gap-2 px-6 ", {
            "py-6 xl:px-8 xl:pt-10 xl:pb-6": !compact,
            "py-4 lg:px-8 lg:pt-8 lg:pb-6": compact,
          })}
        >
          <Heading
            level="3"
            size="medium"
            className="mb-4 text-2xl xl:text-3xl"
          >
            {title}
          </Heading>
          {refCount && (
            <BodyShort
              size="small"
              className="mt-auto border-t-4 border-orange-200 pt-2 uppercase opacity-80 group-hover:border-orange-300"
            >
              {`${refCount} ${refCount === 1 ? "Artikkel" : "Artikler"}`}
            </BodyShort>
          )}
        </div>
      </a>
    </NextLink>
  );
};
