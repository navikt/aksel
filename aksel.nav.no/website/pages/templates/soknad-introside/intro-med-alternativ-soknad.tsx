import { ArrowRightIcon } from "@navikt/aksel-icons";
import {
  Accordion,
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
      <VStack as="main" gap="8">
        <Page.Block width="text" gutters>
          <Bleed marginInline={{ lg: "24" }}>
            <Stack
              align="center"
              gap="6"
              direction={{ xs: "row-reverse", lg: "row" }}
              justify="start"
              wrap={false}
            >
              <Show above="sm">
                <ApplicationPictogram title="Application" />
              </Show>
              <VStack gap="1" style={{ flex: 1 }}>
                <BodyShort size="small">NAV 10-07.03 (om relevant)</BodyShort>
                <Heading level="1" size="large">
                  Søknad om [ytelse]
                </Heading>
              </VStack>
            </Stack>
          </Bleed>
        </Page.Block>
        <Page.Block width="text" gutters>
          <VStack gap="12">
            <GuidePanel poster>
              <Heading level="2" size="medium" spacing>
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
            <Box>
              <Heading level="2" size="large" spacing>
                Her kan du søke om
              </Heading>
              <BodyLong spacing>
                Denne seksjonen brukes dersom det er utfordrende å bruke riktig
                søknad. Her skal det stå informasjon om hva du kan søke om med
                denne søknaden. Bruk punktliste for god lesbarhet.
              </BodyLong>
              <Heading level="3" size="medium" spacing>
                Dette kan du ikke søke om her
              </Heading>
              <BodyLong spacing>
                Deretter skal det stå informasjon om hva du ikke kan søke om i
                denne søknaden, og link til alternativ søknad. Bruk punktliste
                for god lesbarhet.
              </BodyLong>
            </Box>
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
  index: 3,
  title: "Alternativ søknad",
  desc: "I noen tilfeller finnes det søknader som dekker litt andre behov. For å redusere sjansen for at brukere søker på feil ytelse, så kan du inkludere en seksjon som sier hva du kan søke på i denne søknaden, og eventuelt hva du må bruke en annen søknad for.",
};
