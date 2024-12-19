import {
  Alert,
  BodyLong,
  Button,
  HStack,
  Heading,
  VStack,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="8">
      <Alert variant="warning">
        <Heading spacing size="small" level="3">
          Informasjon om ansvaret ditt
        </Heading>
        <BodyLong spacing>
          Det er viktig at du gjennomfører denne aktiviteten med Nav.
        </BodyLong>
        <BodyLong spacing>
          Gjør du ikke det, kan det medføre at stønaden du mottar fra Nav
          bortfaller for en periode eller stanses. Hvis du ikke kan gjennomføre
          aktiviteten, ber vi deg ta kontakt med veilederen din så snart som
          mulig.
        </BodyLong>
        <Button variant="secondary-neutral">Ok, jeg har lest beskjeden</Button>
      </Alert>

      <Alert size="small" variant="info">
        <VStack gap="3">
          Det har kommet nye opplysninger. Vil du ta dem i bruk?
          <HStack gap="4">
            <Button size="small" variant="secondary-neutral">
              Ja
            </Button>
            <Button size="small" variant="secondary-neutral">
              Nei
            </Button>
          </HStack>
        </VStack>
      </Alert>
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
  index: 0,
};
