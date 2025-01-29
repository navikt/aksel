import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { ChatIcon } from "@navikt/aksel-icons";
import {
  Accordion,
  Alert,
  BodyLong,
  BodyShort,
  Box,
  Button,
  HGrid,
  HStack,
  Heading,
  Modal,
  Radio,
  RadioGroup,
  ReadMore,
  VStack,
} from "@navikt/ds-react";
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@navikt/ds-react/Accordion";
import { Activity, activities } from "../data/activities";

export const Route = createFileRoute("/aktivitetsplan/$activityId")({
  loader: ({ params }) => activities.find(({ id }) => id === params.activityId),
  component: ActivityModal,
});

function ActivityModal() {
  const [shouldSave, setShouldSave] = React.useState(undefined);
  const navigate = Route.useNavigate();
  const activity: Activity = Route.useLoaderData();
  const { description, employer, location, title } = activity;
  return (
    <Modal
      open
      header={{ heading: title }}
      onClose={() => navigate({ to: "/aktivitetsplan/" })}
      closeOnBackdropClick={true}
      placement="top"
    >
      <Modal.Body>
        <VStack gap="6">
          <BodyLong>{description}</BodyLong>
          <HGrid columns={2}>
            <div>
              <Heading size="large" as="h2">
                Arbeidsgiver
              </Heading>
              <BodyShort>{employer}</BodyShort>
            </div>
            <div>
              <Heading size="large" as="h2">
                Arbeidssted
              </Heading>
              <BodyShort>{location}</BodyShort>
            </div>
          </HGrid>
          <Box.New>
            <VStack gap="4">
              <Heading size="large" as="h2">
                Er du interessert i denne stillingen?
              </Heading>
              <BodyShort>
                Du bestemmer selv om Nav kan dele CV-en din for denne
                stillingen.
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
                  Nei, og jeg vil ikke at Nav skal dele CV-en min med
                  arbeidsgiveren
                </Radio>
              </RadioGroup>
              <ReadMore header="Les om deling av CV">
                <VStack gap="4">
                  <BodyLong>
                    Arbeidsgiveren får tilgang til CV-en dersom du gir samtykke
                    til å dele og Nav deler den til arbeidsgiveren. En delt CV
                    vil opphøre å eksistere for arbeidsgiver dersom du ikke
                    lenger følges opp av Nav for å skaffe jobb, eller senest
                    seks måneder etter at Nav sendte CV-en til arbeidsgiver.
                  </BodyLong>
                  <BodyLong>
                    Hvis du angrer på at du ga samtykke til å dele CV så kan du
                    snakke med din veileder som kan trekke delingen av CV-en,
                    slik at arbeidsgiver ikke lenger har tilgang til den. Hvis
                    du oppdaterer CV-en din så er det alltid den siste versjonen
                    arbeidsgiver vil se.
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
                    Stillingen flyttes til{" "}
                    {shouldSave ? "Gjennomfører" : "Avbrutt"}
                  </Alert>
                )}
              </HStack>
            </VStack>
          </Box.New>
          <HStack gap="4">
            <Button
              variant="secondary"
              onClick={() => navigate({ to: "/aktivitetsplan/" })}
            >
              Les mer om stillingen
            </Button>
            <Button
              icon={<ChatIcon />}
              variant="secondary"
              onClick={() => navigate({ to: "/aktivitetsplan/" })}
            >
              Send en melding
            </Button>
          </HStack>
          <Accordion>
            <AccordionItem>
              <AccordionHeader>
                <Heading size="small" as="h2">
                  Hva er status for aktiviteten?
                </Heading>
                <BodyShort>Planlegger</BodyShort>
              </AccordionHeader>
              <AccordionContent>
                <form onSubmit={() => {}}>
                  <RadioGroup
                    name="activityStatus"
                    legend="Hva er status for aktiviteten?"
                    hideLegend
                  >
                    <Radio value="suggested">Forslag</Radio>
                    <Radio value="planned">Planlegger</Radio>
                    <Radio value="ongoing">Gjennomfører</Radio>
                    <Radio value="completed">Fullført</Radio>
                    <Radio value="aborted">Avbrutt</Radio>
                  </RadioGroup>
                  <Button>Lagre</Button>
                </form>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader>
                <Heading size="small" as="h2">
                  Historikk
                </Heading>
              </AccordionHeader>
              <AccordionContent>
                <VStack gap="4">
                  <BodyLong>
                    <BodyShort weight="semibold" as="span">
                      Du
                    </BodyShort>{" "}
                    endret detaljer på aktiviteten
                    <br />
                    24 minutter siden
                  </BodyLong>
                  <BodyLong>
                    <BodyShort weight="semibold" as="span">
                      Nav
                    </BodyShort>{" "}
                    merket aktiviteten &quot;Avtalt med Nav&quot;
                    <br />
                    omtrent en time siden
                  </BodyLong>
                  <BodyLong>
                    <BodyShort weight="semibold" as="span">
                      Du
                    </BodyShort>{" "}
                    flyttet aktiviteten fra Planlegger til Forslag
                    <br />
                    22. jan. 2025 kl 12.42
                  </BodyLong>
                </VStack>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </VStack>
      </Modal.Body>
    </Modal>
  );
}
