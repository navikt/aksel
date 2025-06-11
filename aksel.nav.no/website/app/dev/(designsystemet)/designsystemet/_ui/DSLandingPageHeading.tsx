import { BodyLong, BoxNew, Heading, VStack } from "@navikt/ds-react";
import PromoTag from "./promo-tag/PromoTag";

type Props = {
  title: string;
  introText: string;
};

const DSLandingPageHeading = ({ title, introText }: Props) => (
  <BoxNew maxWidth="text">
    <VStack gap="space-16" maxWidth="600px" align="center">
      <VStack gap="space-8" align="center">
        <PromoTag />
        <Heading level="1" size="xlarge" className="aksel__page-title">
          {title}
        </Heading>
      </VStack>
      <BodyLong size="large" as="p" align="center">
        {introText}
      </BodyLong>
    </VStack>
  </BoxNew>
);

export default DSLandingPageHeading;
