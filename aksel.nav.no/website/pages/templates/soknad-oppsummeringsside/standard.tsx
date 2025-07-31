import React from "react";
import { ArrowLeftIcon } from "@navikt/aksel-icons";
import {
  Bleed,
  BodyLong,
  BodyShort,
  Box,
  FormProgress,
  FormSummary,
  GuidePanel,
  Heading,
  Link,
  Page,
  Show,
  Stack,
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
          <Bleed marginInline={{ lg: "24" }}>
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
                <BodyShort size="small">
                  Nav 10-07.03 (Om søknaden har ID)
                </BodyShort>
                <Heading level="1" size="xlarge">
                  Søknad om [ytelse]
                </Heading>
              </VStack>
            </Stack>
          </Bleed>

          <div data-aksel-template="form-summarypage-v2">
            <Link href="#">
              <ArrowLeftIcon aria-hidden /> Forrige steg
            </Link>
            <Box paddingBlock="6 5">
              <Heading level="2" size="large">
                Oppsummering
              </Heading>
            </Box>
            <FormProgress activeStep={3} totalSteps={3}>
              <FormProgress.Step href="#">Steg 1</FormProgress.Step>
              <FormProgress.Step href="#">Steg 2</FormProgress.Step>
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
                <FormSummary.Value>Anakin Skywalker</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Fødselsnummer</FormSummary.Label>
                <FormSummary.Value>123456 78912</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Folkeregistrert adresse</FormSummary.Label>
                <FormSummary.Value>
                  Tulleveien 1337
                  <br />
                  0472 Oslo
                </FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Telefon</FormSummary.Label>
                <FormSummary.Value>90 90 90 90</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>E-postadresse</FormSummary.Label>
                <FormSummary.Value>mail@tull.tøys</FormSummary.Value>
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
                      <FormSummary.Value>Luke Skywalker</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>Fødselsdato</FormSummary.Label>
                      <FormSummary.Value>19 BBY</FormSummary.Value>
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
                      <FormSummary.Value>Leia Organa</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>Fødselsdato</FormSummary.Label>
                      <FormSummary.Value>19 BBY</FormSummary.Value>
                    </FormSummary.Answer>
                  </FormSummary.Answers>
                </FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormNavigation />
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
  parameters: {
    layout: "fullscreen",
    chromatic: {
      modes: {
        desktop: {
          viewport: {
            width: 1024,
          },
        },
        tablet: {
          viewport: {
            width: 768,
          },
        },
        mobile: {
          viewport: {
            width: 400,
          },
        },
      },
    },
  },
};

export const args = {
  index: 0,
  sandbox: false,
};
