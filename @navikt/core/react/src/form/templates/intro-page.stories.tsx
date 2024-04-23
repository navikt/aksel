import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
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
  Page,
  Stack,
  VStack,
} from "@navikt/ds-react";
//import { ApplicationPictogram } from "@/assets/Icons";
import { Env, Footer, Header, useDekorator } from "../../util/dekorator";

const meta = {
  title: "templates/form",
  parameters: {
    layout: "fullscreen",
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const IntroPage: Story = {
  render: () => {
    useDekorator();

    return (
      <Page data-aksel-template="500-v2" footer={<Footer />}>
        <Header />
        <VStack gap="8">
          <Page.Block as="main" width="text" gutters>
            <Bleed marginInline={{ md: "24" }}>
              <Stack
                gap="6"
                direction={{ xs: "row-reverse", md: "row" }}
                justify="start"
                wrap={false}
              >
                {/* <ApplicationPictogram title="Application" /> */}
                <VStack gap="1">
                  <BodyShort size="small">NAV 10-07.03</BodyShort>
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
                <VStack gap="4">
                  <Heading level="3" size="medium">
                    Hei, [Navn Navnesen]!
                  </Heading>
                  <BodyShort>
                    Ingress fra nav.no (sjekk om API er en mulighet)
                    <br />
                    Link til produktsiden på nav.no.
                  </BodyShort>
                  <BodyShort>
                    Vi lagrer svarene i søknaden underveis, så du kan trygt ta
                    pauser og gå tilbake for å endre dem.
                  </BodyShort>
                </VStack>
              </GuidePanel>
              <Box>
                <Heading level="2" size="large" spacing>
                  Hva kan jeg søke på her? (om relevant)
                </Heading>
                <BodyLong spacing>
                  Info om hva du kan søke på her, fordi det er ting du ikke kan
                  søke på her. Som kan føre til at brukerne søker på feil ting.
                </BodyLong>
                <Heading level="3" size="medium" spacing>
                  Hva kan jeg ikke søke på her? (om relevant)
                </Heading>
                <BodyLong>
                  Info om hva du ikke kan søke på med denne søknaden, hva du
                  heller må søke på + link til andre søknader.
                </BodyLong>
              </Box>
              <Box>
                <Heading level="2" size="large" spacing>
                  Slik søker du
                </Heading>
                <BodyLong spacing>
                  Kort info om søknadsprosessen:
                  <br />
                  Forventet mengde spørsmål og omtrent gjennomføringstid?
                  <br />
                  Forventet behov for dokumentasjon?
                  <br />
                  Hvor lenge vi lagrer svarene? Når får du svar?
                </BodyLong>
                <BodyLong spacing>
                  Eksempel: I søknaden stiller vi kun spørsmål som er relevante
                  i din situasjon.
                  <br />
                  Antall spørsmål og tiden det tar å søke vil derfor kunne
                  variere. De fleste bruker 20-30 minutter.
                </BodyLong>
                <BodyLong>
                  Noen av opplysningene du gir i søknaden må du dokumentere. Du
                  får beskjed underveis i søknaden om hvilken dokumentasjon du
                  må sende inn. Du kan ta pauser når du fyller ut søknaden. Vi
                  lagrer søknaden i opptil ## timer/dager mens du fyller ut.
                </BodyLong>
              </Box>
              <Box>
                <BodyLong spacing>
                  Det er viktig at du gir oss riktige opplysninger slik at vi
                  kan behandle saken din.{" "}
                  <Link href="#gi-riktige-opplysninger">
                    Les mer om viktigheten av å gi riktige opplysninger.
                  </Link>
                </BodyLong>
                <Checkbox>
                  Jeg vil svare så godt jeg kan på spørsmålene i søknaden.
                </Checkbox>
              </Box>
              <Box>
                <Button
                  variant="primary"
                  icon={<ArrowRightIcon />}
                  iconPosition="right"
                >
                  Start søknad
                </Button>
              </Box>
              <Box paddingBlock="12 0">
                <Accordion>
                  <Accordion.Item>
                    <Accordion.Header>
                      Informasjon vi henter om deg
                    </Accordion.Header>
                    <Accordion.Content>
                      <BodyLong spacing>
                        Vi henter opplysninger om deg fra folkeregisteret og
                        andre registre. Vi bruker opplysningene til å fylle ut
                        deler av søknaden for deg.
                      </BodyLong>
                    </Accordion.Content>
                  </Accordion.Item>
                  <Accordion.Item>
                    <Accordion.Header>
                      Hvordan vi behandler personopplysninger
                    </Accordion.Header>
                    <Accordion.Content>
                      <BodyLong spacing>
                        Vi behandler personopplysninger i henhold til
                        personopplysningsloven. Les mer om hvordan vi behandler
                        personopplysninger.
                      </BodyLong>
                    </Accordion.Content>
                  </Accordion.Item>
                  <Accordion.Item>
                    <Accordion.Header>Automatis behandling</Accordion.Header>
                    <Accordion.Content>
                      <BodyLong spacing>
                        Vi bruker automatiske systemer for å vurdere søknaden
                        din. Systemene gjør en del av jobben med å behandle
                        søknaden din.
                      </BodyLong>
                    </Accordion.Content>
                  </Accordion.Item>
                  <Accordion.Item>
                    <Accordion.Header>
                      Vi lagrer svar underveis
                    </Accordion.Header>
                    <Accordion.Content>
                      <BodyLong spacing>
                        Vi lagrer svarene i søknaden underveis, så du kan trygt
                        ta pauser og gå tilbake for å endre dem.
                      </BodyLong>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion>
              </Box>
            </VStack>
          </Page.Block>
        </VStack>
        <Env />
      </Page>
    );
  },
};
