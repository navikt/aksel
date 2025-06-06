import { format, parseISO } from "date-fns";
import { nb } from "date-fns/locale";
import {
  Bleed,
  BodyLong,
  HStack,
  Heading,
  Link,
  VStack,
} from "@navikt/ds-react";
import { N_LATEST_CHANGE_LOGS_QUERYResult } from "@/app/_sanity/query-types";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardIcon,
  LinkCardTitle,
} from "@/app/dev/(god-praksis)/_ui/link-card/LinkCard";
import { GithubIcon } from "@/assets/Icons";

type Props = {
  entries: N_LATEST_CHANGE_LOGS_QUERYResult;
};

const ChangeLogNews = ({ entries }: Props) => (
  <Bleed marginInline="full">
    <VStack gap="space-32" as="section">
      <VStack gap="space-8" align="center">
        <Heading level="2" size="large">
          Endringslogg
        </Heading>
        <BodyLong size="large" as="p">
          Siste endringer i kode.{" "}
          <Link href="/dev/designsystemet/endringslogg">Se alle endringer</Link>
          .
        </BodyLong>
      </VStack>
      <HStack gap="space-24">
        {entries.map(({ heading, slug, endringsdato }) => (
          <LinkCard key={heading} hasArrow={false}>
            <LinkCardTitle as="span">
              <LinkCardAnchor
                href={`/dev/grunnleggende/kode/endringslogg/${slug?.current}`}
              >
                {heading}
              </LinkCardAnchor>
            </LinkCardTitle>
            {endringsdato && (
              <LinkCardDescription>
                {format(parseISO(endringsdato), "do MMMM yyyy", { locale: nb })}
              </LinkCardDescription>
            )}
            <LinkCardIcon>
              <GithubIcon width="32" height="32" aria-hidden="true" />
            </LinkCardIcon>
          </LinkCard>
        ))}
      </HStack>
    </VStack>
  </Bleed>
);

export default ChangeLogNews;
