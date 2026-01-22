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
  Page,
  Radio,
  RadioGroup,
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
            <Heading level="1" size="xlarge">
              Søknad om foreldrepenger
            </Heading>
          </VStack>

          <GuidePanel poster>
            <Heading level="2" size="medium" spacing>
              Hei, Darth Vader!
            </Heading>
            <BodyLong spacing>
              Jeg er her for å veilede deg gjennom søknaden. Svarene dine lagres
              i underveis, slik at du trygt kan gå tilbake og endre dem.
            </BodyLong>
            <BodyLong spacing>
              Foreldrepenger skal erstatte inntekten din når du skal være hjemme
              med barnet i forbindelse med fødsel eller adopsjon.
            </BodyLong>
            <BodyLong>
              <Link href="#">
                Les mer om foreldrepenger, hvem som kan søke og hva du kan få på
                nav.no.
              </Link>
            </BodyLong>
          </GuidePanel>
          <RadioGroup legend="Hvilket barn gjelder søknaden din?">
            <Radio value="luke">Luke født 19 BBY</Radio>
            <Radio value="leia">Leia født 19 BBY</Radio>
            <Radio value="other" description="Det vil opprettes en ny sak">
              Et annet barn
            </Radio>
          </RadioGroup>
          <div>
            <Heading level="2" size="large" spacing>
              Før du søker
            </Heading>
            <BodyLong>
              Vi lagrer søknaden din i 24 timer. Hvis du ikke fortsetter innen
              den tid, blir søknaden slettet.
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
  title: "Foreldrepenger",
};
