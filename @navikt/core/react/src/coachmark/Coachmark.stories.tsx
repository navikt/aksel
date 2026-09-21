import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import React, { useRef, useState } from "react";
import { ExternalLinkIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { Link } from "../link";
import { HStack, VStack } from "../primitives/stack";
import { BodyShort, Heading } from "../typography";
import { Coachmark, type CoachmarkDot } from "./root/CoachmarkRoot";

export default {
  title: "ds-react/Coachmark",
  component: Coachmark,
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
} satisfies Meta<typeof Coachmark>;

export const CoachmarkAnchor: StoryFn<typeof Coachmark> = () => {
  const createRef = useRef<HTMLButtonElement>(null);
  const reviewRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <HStack gap="space-16">
      <Button onClick={() => setOpen(true)}>Start tour</Button>
      <Button ref={createRef}>Create</Button>
      <Button ref={reviewRef}>Review</Button>
      <Coachmark
        tourStarted={open}
        endTour={() => setOpen(false)}
        steps={[
          {
            id: "step-1",
            type: "anchor",
            anchorRef: createRef,
            content: (
              <Coachmark.Content>
                <Coachmark.Title>Create</Coachmark.Title>
                <Coachmark.Progress />
                <Coachmark.Description>
                  Start by creating a new item.
                </Coachmark.Description>
                <Coachmark.Footer>
                  <Coachmark.NextTrigger>
                    <Button size="small">Next</Button>
                  </Coachmark.NextTrigger>
                </Coachmark.Footer>
              </Coachmark.Content>
            ),
          },
          {
            id: "step-2",
            type: "anchor",
            anchorRef: reviewRef,
            placement: "bottom-start",
            content: (
              <Coachmark.Content>
                <Coachmark.Title>Review</Coachmark.Title>
                <Coachmark.Progress />
                <Coachmark.Description>
                  Review your item before submitting it.
                </Coachmark.Description>
                <Coachmark.Footer>
                  <Coachmark.CloseTrigger>
                    <Button size="small">Close</Button>
                  </Coachmark.CloseTrigger>
                </Coachmark.Footer>
              </Coachmark.Content>
            ),
          },
        ]}
      />
    </HStack>
  );
};

export const CoachmarkDialog: StoryFn<typeof Coachmark> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Start tour</Button>
      <Coachmark
        tourStarted={open}
        endTour={() => setOpen(false)}
        steps={[
          {
            id: "step-1",
            type: "dialog",
            content: (
              <Coachmark.Content>
                <Coachmark.Title>Welcome</Coachmark.Title>
                <Coachmark.Progress />
                <Coachmark.Description>
                  Welcome to the new experience.
                </Coachmark.Description>
                <Coachmark.Footer>
                  <Coachmark.NextTrigger>
                    <Button size="small">Next</Button>
                  </Coachmark.NextTrigger>
                </Coachmark.Footer>
              </Coachmark.Content>
            ),
          },
          {
            id: "step-2",
            type: "dialog",
            content: (
              <Coachmark.Content>
                <Coachmark.Title>Changes</Coachmark.Title>
                <Coachmark.Progress />
                <Coachmark.Description>
                  Here is what changed since last time.
                </Coachmark.Description>
                <Coachmark.Footer>
                  <Coachmark.CloseTrigger>
                    <Button size="small">Close</Button>
                  </Coachmark.CloseTrigger>
                </Coachmark.Footer>
              </Coachmark.Content>
            ),
          },
        ]}
      />
    </>
  );
};

export const CoachmarkMixed: StoryFn<typeof Coachmark> = () => {
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
      <Coachmark
        tourStarted={open}
        endTour={() => {
          setOpen(false);
        }}
        /*
        title: "Welcome",
        ! nextButton: <Button>Next</Button>,
        renderStep: (step) => <div>{step.content}</div>, 

        skipTourButton: boolean
        We render buttons for navigation and closing the tour.

        Discuss with design closing behavior for the tour - allow not closing or not?
        Coachmark - best word?
        Add support for one step "tour"
        */
        steps={[
          {
            id: "step-1",
            type: "dialog",
            content: (
              <Coachmark.Content>
                <Coachmark.Image>
                  <img
                    src="https://i.pinimg.com/originals/59/54/b4/5954b408c66525ad932faa693a647e3f.jpg"
                    alt="Dashboard overview"
                  />
                </Coachmark.Image>
                <Coachmark.Progress />
                <Coachmark.Title>
                  <Heading size="large">Dashboard</Heading>
                </Coachmark.Title>
                <Coachmark.Description>
                  This tour takes 30 seconds.
                </Coachmark.Description>
                <Coachmark.Footer>
                  <Coachmark.NextTrigger>
                    <Button size="small">Next</Button>
                  </Coachmark.NextTrigger>
                </Coachmark.Footer>
              </Coachmark.Content>
            ),
          },
          {
            id: "step-2",
            type: "anchor",
            anchorRef: dashboardRef,
            content: (
              <Coachmark.Content>
                <Coachmark.Image>
                  <img
                    src="https://i.pinimg.com/originals/59/54/b4/5954b408c66525ad932faa693a647e3f.jpg"
                    alt="Dashboard overview"
                  />
                </Coachmark.Image>
                <Coachmark.Progress />
                <Coachmark.Title>
                  <Heading size="small">Dashboard</Heading>
                </Coachmark.Title>
                <Coachmark.Description>
                  <HStack gap="space-4">
                    <BodyShort>This is your dashboard overview.</BodyShort>
                    <Link href="#">
                      Learn more
                      <ExternalLinkIcon title="External link" />
                    </Link>
                  </HStack>
                </Coachmark.Description>
                <Coachmark.Footer>
                  <Coachmark.PreviousTrigger>
                    <Button size="small" variant="secondary">
                      Back
                    </Button>
                  </Coachmark.PreviousTrigger>
                  <Coachmark.NextTrigger id="step-2-next">
                    <Button size="small">Next</Button>
                  </Coachmark.NextTrigger>
                </Coachmark.Footer>
              </Coachmark.Content>
            ),
          },
          {
            id: "step-3",
            type: "anchor",
            anchorRef: settingsRef,
            placement: "left",
            allowToEndTour: true,
            content: (
              <Coachmark.Content>
                <Coachmark.Image>
                  <img
                    src="https://i.pinimg.com/originals/b3/ee/c0/b3eec03459b57860fe1f898b7584683b.jpg"
                    alt="Settings overview"
                  />
                </Coachmark.Image>
                <Coachmark.Progress />
                <Coachmark.Title>
                  <Heading size="small">Settings</Heading>
                </Coachmark.Title>
                <Coachmark.Description>
                  <BodyShort>This is your settings overview.</BodyShort>
                </Coachmark.Description>
                <Coachmark.Footer>
                  <Coachmark.PreviousTrigger>
                    <Button size="small" variant="secondary">
                      Back
                    </Button>
                  </Coachmark.PreviousTrigger>
                  <Coachmark.CloseTrigger>
                    <Button size="small">Close</Button>
                  </Coachmark.CloseTrigger>
                </Coachmark.Footer>
              </Coachmark.Content>
            ),
          },
        ]}
      />
    </VStack>
  );
};

export const Dot: StoryObj<typeof CoachmarkDot> = {
  render: (props) => {
    const { durationInMs } = props;
    const animations = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX"];
    /* TODO:
     * - Set data-color only for dot?
     */
    return (
      <VStack padding="space-40" gap="space-64">
        {animations.map((animation) => (
          <Coachmark.Dot
            key={animation}
            animation={animation}
            durationInMs={durationInMs}
            data-color="danger"
            onClick={() => console.log("Coachmark dot clicked")}
          >
            <Button
              data-color="accent"
              onClick={() => console.log("Button clicked")}
            >
              {`Animation ${animation.toLocaleLowerCase()}`}
            </Button>
          </Coachmark.Dot>
        ))}
        {animations.map((animation) => (
          <HStack gap="space-16" key={animation} align="center">
            <BodyShort>{`Animation ${animation.toLocaleLowerCase()}:`}</BodyShort>
            <Coachmark.Dot
              animation={animation}
              durationInMs={durationInMs}
              data-color="success"
              onClick={() => console.log("Coachmark dot clicked")}
            />
          </HStack>
        ))}
      </VStack>
    );
  },
  args: {
    durationInMs: 4000,
  },
  argTypes: {
    durationInMs: {
      control: { type: "number" },
    },
  },
};
