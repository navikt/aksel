import { BodyLong, BoxNew, Heading, VStack } from "@navikt/ds-react";
import { DS_FRONT_PAGE_QUERYResult } from "@/app/_sanity/query-types";
import PromoTag from "../promo-tag/PromoTag";
import styles from "./DSLandingPageHeading.module.css";

type PromoTagType = NonNullable<
  NonNullable<DS_FRONT_PAGE_QUERYResult>["ds_forside_promo_tag"]
>;

type Props = {
  title: NonNullable<DS_FRONT_PAGE_QUERYResult>["ds_forside_title"];
  introText: NonNullable<DS_FRONT_PAGE_QUERYResult>["ds_forside_ingress"];
  promoTag: {
    label: PromoTagType["label"];
    text: PromoTagType["text"];
    link: PromoTagType["link"];
  } | null;
};

const DSLandingPageHeading = ({ title, introText, promoTag }: Props) => (
  <BoxNew maxWidth="text">
    <VStack gap="space-16" maxWidth="600px" align="center">
      <VStack gap="space-16" align="center">
        {promoTag && (
          <PromoTag
            label={promoTag.label}
            text={promoTag.text}
            link={promoTag.link}
          />
        )}
        {title && (
          <Heading level="1" size="xlarge" className={styles.AkselPageTitle}>
            {title}
          </Heading>
        )}
      </VStack>
      {introText && (
        <BodyLong size="large" as="p" align="center">
          {introText}
        </BodyLong>
      )}
    </VStack>
  </BoxNew>
);

export default DSLandingPageHeading;
