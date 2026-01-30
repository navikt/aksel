import { BodyLong, Box, Heading, VStack } from "@navikt/ds-react";
import { DS_FRONT_PAGE_QUERY_RESULT } from "@/app/_sanity/query-types";
import PromoTag from "@/app/_ui/promo-tag/PromoTag";
import styles from "./DSLandingPageHeading.module.css";

type Props = {
  title: NonNullable<DS_FRONT_PAGE_QUERY_RESULT>["ds_forside_title"];
  introText: NonNullable<DS_FRONT_PAGE_QUERY_RESULT>["ds_forside_ingress"];
};

const DSLandingPageHeading = ({ title, introText }: Props) => (
  <Box maxWidth="text">
    <VStack gap="space-16" maxWidth="600px" align="center">
      <VStack gap="space-16" align="center">
        <PromoTag />
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
  </Box>
);

export default DSLandingPageHeading;
