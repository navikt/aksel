import { BodyLong, Heading, VStack } from "@navikt/ds-react";
import NewsTag from "./NewsTag";

type Props = {
  title: string;
  introText: string;
};

const DSLandingPageHeading = ({ title, introText }: Props) => (
  <VStack gap="space-16" maxWidth="600px" align="center">
    <VStack gap="space-8">
      <NewsTag />
      <Heading level="1" size="xlarge">
        {title}
      </Heading>
    </VStack>
    <BodyLong size="large" as="p" align="center">
      {introText}
    </BodyLong>
  </VStack>
);

export default DSLandingPageHeading;
