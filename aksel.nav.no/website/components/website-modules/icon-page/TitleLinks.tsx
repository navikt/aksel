import { Link as DsLink } from "@navikt/ds-react";
import { DownloadIcon, PackageIcon } from "@sanity/icons";
import { FigmaIcon, GithubIcon } from "components/assets";
import NextLink from "next/link";

export const TitleLinks = () => (
  <ul className="flex w-full flex-wrap items-center justify-between gap-3 px-8 pt-6 pb-2">
    <li className="flex items-center gap-2">
      <NextLink
        href="https://www.figma.com/community/file/1167474127194981809"
        passHref
      >
        <DsLink className="text-text-default no-underline hover:underline">
          <FigmaIcon /> <span className="ml-1">Figma community</span>
        </DsLink>
      </NextLink>
    </li>
    <li className="flex items-center gap-2">
      <DownloadIcon className="text-2xl" /> Last ned SVG-pakke
    </li>
    <li className="flex items-center gap-2">
      <NextLink href="https://www.npmjs.com/package/@navikt/ds-icons" passHref>
        <DsLink className="text-text-default no-underline hover:underline">
          <PackageIcon className="text-2xl" /> Installer med NPM
        </DsLink>
      </NextLink>
    </li>
    <li className="flex items-center gap-2">
      <NextLink
        href="https://github.com/navikt/Designsystemet/tree/master/%40navikt/icons"
        passHref
      >
        <DsLink className="text-text-default no-underline hover:underline">
          <GithubIcon /> <span className="ml-1">Bidra</span>
        </DsLink>
      </NextLink>
    </li>
  </ul>
);
