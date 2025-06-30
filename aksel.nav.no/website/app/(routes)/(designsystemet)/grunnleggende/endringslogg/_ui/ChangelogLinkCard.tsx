import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { Detail, Heading, LinkCard, Tag, VStack } from "@navikt/ds-react";
import {
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { ENDRINGSLOGG_WITH_NEIGHBORS_QUERYResult } from "@/app/_sanity/query-types";
import { capitalize } from "@/utils";

const ChangelogLinkCard = ({
  logEntry,
  label,
}: {
  logEntry: NonNullable<ENDRINGSLOGG_WITH_NEIGHBORS_QUERYResult>["primary"];
  label: string;
}) => (
  <VStack gap="space-12">
    <Heading size="small" level="2">
      {label}
    </Heading>

    <LinkCard arrow={false}>
      <LinkCardTitle as="h3">
        <LinkCardAnchor href={`${logEntry.slug}`}>
          {logEntry.heading}
        </LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardDescription>
        <Detail textColor="subtle">
          {format(new Date(logEntry.endringsdato || ""), "d. MMMM yyy", {
            locale: nb,
          })}
        </Detail>
      </LinkCardDescription>
      <LinkCardFooter>
        <Tag size="xsmall" variant="info-moderate">
          {capitalize(logEntry.endringstype || "")}
        </Tag>
      </LinkCardFooter>
    </LinkCard>
  </VStack>
);

export default ChangelogLinkCard;
