import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import React, { useRef, useState } from "react";
import { Button } from "../button";
import { HStack, VStack } from "../primitives/stack";
import { Provider } from "../provider";
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
      <div style={{ width: "500px", minHeight: "5000px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Coach>;

export const CoachAnchor: StoryFn<typeof Coach> = () => {
  const createRef = useRef<HTMLButtonElement>(null);
  const reviewRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <HStack gap="space-16">
      <Button onClick={() => setOpen(true)}>Start tour</Button>
      <Button ref={createRef}>Create</Button>
      <Button ref={reviewRef}>Review</Button>
      <Coach
        showTour={open}
        endTour={() => setOpen(false)}
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
      />
    </HStack>
  );
};

export const CoachDialog: StoryFn<typeof Coach> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Start tour</Button>
      <Coach
        showTour={open}
        endTour={() => setOpen(false)}
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
      />
    </>
  );
};

export const CoachMixed: StoryFn<typeof Coach> = () => {
  const dashboardRef = useRef<HTMLButtonElement>(null);
  const settingsRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <VStack
      gap="space-16"
      align="start"
      justify="space-between"
      height="5000px"
    >
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Start tour
      </Button>
      <Button ref={dashboardRef}>Dashboard</Button>
      <HStack justify="end" width="100%">
        <Button ref={settingsRef}>Settings</Button>
      </HStack>
      <Coach
        showTour={open}
        endTour={() => {
          setOpen(false);
        }}
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
            allowToEndTour: true,
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
            image: (
              <img
                src="https://i.pinimg.com/originals/b3/ee/c0/b3eec03459b57860fe1f898b7584683b.jpg"
                alt="Settings overview"
              />
            ),
          },
        ]}
      />
    </VStack>
  );
};

export const SizeAndWidth: StoryObj<typeof Coach> = {
  render: (props) => {
    const buttonRef = useRef(null);
    const [showTour, setShowTour] = useState(false);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setShowTour(true)}>
          Click me
        </Button>
        <Coach
          showTour={showTour}
          endTour={() => setShowTour(false)}
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
        />
      </>
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

export const RenderStep: StoryFn<typeof CoachMark> = () => {
  return (
    <VStack padding="space-40" gap="space-64">
      <Coach
        showTour={true}
        endTour={() => {}}
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

export const Mark: StoryFn<typeof CoachMark> = () => {
  return (
    <VStack padding="space-40" gap="space-64">
      <Coach.Mark onClick={() => console.log("Coach dot clicked")}>
        <Button onClick={() => console.log("Button clicked")}>Button</Button>
      </Coach.Mark>
      <HStack gap="space-16" align="center">
        <Coach.Mark
          data-color="success"
          onClick={() => console.log("Coach dot clicked")}
        />
      </HStack>
    </VStack>
  );
};

export const ProgressTranslations: StoryFn<typeof Coach> = () => {
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
        endTour={() => {}}
        steps={[
          {
            id: "progress_translation",
            type: "dialog",
            title: "Progress Translations",
            description: "This step demonstrates progress translations.",
          },
          {
            id: "progress_translation_2",
            type: "dialog",
            title: "Translation Test",
            description: "See the progress translation above.",
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
    <HStack gap="space-16">
      <Button ref={buttonRef} onClick={() => setOpen((prev) => !prev)}>
        Toggle coach
      </Button>
      <Coach
        showTour={open}
        endTour={() => setOpen(false)}
        type="anchor"
        anchorRef={buttonRef}
        title="Enkeltsteg"
        description="Dette er en enkeltstående coachmark uten steps-prop."
      />
    </HStack>
  );
};

export const SingleStepCustomChildren: StoryFn<typeof Coach> = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <HStack gap="space-16">
      <Button ref={buttonRef} onClick={() => setOpen((prev) => !prev)}>
        Toggle custom coach
      </Button>
      <Coach
        showTour={open}
        endTour={() => setOpen(false)}
        type="anchor"
        anchorRef={buttonRef}
        title="Opprett ny"
        description="Standardtekst som kan brukes eller overstyres."
      >
        {({ title, description }) => (
          <Coach.Step>
            <Coach.Title>{title}</Coach.Title>
            <Coach.Description>{description}</Coach.Description>
            <p style={{ margin: "var(--ax-space-8) 0" }}>
              Egendefinert innhold her!
            </p>
            <Coach.Footer>
              <Coach.CloseTrigger>
                <Button size="medium" variant="primary">
                  Forstått
                </Button>
              </Coach.CloseTrigger>
            </Coach.Footer>
          </Coach.Step>
        )}
      </Coach>
    </HStack>
  );
};
