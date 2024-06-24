import React from "react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import {
  Accordion,
  Alert,
  Bleed,
  BodyLong,
  BodyShort,
  Box,
  Button,
  Checkbox,
  GuidePanel,
  Heading,
  Link,
  List,
  Page,
  Show,
  Stack,
  VStack,
} from "@navikt/ds-react";
import ApplicationPictogram from "../../../components/website-modules/examples/__parts/ApplicationPictogram";
import {
  Env,
  Footer,
  Header,
  useDekorator,
} from "../../../components/website-modules/examples/__parts/Dekorator";

function Example() {
  useDekorator();

  return (
    <Page footer={<Footer />}>
      <Header />
      <Page.Block width="text" gutters>
        <VStack as="main" gap="8">
          <Bleed
            marginInline={{ lg: "24" }}
            data-aksel-template="form-intropage-v1"
          >
            <Stack
              gap="6"
              direction={{ sm: "row-reverse", lg: "row" }}
              justify={{ sm: "space-between", lg: "start" }}
              wrap={false}
            >
              <Show above="sm">
                <ApplicationPictogram />
              </Show>
              <VStack gap="1">
                <BodyShort size="small">NAV 10-07.03 (om relevant)</BodyShort>
                <Heading level="1" size="large">
                  Søknad om [ytelse]
                </Heading>
              </VStack>
            </Stack>
          </Bleed>
          <GuidePanel poster>
            <Heading level="2" size="medium" spacing>
              Hei, [Navn Navnesen]!
            </Heading>
            <BodyLong spacing>
              Seksjonen GuidePanel brukes til en kort, overordnet veiledning til
              søkeren. Seksjonen henter inn søkerens navn, og gir en komprimert
              forklaring av pengestøtten, tiltaket eller hjelpemiddelet. Denne
              teksten hentes fra ingressen til produktsiden på nav.no.
            </BodyLong>
            <BodyLong>
              Avslutt teksten i seksjonen med en lenke til produktsiden på
              nav.no som åpnes i en ny fane.
            </BodyLong>
          </GuidePanel>
          <Alert variant="info">
            Her skal det stå en viktig melding om tidsbestemte eller
            situasjonsbestemte forhold som påvirker søknaden. <br />
            Bruk kun 1 Info Alert per side.
          </Alert>
          <div>
            <Heading level="2" size="large" spacing>
              Før du søker
            </Heading>
            <BodyLong spacing>
              Denne seksjonen brukes til å gi søkerne informasjon de vil ha stor
              nytte av før de går i gang med søknaden. Eksempler på nyttig
              informasjon:
            </BodyLong>
            <List>
              <List.Item>
                Oppgaver brukeren må ha gjort før de søker.{" "}
                <i>
                  Du må ha meldt deg som arbeidssøker før du kan søke om
                  dagpenger.
                </i>
              </List.Item>
              <List.Item>
                Dokumentasjon brukeren kan bli bedt om.{" "}
                <i>
                  Noen av opplysningene du gir underveis vil du bli bedt om å
                  dokumentere. Du vil trenge xx og xx for å fullføre denne
                  søknaden.
                </i>
              </List.Item>
              <List.Item>
                Automatisk lagring.{" "}
                <i>
                  Vi lagrer svarene dine (xx timer) mens du fyller ut, så du kan
                  ta pauser underveis.
                </i>
              </List.Item>
              <List.Item>
                Antall steg og estimert tidsbruk.{" "}
                <i>
                  Det er XX steg i søknaden, og du kan regne med å bruke ca. XX
                  minutter.
                </i>
              </List.Item>
              <List.Item>
                Søknadsfrister. <i>Husk at du må søke om xx innen xx dager.</i>
              </List.Item>
              <List.Item>
                Saksbehandlingstider og info om gyldighet, krav osv.{" "}
                <i>
                  Vi bruker ca. xx uker på å behandle søknaden din. Husk at du
                  må sende meldekort xx ofte selv om du ikke har fått svar på
                  søknaden din om dagpenger ennå.
                </i>
              </List.Item>
            </List>
            <BodyLong>
              For annen, utfyllende informasjon om søknaden bør du lenke direkte
              til søknadskapittelet i produktsiden, som{" "}
              <Link href="https://www.nav.no/dagpenger#sok">
                dette eksempelet for dagpenger
              </Link>
              .
            </BodyLong>
          </div>
          <div>
            <Accordion>
              <Accordion.Item>
                <Accordion.Header>
                  Informasjon vi henter om deg
                </Accordion.Header>
                <Accordion.Content>
                  <BodyLong>
                    Her skal det så informasjon om hvor vi vil hente
                    opplysninger om søkeren og hva slags opplysninger vi henter.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>
                  Hvordan vi behandler personopplysninger
                </Accordion.Header>
                <Accordion.Content>
                  <BodyLong>
                    Her skal det stå informasjon om hvordan vi behandler
                    personopplysningene til søkeren.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Automatisk saksbehandling</Accordion.Header>
                <Accordion.Content>
                  <BodyLong>
                    Her skal det stå informasjon om hva automatisk behandling
                    er, hva det betyr for søkeren og informasjon om søkerens
                    rettigheter ved automatisk avslag.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Vi lagrer svar underveis</Accordion.Header>
                <Accordion.Content>
                  <BodyLong>
                    Her skal det stå informasjon om hvordan denne søknaden
                    mellomlagrer informasjonen til søkeren og hvor lenge
                    informasjonen lagres. Vi skal informere om mellomlagring ved
                    både automatisk lagring og ved samtykke til lagring med
                    lagre-knapp.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
          <div>
            <BodyLong>
              Det er viktig at du gir oss riktige opplysninger slik at vi kan
              behandle saken din.{" "}
              <Link href="#gi-riktige-opplysninger">
                Les mer om viktigheten av å gi riktige opplysninger.
              </Link>
            </BodyLong>
            <Box paddingBlock="4 8">
              <Checkbox>
                Jeg vil svare så godt jeg kan på spørsmålene i søknaden.
              </Checkbox>
            </Box>
            <Button
              variant="primary"
              icon={<ArrowRightIcon aria-hidden />}
              iconPosition="right"
            >
              Start søknad
            </Button>
          </div>
        </VStack>
      </Page.Block>
      <Env />
    </Page>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

/* Storybook story */
export const Demo = {
  render: Example,
  parameters: { layout: "fullscreen" },
};

export const args = {
  index: 1,
  title: "Med Alert",
  desc: "I noen tilfeller oppstår det akutte eller tidsbestemte forhold rundt søknaden som brukeren må vite om før de starter søknaden. Dette kan være frister, situasjonsbestemte forhold eller annen viktig informasjon som brukeren bør ha før de starter søknaden. Alerten skal være informativ og kortfattet.",
  sandbox: false,
};
