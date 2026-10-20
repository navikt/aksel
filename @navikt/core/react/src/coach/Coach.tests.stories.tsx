import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useRef, useState } from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../button";
import { Provider } from "../provider";
import { Coach } from "./index";
import type {
  CoachProps,
  CoachSingleStepProps,
  CoachStepItem,
  CoachTourProps,
} from "./types";

const meta = {
  title: "ds-react/Coach/Tests",
  component: Coach,
  parameters: {
    chromatic: { disable: true },
  },
  decorators: [
    (Story) => {
      const [container, setContainer] = useState<HTMLDivElement | null>(null);
      return (
        <Provider rootElement={container ?? undefined}>
          <Story />
          <div ref={setContainer} />
        </Provider>
      );
    },
  ],
  beforeEach: () => {
    globalThis.AKSEL_NO_EXIT_ANIMATIONS = true;
    return () => {
      globalThis.AKSEL_NO_EXIT_ANIMATIONS = false;
    };
  },
} satisfies Meta<typeof Coach>;

export default meta;
type Story = StoryObj<CoachTourProps>;
type SingleStepStory = StoryObj<
  Extract<CoachSingleStepProps, { type: "dialog" }>
>;

const translations = {
  next: "Next",
  previous: "Previous",
  close: "Close",
};

const dialogSteps: CoachStepItem[] = [
  { id: "welcome", type: "dialog", title: "Welcome" },
  { id: "features", type: "dialog", title: "Features" },
  { id: "finished", type: "dialog", title: "Finished", allowToEndTour: true },
];

function Tour({
  controlled = false,
  ...props
}: CoachProps & { controlled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(props.defaultStep ?? 0);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Start tour</Button>
      <Coach
        {...props}
        showTour={open}
        translations={translations}
        currentStep={controlled ? step : props.currentStep}
        onStepChange={(nextStep) => {
          if (controlled) {
            setStep(nextStep);
          }
          props.onStepChange?.(nextStep);
        }}
        endTour={() => {
          setOpen(false);
          props.endTour();
        }}
      />
    </>
  );
}

function expectLabelledByTitle(popup: HTMLElement, title: string) {
  expect(popup).toHaveAttribute(
    "aria-labelledby",
    within(popup).getByRole("heading", { name: title }).id,
  );
}

export const UncontrolledNavigation: Story = {
  args: {
    showTour: false,
    endTour: fn(),
    onStepChange: fn(),
    steps: dialogSteps,
  },
  render: (args) => <Tour {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));

    const first = await canvas.findByRole("dialog", { name: "Welcome" });
    expectLabelledByTitle(first, "Welcome");
    expect(within(first).getByText("1 av 3")).toBeVisible();
    expect(
      within(first).queryByRole("button", { name: "Previous" }),
    ).toBeNull();
    await waitFor(() =>
      expect(within(first).getByRole("button", { name: "Next" })).toHaveFocus(),
    );
    await userEvent.click(within(first).getByRole("button", { name: "Next" }));

    const second = await canvas.findByRole("dialog", { name: "Features" });
    expectLabelledByTitle(second, "Features");
    expect(within(second).getByText("2 av 3")).toBeVisible();
    await userEvent.click(
      within(second).getByRole("button", { name: "Previous" }),
    );
    await canvas.findByRole("dialog", { name: "Welcome" });
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");

    const last = await canvas.findByRole("dialog", { name: "Finished" });
    expect(within(last).queryByRole("button", { name: "Next" })).toBeNull();
    const closeButtons = within(last).getAllByRole("button", { name: "Close" });
    await userEvent.click(closeButtons[closeButtons.length - 1]);
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
    expect(args.onStepChange).toHaveBeenNthCalledWith(1, 1);
    expect(args.onStepChange).toHaveBeenNthCalledWith(2, 0);
    expect(args.endTour).toHaveBeenCalledTimes(1);

    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    await canvas.findByRole("dialog", { name: "Welcome" });
  },
};

export const ControlledNavigation: Story = {
  args: {
    showTour: false,
    endTour: fn(),
    onStepChange: fn(),
    steps: dialogSteps,
    defaultStep: 1,
  },
  render: (args) => <Tour {...args} controlled />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    const second = await canvas.findByRole("dialog", { name: "Features" });
    await userEvent.click(
      within(second).getByRole("button", { name: "Previous" }),
    );
    await canvas.findByRole("dialog", { name: "Welcome" });
    expect(args.onStepChange).toHaveBeenCalledWith(0);
  },
};

export const ControlledStepDoesNotAdvanceItself: Story = {
  args: {
    showTour: false,
    endTour: fn(),
    onStepChange: fn(),
    currentStep: 0,
    steps: dialogSteps,
  },
  render: (args) => <Tour {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    const popup = await canvas.findByRole("dialog", { name: "Welcome" });
    await userEvent.click(within(popup).getByRole("button", { name: "Next" }));
    expect(args.onStepChange).toHaveBeenCalledWith(1);
    expect(canvas.getByRole("dialog", { name: "Welcome" })).toBeVisible();
    expect(canvas.queryByRole("dialog", { name: "Features" })).toBeNull();
  },
};

export const DefaultStep: Story = {
  args: {
    showTour: false,
    endTour: fn(),
    steps: dialogSteps,
    defaultStep: 1,
  },
  render: (args) => <Tour {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    const second = await canvas.findByRole("dialog", { name: "Features" });
    expect(within(second).getByText("2 av 3")).toBeVisible();
    await userEvent.click(within(second).getByRole("button", { name: "Next" }));
    await canvas.findByRole("dialog", { name: "Finished" });
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());

    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    await canvas.findByRole("dialog", { name: "Features" });
  },
};

export const KeyboardNavigation: Story = {
  args: {
    showTour: false,
    endTour: fn(),
    onStepChange: fn(),
    steps: dialogSteps,
  },
  render: (args) => <Tour {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    await canvas.findByRole("dialog", { name: "Welcome" });
    await userEvent.keyboard("{ArrowLeft}{Escape}");
    expect(args.onStepChange).not.toHaveBeenCalled();
    expect(args.endTour).not.toHaveBeenCalled();
    expect(canvas.getByRole("dialog", { name: "Welcome" })).toBeVisible();

    await userEvent.keyboard("{ArrowRight}");
    await canvas.findByRole("dialog", { name: "Features" });
    await userEvent.keyboard("{ArrowLeft}");
    await canvas.findByRole("dialog", { name: "Welcome" });
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");
    await canvas.findByRole("dialog", { name: "Finished" });
    await userEvent.keyboard("{ArrowRight}");
    expect(args.endTour).not.toHaveBeenCalled();

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
    expect(args.endTour).toHaveBeenCalledTimes(1);
    expect(args.onStepChange).toHaveBeenCalledTimes(4);
    await userEvent.keyboard("{ArrowRight}{Escape}");
    expect(args.onStepChange).toHaveBeenCalledTimes(4);
    expect(args.endTour).toHaveBeenCalledTimes(1);
  },
};

export const MixedSteps: StoryObj = {
  render: () => {
    const firstRef = useRef<HTMLButtonElement>(null);
    const secondRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={firstRef}>First target</Button>
        <Button ref={secondRef}>Second target</Button>
        <Tour
          showTour={false}
          endTour={fn()}
          steps={[
            dialogSteps[0],
            {
              id: "first-anchor",
              type: "anchor",
              anchorRef: firstRef,
              title: "First anchor",
            },
            {
              id: "second-anchor",
              type: "anchor",
              anchorRef: secondRef,
              title: "Second anchor",
              allowToEndTour: true,
            },
            dialogSteps[2],
          ]}
        />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    const first = await canvas.findByRole("dialog", { name: "Welcome" });
    await userEvent.click(within(first).getByRole("button", { name: "Next" }));

    const anchor = await canvas.findByRole("dialog", { name: "First anchor" });
    expectLabelledByTitle(anchor, "First anchor");
    expect(canvas.queryByRole("button", { name: "First target" })).toBeNull();
    await userEvent.keyboard("{Escape}");
    expect(canvas.getByRole("dialog", { name: "First anchor" })).toBeVisible();
    await userEvent.click(within(anchor).getByRole("button", { name: "Next" }));
    const second = await canvas.findByRole("dialog", { name: "Second anchor" });
    expectLabelledByTitle(second, "Second anchor");
    await userEvent.tab();
    expect(second.contains(document.activeElement)).toBe(true);
    await userEvent.tab({ shift: true });
    expect(second.contains(document.activeElement)).toBe(true);
    await userEvent.click(within(second).getByRole("button", { name: "Next" }));
    const last = await canvas.findByRole("dialog", { name: "Finished" });
    await userEvent.click(
      within(last).getByRole("button", { name: "Previous" }),
    );
    await canvas.findByRole("dialog", { name: "Second anchor" });
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
  },
};

export const OverrideOneStep: Story = {
  args: {
    showTour: false,
    endTour: fn(),
    steps: dialogSteps,
    renderStep: (step, { index }) => {
      if (step.id !== "features") {
        return undefined;
      }
      return (
        <Coach.Step>
          <Coach.Title id="custom-step-title">Custom {step.title}</Coach.Title>
          <Coach.Description>
            Custom layout for step {index + 1}
          </Coach.Description>
          <Coach.Progress />
          <Coach.Footer>
            <Coach.PreviousTrigger>
              <Button>Go back</Button>
            </Coach.PreviousTrigger>
            <Coach.NextTrigger>
              <Button>Continue</Button>
            </Coach.NextTrigger>
          </Coach.Footer>
        </Coach.Step>
      );
    },
  },
  render: (args) => <Tour {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    const first = await canvas.findByRole("dialog", { name: "Welcome" });
    await userEvent.click(within(first).getByRole("button", { name: "Next" }));
    const custom = await canvas.findByRole("dialog", {
      name: "Custom Features",
    });
    expect(custom).toHaveAttribute("aria-labelledby", "custom-step-title");
    expect(within(custom).getByText("Custom layout for step 2")).toBeVisible();
    expect(within(custom).getByText("2 av 3")).toBeVisible();
    await userEvent.click(
      within(custom).getByRole("button", { name: "Continue" }),
    );
    await canvas.findByRole("dialog", { name: "Finished" });
  },
};

export const SingleStep: SingleStepStory = {
  args: {
    type: "dialog",
    title: "Announcement",
    description: "A single step without a steps prop",
    showTour: false,
    endTour: fn(),
  },
  render: (args) => <Tour {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    const popup = await canvas.findByRole("dialog", { name: "Announcement" });
    expectLabelledByTitle(popup, "Announcement");
    expect(
      within(popup).getByText("A single step without a steps prop"),
    ).toBeVisible();
    expect(within(popup).queryByText(/av 1/)).toBeNull();
    expect(within(popup).queryByRole("button", { name: "Next" })).toBeNull();
    expect(
      within(popup).queryByRole("button", { name: "Previous" }),
    ).toBeNull();
    const closeButtons = within(popup).getAllByRole("button", {
      name: "Close",
    });
    await waitFor(() =>
      expect(closeButtons[closeButtons.length - 1]).toHaveFocus(),
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
    expect(args.endTour).toHaveBeenCalledTimes(1);
  },
};

export const SingleStepFunctionChildren: SingleStepStory = {
  args: {
    type: "dialog",
    title: "Default title",
    description: "Default description",
    image: <svg role="img" aria-label="Illustration" />,
    showTour: false,
    endTour: fn(),
    children: ({ title, description, image, defaultContent }) => (
      <>
        <p>Before default content</p>
        {defaultContent}
        <p>
          Received: {title}, {description}
        </p>
        {image}
      </>
    ),
  },
  render: (args) => <Tour {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    const popup = await canvas.findByRole("dialog", { name: "Default title" });
    expect(within(popup).getByText("Before default content")).toBeVisible();
    expect(
      within(popup).getByText("Received: Default title, Default description"),
    ).toBeVisible();
    expect(
      within(popup).getAllByRole("img", { name: "Illustration" }),
    ).toHaveLength(2);
  },
};

export const SingleAnchorWithCustomChildren: StoryObj = {
  render: () => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={anchorRef}>Target</Button>
        <Tour
          showTour={false}
          endTour={fn()}
          type="anchor"
          anchorRef={anchorRef}
          title="Unused title"
          aria-labelledby="custom-anchor-label"
        >
          <Coach.Title>Custom title</Coach.Title>
          <Coach.Description id="custom-anchor-label">
            Custom accessible name
          </Coach.Description>
          <Coach.Footer>
            <Coach.CloseTrigger>
              <Button>Done</Button>
            </Coach.CloseTrigger>
          </Coach.Footer>
        </Tour>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    const popup = await canvas.findByRole("dialog", {
      name: "Custom accessible name",
    });
    expect(
      within(popup).getByRole("heading", { name: "Custom title" }),
    ).toBeVisible();
    expect(within(popup).queryByText("Unused title")).toBeNull();
    await userEvent.click(within(popup).getByRole("button", { name: "Done" }));
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
  },
};

export const Mark: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Coach.Mark aria-label="Show help" onClick={() => setOpen(true)}>
          <Button onClick={() => setOpen(false)}>Target action</Button>
        </Coach.Mark>
        <Coach
          type="dialog"
          title="Help"
          showTour={open}
          endTour={() => setOpen(false)}
        />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Target action" }),
    );
    expect(canvas.queryByRole("dialog")).toBeNull();
    await userEvent.click(canvas.getByRole("button", { name: "Show help" }));
    await canvas.findByRole("dialog", { name: "Help" });
  },
};
