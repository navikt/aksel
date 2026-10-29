import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import React, { useRef, useState } from "react";
import {
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  PaperplaneIcon,
} from "@navikt/aksel-icons";
import { Button } from "../button";
import { Chips } from "../chips";
import { ExpansionCard } from "../expansion-card";
import { GuidePanel } from "../guide-panel";
import { InfoCard } from "../info-card";
import { HStack, VStack } from "../primitives/stack";
import { Provider } from "../provider";
import { ToggleGroup } from "../toggle-group";
import { BodyShort } from "../typography";
import { en } from "../utils/i18n/locales";
import { Coach, type CoachMark } from "./root/CoachRoot";

export default {
  title: "ds-react/Coach",
  component: Coach,
  parameters: {
    chromatic: { disable: true },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "5000px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Coach>;

export const CoachAnchor: StoryFn<typeof Coach> = () => {
  const createRef = useRef<HTMLButtonElement>(null);
  const reviewRef = useRef<HTMLButtonElement>(null);

  return (
    <HStack gap="space-16">
      <Button ref={reviewRef}>Review</Button>
      <Coach
        steps={[
          {
            id: "step-1",
            type: "anchor",
            anchorRef: createRef,
            title: "Create",
            description: "Start by creating a new item.",
          },
          {
            id: "step-2",
            type: "anchor",
            anchorRef: reviewRef,
            placement: "bottom-start",
            title: "Review",
            description: "Review your item before submitting it.",
          },
        ]}
      >
        <Coach.Mark>
          <Button ref={createRef}>Create</Button>
        </Coach.Mark>
      </Coach>
    </HStack>
  );
};

export const CoachDialog: StoryFn<typeof Coach> = () => {
  return (
    <HStack gap="space-16">
      <Coach
        steps={[
          {
            id: "step-1",
            type: "dialog",
            title: "Welcome",
            description: "Welcome to the new experience.",
          },
          {
            id: "step-2",
            type: "dialog",
            title: "Changes",
            description: "Here is what changed since last time.",
          },
        ]}
      >
        <Coach.Mark>
          <Button>Next step</Button>
        </Coach.Mark>
      </Coach>
    </HStack>
  );
};

export const CoachMixed: StoryFn<typeof Coach> = () => {
  const dashboardRef = useRef<HTMLButtonElement>(null);
  const settingsRef = useRef<HTMLButtonElement>(null);

  return (
    <VStack
      gap="space-16"
      align="start"
      justify="space-between"
      height="5000px"
      width="500px"
    >
      <Coach
        steps={[
          {
            id: "step-1",
            type: "dialog",
            size: "small",
            width: "small",
            image: (
              <img
                src="https://i.pinimg.com/originals/59/54/b4/5954b408c66525ad932faa693a647e3f.jpg"
                alt="Dashboard overview"
              />
            ),
            title: "Dashboard",
            description: "This tour takes 30 seconds.",
          },
          {
            id: "step-2",
            type: "anchor",
            size: "small",
            anchorRef: dashboardRef,
            title: "Dashboard",
            description: "This tour takes 30 seconds.",
            image: (
              <img
                src="https://thefunnybeaver.com/wp-content/uploads/2019/11/funny-grey-blep.jpg"
                alt="Dashboard overview"
              />
            ),
          },
          {
            id: "step-3",
            type: "anchor",
            anchorRef: settingsRef,
            placement: "left",
            allowToEndTour: true,
            width: "small",
            title: "Settings",
            description: "This tour takes 30 seconds.",
            /*image: (
              <img
                src="https://i.pinimg.com/originals/b3/ee/c0/b3eec03459b57860fe1f898b7584683b.jpg"
                alt="Settings overview"
              />
            ),*/
          },
        ]}
      >
        <Coach.Mark>
          <Button /*ref={dashboardRef}*/>Dashboard</Button>
        </Coach.Mark>
      </Coach>
      <HStack justify="end" width="100%">
        <Button ref={settingsRef}>Settings</Button>
      </HStack>
    </VStack>
  );
};

export const SizeAndWidth: StoryObj<typeof Coach> = {
  render: (props) => {
    const buttonRef = useRef(null);
    return (
      <Coach
        steps={[
          {
            id: "render_step",
            type: "dialog",
            title: "This is a title",
            description: "This is some text",
            width: props.width,
            size: props.size,
          },
          {
            id: "render_step_2",
            type: "anchor",
            anchorRef: buttonRef,
            title: "This is a title",
            width: props.width,
            size: props.size,
            description: "This is some text",
            image: (
              <img
                src="https://i.ytimg.com/vi/1M_oZgVBknw/maxresdefault.jpg"
                alt="Render step overview"
              />
            ),
          },
        ]}
      >
        <Coach.Mark>
          <Button ref={buttonRef}>Button</Button>
        </Coach.Mark>
      </Coach>
    );
  },
  args: {
    size: "medium",
    width: "medium",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
    },
    width: {
      control: { type: "select" },
      options: ["small", "medium"],
    },
  },
};

export const RenderStep: StoryFn<typeof Coach> = () => {
  return (
    <VStack padding="space-40" gap="space-64">
      <Coach
        showTour={true}
        renderStep={(step, context) => {
          if (context.index === 0) {
            return context.defaultContent;
          }
          return (
            <Coach.Step>
              <Coach.Title>{step.title}</Coach.Title>
              <Coach.Image>{step.image}</Coach.Image>
              <Coach.Progress />
              <Coach.Description>{step.description}</Coach.Description>
              <Coach.Footer>
                <Coach.PreviousTrigger>
                  <Button variant="secondary">Forrige</Button>
                </Coach.PreviousTrigger>
                <Coach.CloseTrigger>
                  <Button>Lukk</Button>
                </Coach.CloseTrigger>
              </Coach.Footer>
            </Coach.Step>
          );
        }}
        steps={[
          {
            id: "render_step",
            type: "dialog",
            title: "Normal step",
            description: "This step demonstrates standard step.",
          },
          {
            id: "render_step_2",
            type: "dialog",
            title: "Render Step",
            description: "This step demonstrates custom renderStep.",
            image: (
              <img
                src="https://i.ytimg.com/vi/1M_oZgVBknw/maxresdefault.jpg"
                alt="Render step overview"
              />
            ),
          },
        ]}
      />
    </VStack>
  );
};

export const Mark: StoryObj<typeof CoachMark> = {
  render: (props) => {
    const [selected, setSelected] = useState(["Nittedal", "Arendal"]);
    const options = [
      "Lillehammer",
      "Nittedal",
      "Enebakk",
      "Hamar",
      "Arendal",
      "Gjøvik",
    ];

    return (
      <VStack padding="space-40" gap="space-64">
        <Coach type="dialog" title="Explore the page">
          <Coach.Mark offset={props.offset}>
            <ToggleGroup defaultValue="lest" onChange={console.info}>
              <ToggleGroup.Item
                value="ulest"
                icon={<EnvelopeClosedIcon aria-hidden />}
                label="Ulest"
              />
              <ToggleGroup.Item
                value="lest"
                icon={<EnvelopeOpenIcon aria-hidden />}
                label="Lest"
              />
              <ToggleGroup.Item
                value="sendt"
                icon={<PaperplaneIcon aria-hidden />}
                label="Sendt"
              />
            </ToggleGroup>
          </Coach.Mark>
          <Coach.Mark offset={props.offset}>
            <Button onClick={() => console.log("Button clicked")}>
              Click me
            </Button>
          </Coach.Mark>
          <Coach.Mark offset={props.offset}>
            <Chips>
              {options.map((option) => (
                <Chips.Toggle
                  key={option}
                  selected={selected.includes(option)}
                  onClick={() =>
                    setSelected(
                      selected.includes(option)
                        ? selected.filter((x) => x !== option)
                        : [...selected, option],
                    )
                  }
                >
                  {option}
                </Chips.Toggle>
              ))}
            </Chips>
          </Coach.Mark>
          <Coach.Mark offset={props.offset}>
            <GuidePanel>
              Saksbehandlingstiden varierer fra kommune til kommune. Hvis det
              går mer enn X måneder siden du søkte, skal du få brev om at
              saksbehandlingstiden er forlenget.
            </GuidePanel>
          </Coach.Mark>
          <Coach.Mark
            onClick={() => console.log("Coach dot clicked")}
            offset={props.offset}
          >
            <ExpansionCard aria-label="Demo med bare tittel">
              <ExpansionCard.Header>
                <ExpansionCard.Title>
                  Utbetaling av sykepenger
                </ExpansionCard.Title>
              </ExpansionCard.Header>
              <ExpansionCard.Content>
                <p>Her er innholdet i ekspansjonskortet.</p>
              </ExpansionCard.Content>
            </ExpansionCard>
          </Coach.Mark>
          <Coach.Mark offset={props.offset}>
            <InfoCard data-color="info">
              <InfoCard.Header>
                <InfoCard.Title>Fremhevet informasjon</InfoCard.Title>
              </InfoCard.Header>
              <InfoCard.Content>
                InfoCard brukes for å fremheve informasjon på en side, uten at
                det er like kritisk som en alert.
              </InfoCard.Content>
            </InfoCard>
          </Coach.Mark>
          <Coach.Mark data-color="success" />
        </Coach>
      </VStack>
    );
  },
  args: {
    offset: "space-16",
  },
};

export const Translations: StoryFn<typeof Coach> = () => {
  const translations = {
    Coach: {
      currentStep: "{current}/{total}",
      next: "Next",
      previous: "Previous",
      close: "Close",
    },
  };
  return (
    <Provider locale={en} translations={translations}>
      <Coach
        showTour={true}
        steps={[
          {
            id: "progress_translation",
            type: "dialog",
            title: "Progress Translations",
            description: "This step demonstrates translations.",
          },
          {
            id: "progress_translation_2",
            type: "dialog",
            title: "Translation Test",
            description: "See the translation above and on the buttons.",
          },
        ]}
      />
    </Provider>
  );
};

export const SingleStepAnchor: StoryFn<typeof Coach> = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <Coach
      showTour={open}
      onShowTourChange={setOpen}
      type="anchor"
      anchorRef={buttonRef}
      title="Enkeltsteg"
      description="Dette er en enkeltstående coachmark uten steps-prop."
    >
      <Coach.Mark>
        <Button ref={buttonRef} onClick={() => setOpen((prev) => !prev)}>
          Feature
        </Button>
      </Coach.Mark>
    </Coach>
  );
};

export const SingleStepRenderStep: StoryFn<typeof Coach> = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Coach
      type="anchor"
      anchorRef={buttonRef}
      title="Opprett ny"
      description="Standardtekst som kan brukes eller overstyres."
      renderStep={({ title, description }) => (
        <Coach.Step>
          <Coach.Title>{title}</Coach.Title>
          <Coach.Description>{description}</Coach.Description>
          <BodyShort>Egendefinert innhold her!</BodyShort>
          <Coach.Footer>
            <Coach.CloseTrigger>
              <Button size="medium" variant="primary">
                Forstått
              </Button>
            </Coach.CloseTrigger>
          </Coach.Footer>
        </Coach.Step>
      )}
    >
      <Coach.Mark>
        <Button ref={buttonRef}>Feature</Button>
      </Coach.Mark>
    </Coach>
  );
};

export const CoachControlled: StoryFn<typeof Coach> = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setOpen((prev) => !prev)}>
        Toggle tour
      </Button>
      <Coach
        showTour={open}
        onShowTourChange={setOpen}
        type="anchor"
        anchorRef={buttonRef}
        title="Kontrollert coach"
        description="Denne coachen styres av state."
      />
    </>
  );
};
