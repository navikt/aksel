import { UseNavigateResult } from "@tanstack/react-router";
import React from "react";
import {
  Alert,
  BodyLong,
  BodyShort,
  Box,
  Button,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  ReadMore,
  VStack,
} from "@navikt/ds-react";

const JobInterestBox = ({
  navigate,
}: {
  navigate: UseNavigateResult<"/aktivitetsplan/$activityId">;
}) => {
  const [shouldSave, setShouldSave] = React.useState(undefined);
  return (
    <Box.New
      borderColor="neutral-subtleA"
      borderWidth="1"
      borderRadius="12"
      padding="space-12"
      background="neutral-softA"
    >
      <VStack gap="space-16">
        <Heading size="small" as="h2">
          Er du interessert i denne stillingen?
        </Heading>
        <BodyShort>
          Du bestemmer selv om Nav kan dele CV-en din for denne stillingen.
          <br />
          Svar før: 27. januar 2025
        </BodyShort>
        <RadioGroup
          legend="Er du interessert i denne stillingen?"
          hideLegend
          onChange={setShouldSave}
        >
          <Radio value={true}>
            Ja, og Nav kan dele CV-en min med denne arbeidsgiveren
          </Radio>
          <Radio value={false}>
            Nei, og jeg vil ikke at Nav skal dele CV-en min med arbeidsgiveren
          </Radio>
        </RadioGroup>
        <ReadMore header="Les om deling av CV">
          <VStack gap="4">
            <BodyLong>
              Arbeidsgiveren får tilgang til CV-en dersom du gir samtykke til å
              dele og Nav deler den til arbeidsgiveren. En delt CV vil opphøre å
              eksistere for arbeidsgiver dersom du ikke lenger følges opp av Nav
              for å skaffe jobb, eller senest seks måneder etter at Nav sendte
              CV-en til arbeidsgiver.
            </BodyLong>
            <BodyLong>
              Hvis du angrer på at du ga samtykke til å dele CV så kan du snakke
              med din veileder som kan trekke delingen av CV-en, slik at
              arbeidsgiver ikke lenger har tilgang til den. Hvis du oppdaterer
              CV-en din så er det alltid den siste versjonen arbeidsgiver vil
              se.
            </BodyLong>
          </VStack>
        </ReadMore>
        <HStack gap="4" align="center">
          <Button
            type="button"
            onClick={() => {
              navigate({ to: "/aktivitetsplan/" });
            }}
          >
            Lagre
          </Button>
          {shouldSave !== undefined && (
            <Alert inline variant="info">
              Stillingen flyttes til {shouldSave ? "Gjennomfører" : "Avbrutt"}
            </Alert>
          )}
        </HStack>
      </VStack>
    </Box.New>
  );
};

export default JobInterestBox;
