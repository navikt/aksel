import { BodyShort } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import Image from "next/image";
import { logNav } from "@/utils";

export const GodPraksisCard = () => {
  return (
    <li className="ring-border-subtle bg-surface-default hover:shadow-small focus-within:shadow-focus relative grid rounded-lg p-6 ring-1 ring-inset">
      <div className="relative mb-4 h-16 w-16">
        <Image
          src="/images/demo-pictogram.svg"
          decoding="sync"
          layout="fill"
          objectFit="contain"
          aria-hidden
          priority
        />
      </div>
      <NextLink href="#" passHref>
        <a
          onClick={(e) =>
            logNav(
              "card",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
          className="navds-heading--medium text-deepblue-700 navds-heading focus-visible:after:shadow-focus mb-4 no-underline after:absolute after:inset-0 after:rounded focus:outline-none group-hover:underline"
        >
          Universell Utforming
        </a>
      </NextLink>
      <BodyShort className={cl("mb-2 lg:mb-6")}>
        Webanalyse, spørreundersøkelser, innsiktsetikk, brukerinvolvering,
        brukertesting, innsikt og brukertorget
      </BodyShort>
      <BodyShort size="small" className="text-text-subtle">
        20 Artikler
      </BodyShort>
    </li>
  );
};
