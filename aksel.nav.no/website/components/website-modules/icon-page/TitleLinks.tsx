import NextLink from "next/link";
import { BrailleIcon, DownloadIcon, PackageIcon } from "@navikt/aksel-icons";
import { Link as DsLink } from "@navikt/ds-react";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { FigmaIcon, GithubIcon } from "@/assets/Icons";

const Divider = () => (
  <div
    aria-hidden
    className="hidden h-2/3 w-[1px] rounded-md bg-border-divider md:block"
  />
);

export const TitleLinks = () => (
  <ul className="item-start mt-12 flex flex-col gap-4 text-medium md:flex-row md:items-center">
    <li className="flex items-center gap-2 leading-none">
      <NextLink
        href="https://www.figma.com/community/file/1214869602572392330"
        passHref
        legacyBehavior
      >
        <DsLink
          className="text-text-default no-underline hover:underline focus-visible:text-text-on-inverted"
          onClick={() =>
            umamiTrack("navigere", {
              kilde: "ikonside",
              url: "https://www.figma.com/community/file/1214869602572392330",
            })
          }
        >
          <FigmaIcon className="ml-1" /> <span className="">Figma</span>
        </DsLink>
      </NextLink>
    </li>
    <Divider />
    <li className="flex items-center gap-1 leading-none">
      <DsLink
        className="text-text-default no-underline hover:underline focus-visible:text-text-on-inverted"
        href="https://cdn.nav.no/aksel/icons/zip/aksel-icons.zip"
        download="Ikonpakke"
        onClick={() =>
          umamiTrack("last ned", {
            tema: "ikon",
            type: "zip",
            tittel: "ikonpakke",
          })
        }
      >
        <DownloadIcon className="text-2xl" aria-hidden /> Last ned ikonpakke
      </DsLink>
    </li>
    <Divider />
    <li className="flex items-center gap-2 leading-none">
      <NextLink
        href="https://www.npmjs.com/package/@navikt/aksel-icons"
        passHref
        legacyBehavior
      >
        <DsLink
          className="text-text-default no-underline hover:underline focus-visible:text-text-on-inverted"
          onClick={() =>
            umamiTrack("navigere", {
              kilde: "ikonside",
              url: "https://www.npmjs.com/package/@navikt/aksel-icons",
            })
          }
        >
          <PackageIcon className="text-2xl" aria-hidden /> Installer med NPM
        </DsLink>
      </NextLink>
    </li>
    <Divider />
    <li className="flex items-center gap-2 leading-none">
      <NextLink
        href="https://github.com/navikt/aksel/tree/main/%40navikt/aksel-icons/CONTRIBUTING.md"
        passHref
        legacyBehavior
      >
        <DsLink
          className="text-text-default no-underline hover:underline focus-visible:text-text-on-inverted"
          onClick={() =>
            umamiTrack("navigere", {
              kilde: "ikonside",
              url: "https://github.com/navikt/aksel/tree/main/%40navikt/aksel-icons/CONTRIBUTING.md",
            })
          }
        >
          <GithubIcon className="ml-[3px] h-[18px] w-[18px]" />{" "}
          <span className="ml-1">Bidra</span>
        </DsLink>
      </NextLink>
    </li>
    <Divider />
    <li className="flex items-center gap-2 leading-none">
      <NextLink
        href="/god-praksis/artikler/tilgjengelig-ikonbruk"
        passHref
        legacyBehavior
      >
        <DsLink
          className="text-text-default no-underline hover:underline focus-visible:text-text-on-inverted"
          onClick={() =>
            umamiTrack("navigere", {
              kilde: "ikonside",
              url: "/god-praksis/artikler/tilgjengelig-ikonbruk",
            })
          }
        >
          <BrailleIcon aria-hidden className="text-2xl" />{" "}
          <span>Tilgjengelighet</span>
        </DsLink>
      </NextLink>
    </li>
  </ul>
);
