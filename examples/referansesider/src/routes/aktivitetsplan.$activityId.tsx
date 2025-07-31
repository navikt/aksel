import { createFileRoute } from "@tanstack/react-router";
import { ChatIcon } from "@navikt/aksel-icons";
import {
  Accordion,
  BodyLong,
  BodyShort,
  Button,
  HStack,
  Heading,
  Modal,
  Radio,
  RadioGroup,
  VStack,
} from "@navikt/ds-react";
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@navikt/ds-react/Accordion";
import ActivityDetails from "../components/aktivitetsplan/modal/ActivityDetails";
import JobInterestBox from "../components/aktivitetsplan/modal/JobInterestBox";
import { Activity, activities } from "../data/activities";

export const Route = createFileRoute("/aktivitetsplan/$activityId")({
  loader: ({ params }) => activities.find(({ id }) => id === params.activityId),
  component: ActivityModal,
});

function ActivityModal() {
  const navigate = Route.useNavigate();
  const activity: Activity = Route.useLoaderData();
  const { actionText, category, title } = activity;

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
          <ActivityDetails activity={activity} />
          {category === "Stilling fra Nav" && (
            <JobInterestBox navigate={navigate} />
          )}
          <HStack gap="4">
            {actionText && (
              <Button
                variant="secondary"
                onClick={() => navigate({ to: "/aktivitetsplan/" })}
              >
                {actionText}
              </Button>
            )}
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
