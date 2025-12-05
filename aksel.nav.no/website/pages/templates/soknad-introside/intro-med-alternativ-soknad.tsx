import React from "react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import {
  Accordion,
  Bleed,
  BodyLong,
  Box,
  Button,
  Checkbox,
  GuidePanel,
  Heading,
  Link,
  List,
  Page,
  Tag,
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
        <VStack
          as="main"
          gap="space-32"
          data-aksel-template="form-intropage-v4"
        >
          <VStack gap="space-12">
            <Bleed asChild marginInline={{ lg: "space-128" }}>
              <Box
                width={{ xs: "64px", lg: "96px" }}
                height={{ xs: "64px", lg: "96px" }}
                asChild
                position={{ xs: "relative", lg: "absolute" }}
              >
                <ApplicationPictogram />
              </Box>
            </Bleed>

            <VStack gap="space-4" align="start">
              <Heading level="1" size="xlarge">
                Søknad om [ytelse]
              </Heading>
              <Tag variant="neutral-moderate" size="small">
                Nav 10-07.03 (om relevant)
              </Tag>
            </VStack>
          </VStack>

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
          <div>
            <Heading level="2" size="large" spacing>
              Her kan du søke om
            </Heading>
            <BodyLong spacing>
              Dette feltet brukes hvis det kan være utfordrende å finne riktig
              søknad, for eksempel fordi det er mange søknader som er nesten lik
              hverandre. Bruk feltet til en kort og tydelig forklaring på hva
              denne søknaden gjelder.
            </BodyLong>
            <Heading level="3" size="medium" spacing>
              Dette kan du ikke søke om her
            </Heading>
            <BodyLong>
              Legg inn informasjon om hva du ikke kan søke om fra denne siden og
              legg inn lenke til de aktuelle søknadene man skal bruke i stedet.
            </BodyLong>
          </div>
          <div>
            <Heading level="2" size="large" spacing>
              Før du søker
            </Heading>
            <BodyLong>
              Denne seksjonen brukes til å gi søkerne informasjon de vil ha stor
              nytte av før de går i gang med søknaden. Eksempler på nyttig
              informasjon:
            </BodyLong>
            <Box marginBlock="space-16 space-28" asChild>
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
            <BodyLong>
              For annen, utfyllende informasjon om søknaden bør du lenke direkte
              til søknadskapittelet i produktsiden, som{" "}
              <Link href="https://www.nav.no/dagpenger#sok">
                dette eksempelet for dagpenger
              </Link>
              .
            </BodyLong>
          </div>
          <Box>
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
          </Box>
          <div>
            <BodyLong>
              Det er viktig at du gir oss riktige opplysninger slik at vi kan
              behandle saken din.{" "}
              <Link href="https://www.nav.no/endringer">
                Les mer om viktigheten av å gi riktige opplysninger.
              </Link>
            </BodyLong>
            <Box paddingBlock="space-16 space-32">
              <Checkbox>
                Jeg bekrefter at jeg vil svare så riktig som jeg kan.
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
      <Env
        languages={[
          { locale: "nb", url: "https://www.nav.no" },
          { locale: "en", url: "https://www.nav.no/en" },
        ]}
      />
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
  index: 2,
  title: "Alternativ søknad",
  desc: "I noen tilfeller finnes det søknader som dekker litt andre behov. For å redusere sjansen for at brukere søker på feil ytelse, så kan du inkludere en seksjon som sier hva du kan søke på i denne søknaden, og eventuelt hva du må bruke en annen søknad for.",
};
