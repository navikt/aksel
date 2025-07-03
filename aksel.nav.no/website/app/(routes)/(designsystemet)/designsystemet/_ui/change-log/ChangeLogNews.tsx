import { FileTextIcon, SparklesIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  BoxNew,
  HGrid,
  Heading,
  LinkCard,
  VStack,
} from "@navikt/ds-react";
import {
  LinkCardAnchor,
  LinkCardIcon,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { sanityFetch } from "@/app/_sanity/live";
import { N_LATEST_CHANGE_LOGS_QUERY } from "@/app/_sanity/queries";
import { N_LATEST_CHANGE_LOGS_QUERYResult } from "@/app/_sanity/query-types";
import { MarkdownText } from "@/app/_ui/typography/MarkdownText";
import { FigmaIcon, GithubIcon } from "@/assets/Icons";

type ChangeLogNewsProps = {
  title: string;
  description?: string | null;
};

async function ChangeLogNews({ title, description }: ChangeLogNewsProps) {
  const { data: changeLogEntries } = await sanityFetch({
    query: N_LATEST_CHANGE_LOGS_QUERY,
    params: { count: 3 },
  });

  if (changeLogEntries.length === 0) {
    return null;
  }

  return (
    <VStack gap="space-32" as="section" width="100%">
      <VStack gap="space-8" align="center">
        {title && (
          <Heading level="2" size="large">
            {title}
          </Heading>
        )}
        {description && (
          <BodyLong size="large" as="p">
            <MarkdownText>{description}</MarkdownText>
          </BodyLong>
        )}
      </VStack>
      <HGrid gap="space-24" columns={{ xs: 1, md: 2 }}>
        {changeLogEntries.map(({ heading, slug, endringstype }) => (
          <LinkCard key={heading}>
            <ChangelogIcon endringstype={endringstype} />
            <LinkCardTitle as="span">
              <LinkCardAnchor
                href={`/grunnleggende/endringslogg/${slug?.current}`}
              >
                {heading}
              </LinkCardAnchor>
            </LinkCardTitle>
          </LinkCard>
        ))}
        <BoxNew asChild borderColor="neutral">
          <LinkCard>
            <BoxNew
              asChild
              padding="space-16"
              borderRadius="12"
              background="neutral-strong"
            >
              <LinkCardIcon>
                <SparklesIcon
                  color="var(--ax-text-contrast)"
                  width="2.25rem"
                  height="2.25rem"
                  aria-hidden="true"
                />
              </LinkCardIcon>
            </BoxNew>
            <LinkCardTitle as="span">
              <LinkCardAnchor href="/grunnleggende/endringslogg">
                Alle endringer
              </LinkCardAnchor>
            </LinkCardTitle>
          </LinkCard>
        </BoxNew>
      </HGrid>
    </VStack>
  );
}

function ChangelogIcon({
  endringstype,
}: {
  endringstype:
    | N_LATEST_CHANGE_LOGS_QUERYResult[number]["endringstype"]
    | "sparkles";
}) {
  if (!endringstype) {
    return null;
  }

  let Icon: typeof GithubIcon | typeof FigmaIcon | typeof FileTextIcon =
    FileTextIcon;

  switch (endringstype) {
    case "design":
      Icon = FigmaIcon;
      break;
    case "dokumentasjon":
      Icon = FileTextIcon;
      break;
    case "kode":
      Icon = GithubIcon;
      break;
    case "sparkles":
      Icon = SparklesIcon;
      break;
  }

  return (
    <BoxNew
      asChild
      padding="space-16"
      borderRadius="12"
      background="neutral-moderateA"
    >
      <LinkCardIcon>
        <Icon
          color="var(--ax-text-subtle)"
          width="2.25rem"
          height="2.25rem"
          aria-hidden="true"
        />
      </LinkCardIcon>
    </BoxNew>
  );
}

export { ChangeLogNews };
