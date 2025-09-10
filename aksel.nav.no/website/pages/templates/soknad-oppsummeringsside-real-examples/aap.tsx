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
              Søknad om arbeidsavklaringspenger (AAP)
            </Heading>
          </VStack>

          <div data-aksel-template="form-summarypage-v3">
            <Link href="#">
              <ArrowLeftIcon aria-hidden /> Forrige steg
            </Link>
            <Box paddingBlock="6 5">
              <Heading level="2" size="large">
                Oppsummering
              </Heading>
            </Box>
            <FormProgress activeStep={9} totalSteps={9}>
              <FormProgress.Step href="#">Steg 1</FormProgress.Step>
              <FormProgress.Step href="#">Steg 2</FormProgress.Step>
              <FormProgress.Step href="#">Steg 3</FormProgress.Step>
              <FormProgress.Step href="#">Steg 4</FormProgress.Step>
              <FormProgress.Step href="#">Steg 5</FormProgress.Step>
              <FormProgress.Step href="#">Steg 6</FormProgress.Step>
              <FormProgress.Step href="#">Steg 7</FormProgress.Step>
              <FormProgress.Step href="#">Steg 8</FormProgress.Step>
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
              <FormSummary.Heading level="2">Om deg</FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Navn</FormSummary.Label>
                <FormSummary.Value>Luke Skywalker</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Fødselsnummer</FormSummary.Label>
                <FormSummary.Value>123456 78912</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Folkeregistrert adresse</FormSummary.Label>
                <FormSummary.Value>
                  Tulleveien 239A, 0472 Oslo
                </FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Telefonnummer</FormSummary.Label>
                <FormSummary.Value>12 34 56 78</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>E-postadresse</FormSummary.Label>
                <FormSummary.Value>mail@nomail.example</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Startdato</FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Har du sykepenger nå?</FormSummary.Label>
                <FormSummary.Value>Ja</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Har du planer om å ta ferie før du er ferdig med sykepenger?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">
                Bosted og jobb
              </FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Har du bodd sammenhengende i Norge de fem siste årene?
                </FormSummary.Label>
                <FormSummary.Value>Ja</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Har du jobbet utenfor Norge de fem siste årene?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Yrkesskade</FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Har du en yrkessykdom eller yrkesskade som påvirker hvor mye
                  du kan jobbe?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">
                Kontaktperson for helseopplysninger
              </FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Fastlege</FormSummary.Label>
                <FormSummary.Value>
                  Navn: Sonja Paracet Plastersen
                  <br />
                  Legekontor: Andeby legekontor
                  <br />
                  Adresse: Skogveien 17, 1234 Andeby
                  <br />
                  Telefon: 99 99 99 99
                  <br />
                  Er informasjonen om fastlegen din riktig? Ja
                </FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Barnetillegg</FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Barn nr. 1</FormSummary.Label>
                <FormSummary.Value>
                  <FormSummary.Answers>
                    <FormSummary.Answer>
                      <FormSummary.Label>Navn</FormSummary.Label>
                      <FormSummary.Value>Embla Bakke Li</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>Fødselsdato</FormSummary.Label>
                      <FormSummary.Value>08.03.2023</FormSummary.Value>
                    </FormSummary.Answer>
                  </FormSummary.Answers>
                </FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Barn nr. 2</FormSummary.Label>
                <FormSummary.Value>
                  <FormSummary.Answers>
                    <FormSummary.Answer>
                      <FormSummary.Label>Navn</FormSummary.Label>
                      <FormSummary.Value>Jonas Li Ibux</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>Fødselsdato</FormSummary.Label>
                      <FormSummary.Value>08.03.2022</FormSummary.Value>
                    </FormSummary.Answer>
                  </FormSummary.Answers>
                </FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Student</FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Er du student?</FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Utbetalinger</FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Har du fått eller skal du få ekstra utbetalinger fra
                  arbeidsgiver?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Kryss av for utbetalinger du får, eller nylig har søkt om:
                </FormSummary.Label>
                <FormSummary.Value>Ingen av disse</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">
                Vedlegg og tilleggsopplysninger
              </FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Vedlegg</FormSummary.Label>
                <FormSummary.Value>Ingen vedlegg</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
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
  sandbox: false,
  title: "AAP",
};
