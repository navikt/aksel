import React from "react";
import { ArrowLeftIcon } from "@navikt/aksel-icons";
import {
  Bleed,
  BodyLong,
  Box,
  FormProgress,
  FormSummary,
  GuidePanel,
  Heading,
  Link,
  Page,
  VStack,
} from "@navikt/ds-react";
import FormNavigation from "../../../components/website-modules/examples/__parts-inline/FormNavigation";
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
      <Page.Block as="main" width="text" gutters>
        <VStack gap="8">
          <VStack gap="3">
            <Bleed asChild marginInline={{ lg: "32" }}>
              <Box
                width={{ xs: "64px", lg: "96px" }}
                height={{ xs: "64px", lg: "96px" }}
                asChild
                position={{ xs: "relative", lg: "absolute" }}
              >
                <ApplicationPictogram />
              </Box>
            </Bleed>
            <Heading level="1" size="xlarge">
              Søknad om dagpenger
            </Heading>
          </VStack>

          <div data-aksel-template="form-summarypage-v4">
            <Link href="#">
              <ArrowLeftIcon aria-hidden /> Forrige steg
            </Link>
            <Box paddingBlock="6 5">
              <Heading level="2" size="large">
                Oppsummering
              </Heading>
            </Box>
            <FormProgress activeStep={12} totalSteps={12}>
              <FormProgress.Step href="#">Steg 1</FormProgress.Step>
              <FormProgress.Step href="#">Steg 2</FormProgress.Step>
              <FormProgress.Step href="#">Steg 3</FormProgress.Step>
              <FormProgress.Step href="#">Steg 4</FormProgress.Step>
              <FormProgress.Step href="#">Steg 5</FormProgress.Step>
              <FormProgress.Step href="#">Steg 6</FormProgress.Step>
              <FormProgress.Step href="#">Steg 7</FormProgress.Step>
              <FormProgress.Step href="#">Steg 8</FormProgress.Step>
              <FormProgress.Step href="#">Steg 9</FormProgress.Step>
              <FormProgress.Step href="#">Steg 10</FormProgress.Step>
              <FormProgress.Step href="#">Steg 11</FormProgress.Step>
              <FormProgress.Step href="#">Oppsummering</FormProgress.Step>
            </FormProgress>
          </div>

          <GuidePanel poster>
            <BodyLong spacing>
              Nå kan du se over at alt er riktig før du sender inn søknaden. Ved
              behov kan du endre opplysningene.
            </BodyLong>
            <BodyLong>
              Når du har sendt inn søknaden kommer du til en kvitteringsside med
              informasjon om veien videre. Der kan du også ettersende
              dokumentasjon som mangler.
            </BodyLong>
          </GuidePanel>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Personalia</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Navn</FormSummary.Label>
                <FormSummary.Value>VOKSENDE TJA</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Fødselsnummer</FormSummary.Label>
                <FormSummary.Value>123456 78912</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Alder</FormSummary.Label>
                <FormSummary.Value>45</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Folkeregistrert adresse</FormSummary.Label>
                <FormSummary.Value>
                  Skjellsandveien 40, 3472 Bødalen
                </FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Kontonummer</FormSummary.Label>
                <FormSummary.Value>
                  Vi har ikke registrert kontonummeret ditt, og anbefaler at du
                  legger det inn på Min side.
                </FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
              <FormSummary.EditLink href="/eksempel" />
            </FormSummary.Footer>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Bostedsland</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Hvilket land bor du i?</FormSummary.Label>
                <FormSummary.Value>Norge</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
              <FormSummary.EditLink href="/eksempel" />
            </FormSummary.Footer>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Din situasjon</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Har du mottatt dagpenger fra Nav i løpet av de siste 52 ukene?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Hvilken dato søker du dagpenger fra?
                </FormSummary.Label>
                <FormSummary.Value>3. januar 2024</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Hvilken arbeidstid har du hatt?
                </FormSummary.Label>
                <FormSummary.Value>
                  Jeg har hatt fast arbeidstid i minst seks måneder
                </FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Arbeidsgiver</FormSummary.Label>
                <FormSummary.Value>
                  <FormSummary.Answers>
                    <FormSummary.Answer>
                      <FormSummary.Label>Navnet på bedriften</FormSummary.Label>
                      <FormSummary.Value>Cool AS</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Hvilket land har du jobbet i?
                      </FormSummary.Label>
                      <FormSummary.Value>Norge</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Hvordan har dette arbeidsforholdet endret seg?
                      </FormSummary.Label>
                      <FormSummary.Value>
                        Arbeidsgiver har sagt meg opp
                      </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Varighet på arbeidsforholdet
                      </FormSummary.Label>
                      <FormSummary.Value>
                        Fra dato: 10. mars 2016
                        <br />
                        Til dato: 3. januar 2024
                      </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Vet du hvor mange timer du har jobbet i uka før du ble
                        sagt opp?
                      </FormSummary.Label>
                      <FormSummary.Value>
                        Nei, jeg er usikker, bruk opplysninger fra
                        skatteetaten.no/mineinntekter for å beregne min vanlige
                        arbeidstid.
                      </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Hva var årsaken til at du ble sagt opp? (Maks 500 tegn)
                      </FormSummary.Label>
                      <FormSummary.Value>Dårlige tider</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Har du fått tilbud om å fortsette hos arbeidsgiveren din
                        i en annen stilling eller et annet sted i Norge?
                      </FormSummary.Label>
                      <FormSummary.Value>Nei</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Jobbet du skift eller turnus?
                      </FormSummary.Label>
                      <FormSummary.Value>Nei</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>Jobbet du rotasjon?</FormSummary.Label>
                      <FormSummary.Value>Nei</FormSummary.Value>
                    </FormSummary.Answer>
                  </FormSummary.Answers>
                </FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
              <FormSummary.EditLink href="/eksempel" />
            </FormSummary.Footer>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">
                Arbeidsforhold i EØS-området
              </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Har du jobbet i et annet EØS-land, Sveits eller Storbritannia
                  i løpet av de siste 36 månedene?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
              <FormSummary.EditLink href="/eksempel" />
            </FormSummary.Footer>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Egen næring</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Driver du egen næringsvirksomhet?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Driver du eget gårdsbruk?</FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
              <FormSummary.EditLink href="/eksempel" />
            </FormSummary.Footer>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Verneplikt</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Har du avtjent verneplikt i minst tre måneder de siste tolv
                  månedene?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
              <FormSummary.EditLink href="/eksempel" />
            </FormSummary.Footer>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Andre ytelser</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Mottar du eller har du søkt om ytelser fra andre enn Nav?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Får du eller kommer du til å få lønn eller andre økonomiske
                  goder fra tidligere arbeidsgiver?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
              <FormSummary.EditLink href="/eksempel" />
            </FormSummary.Footer>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Utdanning</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Tar du utdanning eller opplæring?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Avsluttet du utdanning i løpet av de siste seks månedene?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Planlegger du å starte eller fullføre utdanning eller
                  opplæring samtidig som du mottar dagpenger?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
              <FormSummary.EditLink href="/eksempel" />
            </FormSummary.Footer>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Barnetillegg</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Barn</FormSummary.Label>
                <FormSummary.Value>
                  <FormSummary.Answers>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Fornavn og mellomnavn
                      </FormSummary.Label>
                      <FormSummary.Value>JURIDISK</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>Etternavn</FormSummary.Label>
                      <FormSummary.Value>BIOGRAFI</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Fødselsdato (dd.mm.åååå)
                      </FormSummary.Label>
                      <FormSummary.Value>1. august 2007</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Hvilket land bor barnet i?
                      </FormSummary.Label>
                      <FormSummary.Value>Norge</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Forsørger du barnet?
                      </FormSummary.Label>
                      <FormSummary.Value>Ja</FormSummary.Value>
                    </FormSummary.Answer>
                  </FormSummary.Answers>
                </FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Forsørger du barn som ikke vises her?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
              <FormSummary.EditLink href="/eksempel" />
            </FormSummary.Footer>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">
                Reell arbeidssøker
              </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Kan du jobbe både heltid og deltid?
                </FormSummary.Label>
                <FormSummary.Value>Ja</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Kan du jobbe i hele Norge?
                </FormSummary.Label>
                <FormSummary.Value>Ja</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Kan du ta alle typer arbeid?
                </FormSummary.Label>
                <FormSummary.Value>Ja</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Er du villig til å bytte yrke eller gå ned i lønn?
                </FormSummary.Label>
                <FormSummary.Value>Ja</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
              <FormSummary.EditLink href="/eksempel" />
            </FormSummary.Footer>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">
                Tilleggsopplysninger
              </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Har du flere opplysninger du mener er viktige for søknaden
                  din?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
              <FormSummary.EditLink href="/eksempel" />
            </FormSummary.Footer>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Dokumentasjon</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Arbeidsavtale (Cool AS)</FormSummary.Label>
                <FormSummary.Value>
                  Skal sendes av noen andre
                  <br />
                  Navn Navnesen
                </FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Oppsigelse (Cool AS)</FormSummary.Label>
                <FormSummary.Value>
                  Skal sendes av noen andre
                  <br />
                  Navn Navnesen
                </FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
              <FormSummary.EditLink href="/eksempel" />
            </FormSummary.Footer>
          </FormSummary>

          <FormNavigation />
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
  index: 0,
};
