"use client";

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
  LinkCardDescription,
  LinkCardIcon,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import {
  DS_FRONT_PAGE_QUERYResult,
  N_LATEST_CHANGE_LOGS_QUERYResult,
} from "@/app/_sanity/query-types";
import { GithubIcon } from "@/assets/Icons";
import { TextWithMarkdown } from "@/web/TextWithMarkdown";
import "./ChangeLogNews.css";

type ChangeLog = NonNullable<
  NonNullable<DS_FRONT_PAGE_QUERYResult>["ds_changelog"]
>;

type Props = {
  title: ChangeLog["title"];
  description: ChangeLog["ingress"];
  entries: N_LATEST_CHANGE_LOGS_QUERYResult;
};

const ChangeLogNews = ({ title, description, entries }: Props) => {
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
                {format(parseISO(endringsdato), "do MMMM yyyy", {
                  locale: nb,
                })}
              </LinkCardDescription>
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
};

export default ChangeLogNews;
