import { HStack, Heading, Link, VStack } from "@navikt/ds-react";
import { KOMPONENT_BY_SLUG_QUERYResult } from "@/app/_sanity/query-types";
import { List, ListItem } from "@/app/_ui/typography/List";
import { MarkdownText } from "@/app/_ui/typography/MarkdownText";
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
  const gitConfig = pack ? GITHUB_CONFIG[pack] ?? null : null;

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
          data-umami-event="navigere"
          data-umami-event-url={gitConfig.git}
          variant="subtle"
        >
          <GithubIcon /> Github
        </Link>
      )}
      {data?.figma_link && (
        <Link
          target="_blank"
          rel="noreferrer noopener"
          href={data.figma_link}
          data-umami-event="navigere"
          data-umami-event-url={data.figma_link}
          variant="subtle"
        >
          <FigmaIcon /> Figma
        </Link>
      )}
    </HStack>
  );
}

function KomponentIntro({ data }: { data: KOMPONENT_BY_SLUG_QUERYResult }) {
  const useFor = data?.intro?.brukes_til;
  const avoidUseFor = data?.intro?.brukes_ikke_til;

  if (!useFor && !avoidUseFor) {
    return null;
  }

  const internal = data?.status?.internal;

  return (
    <VStack gap="space-8" marginBlock="space-28">
      {useFor && (
        <div>
          <Heading size="small" level="3">
            Egnet til:
          </Heading>

          <List as="ul">
            {internal && <ListItem icon>Bruk på interne flater</ListItem>}
            {data?.intro?.brukes_til?.map((x) => (
              <ListItem icon key={x}>
                <MarkdownText>{x}</MarkdownText>
              </ListItem>
            ))}
          </List>
        </div>
      )}
      {avoidUseFor && (
        <div>
          <Heading size="small" level="3">
            Uegnet til:
          </Heading>
          <List as="ul">
            {avoidUseFor.map((x) => (
              <ListItem icon key={x}>
                <MarkdownText>{x}</MarkdownText>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </VStack>
  );
}

export { KomponentIntro, KomponentLinks };
