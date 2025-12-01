"use client";

import { ClockDashedIcon } from "@navikt/aksel-icons";
import { HStack, Link } from "@navikt/ds-react";
import { KOMPONENT_BY_SLUG_QUERYResult } from "@/app/_sanity/query-types";
import { FigmaIcon, GithubIcon } from "@/assets/Icons";

const GITHUB_CONFIG = {
  "ds-react": {
    title: "@navikt/ds-react",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/react",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/react/CHANGELOG.md",
  },
  "ds-css": {
    title: "@navikt/ds-css",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/css",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/css/CHANGELOG.md",
  },
  "ds-tokens": {
    title: "@navikt/ds-tokens",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/tokens",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/tokens/CHANGELOG.md",
  },
  "ds-tailwind": {
    title: "@navikt/ds-tailwind",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/tailwind",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/tailwind/CHANGELOG.md",
  },
} as const;

function KomponentLinks({ data }: { data: KOMPONENT_BY_SLUG_QUERYResult }) {
  const pack = data?.kodepakker?.[0];
  const gitConfig = pack ? (GITHUB_CONFIG[pack] ?? null) : null;

  if (!(gitConfig || data?.figma_link)) {
    return null;
  }

  return (
    <HStack gap="space-16" align="center" marginBlock="space-16 0">
      {gitConfig && (
        <Link
          target="_blank"
          rel="noreferrer noopener"
          href={gitConfig.git}
          data-color="neutral"
        >
          <GithubIcon /> Github
        </Link>
      )}
      {data?.figma_link && (
        <Link
          target="_blank"
          rel="noreferrer noopener"
          href={data.figma_link}
          data-color="neutral"
        >
          <FigmaIcon /> Figma
        </Link>
      )}
      <Link href="/grunnleggende/endringslogg" data-color="neutral">
        <ClockDashedIcon fontSize="1.5rem" aria-hidden />
        Endringslogg
      </Link>
    </HStack>
  );
}

export { KomponentLinks };
