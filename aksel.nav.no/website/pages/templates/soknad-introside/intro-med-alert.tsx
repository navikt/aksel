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
  Stack,
  VStack,
} from "@navikt/ds-react";
import { ApplicationPictogram } from "@/assets/Icons";
import {
  Env,
  Footer,
  Header,
  useDekorator,
} from "../../../components/utils/dekorator";

function Example() {
  useDekorator();

  return (
    <Page data-aksel-template="500-v2" footer={<Footer />}>
      <Header />
      <VStack gap="8">
        <Page.Block as="main" width="text" gutters>
          <Bleed marginInline={{ md: "24" }}>
            <Stack
              align="center"
              gap="6"
              direction={{ xs: "row-reverse", md: "row" }}
              justify="start"
              wrap={false}
            >
              <ApplicationPictogram title="Application" />
              <VStack gap="1">
                <BodyShort size="small">NAV 10-07.03 (om relevant)</BodyShort>
                <Heading level="1" size="large">
                  Søknad om [ytelse]
                </Heading>
              </VStack>
            </Stack>
          </Bleed>
        </Page.Block>
        <Page.Block width="text">
          <VStack gap="12">
            <GuidePanel poster>
              <Heading level="3" size="medium" spacing>
                Hei, [Navn Navnesen]!
              </Heading>
              <BodyLong spacing>
                GuidePanel brukes til kort overordnet veiledning til søkeren.
                Språket er uformelt og betryggende. GuidePanel inkluderer ikke
                spesifikk veiledning knyttet til skjemafelt i søknaden.
              </BodyLong>
              <BodyLong spacing>
                Her står også en kort forklaring av “produktet”. Kopier gjerne
                ingress fra nav.no. Det skal være nok informasjon til å forstå
                hva søknaden handler om uten å kopiere for mye innhold fra
                produktsiden.
              </BodyLong>
              <BodyLong>
                Avslutt med lenke til produktsiden på nav.no som åpnes i ny
                fane.
              </BodyLong>
            </GuidePanel>
            <Alert variant="info">
              Her skal det stå en viktig melding om tidsbestemte eller
              situasjonsbestemte forhold som påvirker søknaden. <br />
              Bruk kun 1 Info Alert per side.
            </Alert>
            <Box>
              <Heading level="2" size="large" spacing>
                Før du søker
              </Heading>
              <BodyLong spacing>
                Her skal det kun stå informasjon brukeren vil ha stor nytte av
                før søknaden. Informasjon brukeren ikke trenger før start, og
                som brukeren vil få underveis, skal ikke stå her. Undersøk
                hvilken informasjon som ligger i søknadsdialogen og på
                kvitteringssiden, slik at vi minimerer dobbelt innhold.
                Eksempler på nyttig informasjon nedenfor - punktene tas bare med
                om de er relevante:
              </BodyLong>
              <List>
                <List.Item>
                  Ting brukeren må ha gjort før søknaden.{" "}
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
                    Vi lagrer svarene dine (xx timer) mens du fyller ut, så du
                    kan ta pauser underveis.
                  </i>
                </List.Item>
                <List.Item>
                  Antall steg og estimert tidsbruk.{" "}
                  <i>
                    Det er XX steg i søknaden, og du kan regne med å bruke ca.
                    XX minutter.
                  </i>
                </List.Item>
                <List.Item>
                  Søknadsfrister.{" "}
                  <i>Husk at du må søke om xx innen xx dager.</i>
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
            </Box>
            <Box>
              <Accordion>
                <Accordion.Item>
                  <Accordion.Header>
                    Informasjon vi henter om deg
                  </Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Her skal det så informasjon om hvor vi vil hente
                      opplysninger om søkeren og hva slags opplysninger vi
                      henter.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>
                    Hvordan vi behandler personopplysninger
                  </Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Her skal det stå informasjon om hvordan vi behandler
                      personopplysningene til søkeren.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Automatis behandling</Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Her skal det stå informasjon om hva automatisk behandling
                      er for noe og hva det betyr for søkeren. Samt informasjon
                      om søkers rettigheter ved automatisk avslag.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Vi lagrer svar underveis</Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Her skal det stå informasjon om hvordan denne søknaden
                      mellomlagrer informasjonen til søkeren og hvor lenge
                      informasjonen lagres. Både automatisk lagring og samtykke
                      til lagring med lagre-knapp.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
            </Box>
            <Box paddingBlock="0 12">
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
                icon={<ArrowRightIcon />}
                iconPosition="right"
              >
                Start søknad
              </Button>
            </Box>
          </VStack>
        </Page.Block>
      </VStack>
      <Env />
    </Page>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  title: "Med Alert",
  desc: "I noen tilfeller oppstår det akutte eller tidsbestemte forhold rundt søknaden som brukeren må vite om før de starter søknaden. Dette kan være frister, situasjonsbestemte forhold eller annen viktig informasjon som brukeren bør ha før de starter søknaden. Alerten skal være informativ og kortfattet.",
};
