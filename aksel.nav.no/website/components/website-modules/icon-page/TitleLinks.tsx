import { AmplitudeEvents, logAmplitudeEvent } from "@/utils";
import { BrailleIcon, DownloadIcon, PackageIcon } from "@navikt/aksel-icons";
import { Link as DsLink } from "@navikt/ds-react";

import { FigmaIcon, GithubIcon } from "components/assets";
import NextLink from "next/link";

const Divider = () => (
  <div
    aria-hidden
    className="bg-border-divider hidden h-2/3 w-[1px] rounded-md md:block"
  />
);

export const TitleLinks = () => (
  <ul className="text-medium item-start mt-12 flex flex-col gap-4 md:flex-row md:items-center">
    <li className="flex items-center gap-2 leading-none">
      <NextLink
        href="https://www.figma.com/community/file/1167474127194981809"
        passHref
        legacyBehavior
      >
        <DsLink className="text-text-default no-underline hover:underline">
          <FigmaIcon className="ml-1" /> <span className="">Figma</span>
        </DsLink>
      </NextLink>
    </li>
    <Divider />
    <li className="flex items-center gap-1 leading-none">
      <DsLink
        className="text-text-default no-underline hover:underline"
        href="https://cdn.nav.no/aksel/icons/zip/aksel-icons.zip"
        download="Ikonpakke"
        onClick={() => {
          logAmplitudeEvent(AmplitudeEvents.ikonnedlastning, {
            icon: "Ikonpakke",
            format: "zip",
          });
        }}
        target="_blank"
        rel="noreferrer noopener"
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
        <DsLink className="text-text-default no-underline hover:underline">
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
        <DsLink className="text-text-default no-underline hover:underline">
          <GithubIcon className="ml-[3px] h-[18px] w-[18px]" />{" "}
          <span className="ml-1">Bidra</span>
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
        <DsLink className="text-text-default no-underline hover:underline">
          <BrailleIcon aria-hidden className="text-2xl" />{" "}
          <span>Tilgjengelighet</span>
        </DsLink>
      </NextLink>
    </li>
  </ul>
);
