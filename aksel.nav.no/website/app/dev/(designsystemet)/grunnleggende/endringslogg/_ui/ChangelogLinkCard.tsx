import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { PortableTextBlock } from "next-sanity";
import { version } from "react";
import { BodyShort, BoxNew, Heading, Tag, VStack } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardTitle,
} from "@/app/dev/(god-praksis)/_ui/link-card/LinkCard";
import type { ENDRINGSLOGG_WITH_NEIGHBORS_QUERYResult } from "../[slug]/page";
import styles from "../_ui/Changelog.module.css";
import { bumpHeadingLevels } from "./utils";

const inertValue = parseInt(version.split(".")[0]) > 18; // Support for inert was added in React 19

const ChangelogLinkCard = ({
  logEntry,
  label,
}: {
  logEntry: ENDRINGSLOGG_WITH_NEIGHBORS_QUERYResult["primary"];
  label: string;
}) => (
  <VStack gap="space-16">
    <Heading size="small" level="2">
      {label}
    </Heading>
    <LinkCard hasArrow={true}>
      <VStack style={{ height: "14rem" }} align="start">
        <LinkCardTitle as="h2" size="large">
          <LinkCardAnchor href={`${logEntry.slug}`}>
            {logEntry.heading}
          </LinkCardAnchor>
        </LinkCardTitle>
        <CustomPortableText
          className={`${styles.portableTextFirstHeading} ${styles.portableTextInCard}`}
          inert={inertValue}
          value={bumpHeadingLevels(logEntry.innhold) as PortableTextBlock[]}
        />
        <BoxNew>
          <BodyShort size="small" spacing>
            {format(new Date(logEntry.endringsdato || ""), "d. MMMM yyy", {
              locale: nb,
            })}
          </BodyShort>
        </BoxNew>
        <BoxNew>
          <Tag
            size="xsmall"
            variant="info-moderate"
            className={styles.capitalized}
          >
            {logEntry.endringstype}
          </Tag>
        </BoxNew>
      </VStack>
    </LinkCard>
  </VStack>
);
export default ChangelogLinkCard;
