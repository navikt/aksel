import { format, parseISO } from "date-fns";
import { nb } from "date-fns/locale";
import NextLink from "next/link";
import {
  Bleed,
  BodyLong,
  HGrid,
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
          <Link as={NextLink} href="/dev/designsystemet/endringslogg">
            Se alle endringer
          </Link>
          .
        </BodyLong>
      </VStack>
      <HGrid gap="space-24" width="1024px" maxWidth="100%" columns={3}>
        {entries.map(({ heading, slug, endringsdato }) => (
          <LinkCard key={heading}>
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
      </HGrid>
    </VStack>
  </Bleed>
);

export default ChangeLogNews;
