import { format, parseISO } from "date-fns";
import { nb } from "date-fns/locale";
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
  LinkCardFooter,
  LinkCardIcon,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { sanityFetch } from "@/app/_sanity/live";
import { N_LATEST_CHANGE_LOGS_QUERY } from "@/app/_sanity/queries";
import { GithubIcon } from "@/assets/Icons";
import { TextWithMarkdown } from "@/web/TextWithMarkdown";
import "./ChangeLogNews.css";

type ChangeLogNewsProps = {
  title: string;
  description?: string;
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
            <TextWithMarkdown>{description}</TextWithMarkdown>
          </BodyLong>
        )}
      </VStack>
      <HGrid gap="space-24" columns={{ xs: 1, md: 2, xl: 3 }}>
        {changeLogEntries.map(({ heading, slug, endringsdato }) => (
          <LinkCard key={heading}>
            <LinkCardTitle as="span">
              <LinkCardAnchor
                href={`/dev/grunnleggende/kode/endringslogg/${slug?.current}`}
              >
                {heading}
              </LinkCardAnchor>
            </LinkCardTitle>
            {endringsdato && (
              <LinkCardFooter>
                {format(parseISO(endringsdato), "do MMMM yyyy", {
                  locale: nb,
                })}
              </LinkCardFooter>
            )}
            <BoxNew
              asChild
              padding="space-16"
              borderRadius="12"
              background="neutral-moderateA"
            >
              <LinkCardIcon className="aksel__changelog__icon">
                <GithubIcon width="36" height="36" aria-hidden="true" />
              </LinkCardIcon>
            </BoxNew>
          </LinkCard>
        ))}
      </HGrid>
    </VStack>
  );
}

export { ChangeLogNews };
