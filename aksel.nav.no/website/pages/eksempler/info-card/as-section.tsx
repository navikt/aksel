import { InformationSquareIcon } from "@navikt/aksel-icons";
import { InfoCard, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <InfoCard
        data-color="info"
        as="section"
        aria-label="Informasjon om noe fremhevet"
      >
        <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
          <InfoCard.Title>Fremhevet statisk informasjon</InfoCard.Title>
        </InfoCard.Header>
        <InfoCard.Content>
          InfoCard brukes for å fremheve informasjon på en side, uten at det er
          like kritisk som en alert.
        </InfoCard.Content>
      </InfoCard>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: "Bruk `as='section'` + aria-label/aria-labelledby for å gjøre InfoCard til en semantisk seksjon på siden. Dette 'rammer inn' InfoCard for skjermlesere og gjør det lettere å forstå hvor den starter og slutter.",
};
