import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import React, { useRef, useState } from "react";
import { ExternalLinkIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { Link } from "../link";
import { HStack, VStack } from "../primitives/stack";
import { Provider } from "../provider";
import { BodyShort, Heading } from "../typography";
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
      <div style={{ width: "500px", minHeight: "100vh" }}>
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
        tourStarted={open}
        endTour={() => setOpen(false)}
        steps={[
          {
            id: "step-1",
            type: "anchor",
            anchorRef: createRef,
            content: (
              <Coach.Content>
                <Coach.Title>Create</Coach.Title>
                <Coach.Progress />
                <Coach.Description>
                  Start by creating a new item.
                </Coach.Description>
                <Coach.Footer>
                  <Coach.NextTrigger>
                    <Button size="small">Next</Button>
                  </Coach.NextTrigger>
                </Coach.Footer>
              </Coach.Content>
            ),
          },
          {
            id: "step-2",
            type: "anchor",
            anchorRef: reviewRef,
            placement: "bottom-start",
            content: (
              <Coach.Content>
                <Coach.Title>Review</Coach.Title>
                <Coach.Progress />
                <Coach.Description>
                  Review your item before submitting it.
                </Coach.Description>
                <Coach.Footer>
                  <Coach.CloseTrigger>
                    <Button size="small">Close</Button>
                  </Coach.CloseTrigger>
                </Coach.Footer>
              </Coach.Content>
            ),
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
        tourStarted={open}
        endTour={() => setOpen(false)}
        steps={[
          {
            id: "step-1",
            type: "dialog",
            content: (
              <Coach.Content>
                <Coach.Title>Welcome</Coach.Title>
                <Coach.Progress />
                <Coach.Description>
                  Welcome to the new experience.
                </Coach.Description>
                <Coach.Footer>
                  <Coach.NextTrigger>
                    <Button size="small">Next</Button>
                  </Coach.NextTrigger>
                </Coach.Footer>
              </Coach.Content>
            ),
          },
          {
            id: "step-2",
            type: "dialog",
            content: (
              <Coach.Content>
                <Coach.Title>Changes</Coach.Title>
                <Coach.Progress />
                <Coach.Description>
                  Here is what changed since last time.
                </Coach.Description>
                <Coach.Footer>
                  <Coach.CloseTrigger>
                    <Button size="small">Close</Button>
                  </Coach.CloseTrigger>
                </Coach.Footer>
              </Coach.Content>
            ),
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
      height="1000px"
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
        tourStarted={open}
        endTour={() => {
          setOpen(false);
        }}
        steps={[
          {
            id: "step-1",
            type: "dialog",
            content: (
              <Coach.Content>
                <Coach.Image>
                  <img
                    src="https://i.pinimg.com/originals/59/54/b4/5954b408c66525ad932faa693a647e3f.jpg"
                    alt="Dashboard overview"
                  />
                </Coach.Image>
                <Coach.Progress />
                <Coach.Title>
                  <Heading size="large">Dashboard</Heading>
                </Coach.Title>
                <Coach.Description>
                  This tour takes 30 seconds.
                </Coach.Description>
                <Coach.Footer>
                  <Coach.NextTrigger>
                    <Button size="small">Next</Button>
                  </Coach.NextTrigger>
                </Coach.Footer>
              </Coach.Content>
            ),
          },
          {
            id: "step-2",
            type: "anchor",
            anchorRef: dashboardRef,
            content: (
              <Coach.Content>
                <Coach.Image>
                  <img
                    src="https://i.pinimg.com/originals/59/54/b4/5954b408c66525ad932faa693a647e3f.jpg"
                    alt="Dashboard overview"
                  />
                </Coach.Image>
                <Coach.Progress />
                <Coach.Title>
                  <Heading size="small">Dashboard</Heading>
                </Coach.Title>
                <Coach.Description>
                  <HStack gap="space-4">
                    <BodyShort>This is your dashboard overview.</BodyShort>
                    <Link href="#">
                      Learn more
                      <ExternalLinkIcon title="External link" />
                    </Link>
                  </HStack>
                </Coach.Description>
                <Coach.Footer>
                  <Coach.PreviousTrigger>
                    <Button size="small" variant="secondary">
                      Back
                    </Button>
                  </Coach.PreviousTrigger>
                  <Coach.NextTrigger id="step-2-next">
                    <Button size="small">Next</Button>
                  </Coach.NextTrigger>
                </Coach.Footer>
              </Coach.Content>
            ),
          },
          {
            id: "step-3",
            type: "anchor",
            anchorRef: settingsRef,
            placement: "left",
            allowToEndTour: true,
            content: (
              <Coach.Content>
                <Coach.Image>
                  <img
                    src="https://i.pinimg.com/originals/b3/ee/c0/b3eec03459b57860fe1f898b7584683b.jpg"
                    alt="Settings overview"
                  />
                </Coach.Image>
                <Coach.Progress />
                <Coach.Title>
                  <Heading size="small">Settings</Heading>
                </Coach.Title>
                <Coach.Description>
                  <BodyShort>This is your settings overview.</BodyShort>
                </Coach.Description>
                <Coach.Footer>
                  <Coach.PreviousTrigger>
                    <Button size="small" variant="secondary">
                      Back
                    </Button>
                  </Coach.PreviousTrigger>
                  <Coach.CloseTrigger>
                    <Button size="small">Close</Button>
                  </Coach.CloseTrigger>
                </Coach.Footer>
              </Coach.Content>
            ),
          },
        ]}
      />
    </VStack>
  );
};

export const Mark: StoryObj<typeof CoachMark> = {
  render: (props) => {
    const { durationInMs, animation } = props;
    return (
      <VStack padding="space-40" gap="space-64">
        <Coach.Mark
          animation={animation}
          durationInMs={durationInMs}
          onClick={() => console.log("Coach dot clicked")}
        >
          <Button onClick={() => console.log("Button clicked")}>
            {`Animation ${animation.toLocaleLowerCase()}`}
          </Button>
        </Coach.Mark>
        <HStack gap="space-16" align="center">
          <BodyShort>{`Animation ${animation.toLocaleLowerCase()}:`}</BodyShort>
          <Coach.Mark
            animation={animation}
            durationInMs={durationInMs}
            data-color="success"
            onClick={() => console.log("Coach dot clicked")}
          />
        </HStack>
      </VStack>
    );
  },
  args: {
    durationInMs: 4000,
    animation: "ONE",
  },
  argTypes: {
    durationInMs: {
      control: { type: "number" },
    },
    animation: {
      control: { type: "select" },
      options: ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT"],
    },
  },
};

export const ProgressTranslations: StoryFn<typeof Coach> = () => {
  const translations = {
    CoachProgress: {
      currentStep: "{current}/{total}",
    },
  };
  return (
    <Provider locale={en} translations={translations}>
      <Coach
        tourStarted={true}
        endTour={() => {}}
        steps={[
          {
            id: "progress_translation",
            type: "dialog",
            content: (
              <Coach.Content>
                <Coach.Progress />
                <Coach.Title>Coach title</Coach.Title>
                <Coach.Description>Coach description</Coach.Description>
              </Coach.Content>
            ),
          },
        ]}
      />
    </Provider>
  );
};
