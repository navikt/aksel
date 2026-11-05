import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useRef, useState } from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../button";
import { Popover } from "../popover";
import { Portal } from "../portal";
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
  { id: "finished", type: "dialog", title: "Finished", allowCancelTour: true },
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
        onShowTourChange={(nextOpen) => {
          setOpen(nextOpen);
          props.onShowTourChange?.(nextOpen);
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
    onShowTourChange: fn(),
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
    expect(second).toBe(first);
    await waitFor(() =>
      expect(
        within(second).getByRole("button", { name: "Next" }),
      ).toHaveFocus(),
    );
    await userEvent.click(
      within(second).getByRole("button", { name: "Previous" }),
    );
    await canvas.findByRole("dialog", { name: "Welcome" });
    await waitFor(() =>
      expect(within(first).getByRole("button", { name: "Next" })).toHaveFocus(),
    );
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");

    const last = await canvas.findByRole("dialog", { name: "Finished" });
    expect(within(last).queryByRole("button", { name: "Next" })).toBeNull();
    const closeButtons = within(last).getAllByRole("button", { name: "Close" });
    await waitFor(() =>
      expect(closeButtons[closeButtons.length - 1]).toHaveFocus(),
    );
    await userEvent.click(
      within(last).getByRole("button", { name: "Previous" }),
    );
    await canvas.findByRole("dialog", { name: "Features" });
    await waitFor(() =>
      expect(
        within(second).getByRole("button", { name: "Next" }),
      ).toHaveFocus(),
    );
    await userEvent.keyboard("{ArrowRight}");
    await canvas.findByRole("dialog", { name: "Finished" });
    const finalCloseButtons = within(last).getAllByRole("button", {
      name: "Close",
    });
    await waitFor(() =>
      expect(finalCloseButtons[finalCloseButtons.length - 1]).toHaveFocus(),
    );
    await userEvent.click(finalCloseButtons[finalCloseButtons.length - 1]);
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
    expect(args.onStepChange).toHaveBeenNthCalledWith(1, 1);
    expect(args.onStepChange).toHaveBeenNthCalledWith(2, 0);
    expect(args.onShowTourChange).toHaveBeenCalledWith(false);

    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    await canvas.findByRole("dialog", { name: "Welcome" });
  },
};

export const ShrinkingSteps: Story = {
  args: {
    steps: dialogSteps,
  },
  render: () => {
    const [steps, setSteps] = useState(dialogSteps);
    return (
      <>
        <Button onClick={() => setSteps(dialogSteps)}>Restore steps</Button>
        <Coach
          showTour
          currentStep={1}
          steps={steps}
          renderStep={({ id }, { defaultContent }) => (
            <>
              {defaultContent}
              <p>{id.toUpperCase()}</p>
              <Button onClick={() => setSteps(dialogSteps.slice(0, 1))}>
                Remove active step
              </Button>
            </>
          )}
        />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const popup = await canvas.findByRole("dialog", { name: "Features" });
    expect(within(popup).getByText("FEATURES")).toBeVisible();
    await userEvent.click(
      within(popup).getByRole("button", { name: "Remove active step" }),
    );
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
    await userEvent.click(
      canvas.getByRole("button", { name: "Restore steps" }),
    );
    expect(
      await canvas.findByRole("dialog", { name: "Features" }),
    ).toBeVisible();
  },
};

export const ControlledNavigation: Story = {
  args: {
    showTour: false,
    onShowTourChange: fn(),
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
    onShowTourChange: fn(),
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
    onShowTourChange: fn(),
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
    onShowTourChange: fn(),
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
    expect(args.onShowTourChange).not.toHaveBeenCalled();
    expect(canvas.getByRole("dialog", { name: "Welcome" })).toBeVisible();

    await userEvent.keyboard("{ArrowRight}");
    await canvas.findByRole("dialog", { name: "Features" });
    await userEvent.keyboard("{ArrowLeft}");
    await canvas.findByRole("dialog", { name: "Welcome" });
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");
    await canvas.findByRole("dialog", { name: "Finished" });
    await userEvent.keyboard("{ArrowRight}");
    expect(args.onShowTourChange).not.toHaveBeenCalled();

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
    expect(args.onShowTourChange).toHaveBeenCalledWith(false);
    expect(args.onStepChange).toHaveBeenCalledTimes(4);
    await userEvent.keyboard("{ArrowRight}{Escape}");
    expect(args.onStepChange).toHaveBeenCalledTimes(4);
    expect(args.onShowTourChange).toHaveBeenCalledTimes(1);
  },
};

export const KeyboardNavigationInCustomContent: Story = {
  args: {
    showTour: false,
    onShowTourChange: fn(),
    onStepChange: fn(),
    steps: dialogSteps,
    renderStep: (_step, { defaultContent }) => (
      <>
        {defaultContent}
        <input aria-label="Name" defaultValue="Coach" />
        <textarea aria-label="Notes" defaultValue="Notes" />
        <select aria-label="Choice" defaultValue="first">
          <option value="first">First</option>
          <option value="second">Second</option>
        </select>
        {/* biome-ignore lint/a11y/useSemanticElements: Exercise a contenteditable editor rather than a native input. */}
        <div
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-label="Editor"
          tabIndex={0}
        >
          <span>Editable content</span>
        </div>
        <Button
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
            }
          }}
        >
          Handles arrows
        </Button>
      </>
    ),
  },
  render: (args) => <Tour {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    const first = await canvas.findByRole("dialog", { name: "Welcome" });
    const name = within(first).getByRole<HTMLInputElement>("textbox", {
      name: "Name",
    });
    await userEvent.click(name);
    await userEvent.keyboard("{End}{ArrowLeft}");
    expect(name.selectionStart).toBe(4);
    await userEvent.keyboard("{ArrowRight}");
    expect(name.selectionStart).toBe(5);

    for (const control of [
      within(first).getByRole("textbox", { name: "Notes" }),
      within(first).getByRole("combobox", { name: "Choice" }),
      within(first).getByRole("textbox", { name: "Editor" }),
      within(first).getByRole("button", { name: "Handles arrows" }),
    ]) {
      await userEvent.click(control);
      await userEvent.keyboard("{ArrowRight}{ArrowLeft}");
      expect(first).toHaveAccessibleName("Welcome");
    }

    const next = within(first).getByRole("button", { name: "Next" });
    await userEvent.click(
      within(first).getByRole("heading", { name: "Welcome" }),
    );
    next.focus();
    expect(next).toHaveFocus();
    await userEvent.keyboard(
      "{Shift>}{ArrowRight}{/Shift}{Control>}{ArrowRight}{/Control}{Alt>}{ArrowRight}{/Alt}{Meta>}{ArrowRight}{/Meta}",
    );
    expect(args.onStepChange).not.toHaveBeenCalled();

    await userEvent.keyboard("{ArrowRight}");
    const second = await canvas.findByRole("dialog", { name: "Features" });
    within(second).getByRole("button", { name: "Previous" }).focus();
    await userEvent.keyboard("{ArrowLeft}");
    await canvas.findByRole("dialog", { name: "Welcome" });
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");
    const last = await canvas.findByRole("dialog", { name: "Finished" });
    await userEvent.click(within(last).getByRole("textbox", { name: "Name" }));
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
    expect(args.onShowTourChange).toHaveBeenCalledWith(false);
  },
};

export const AnchorKeyboardNavigationInCustomContent: Story = {
  ...KeyboardNavigationInCustomContent,
  play: KeyboardNavigationInCustomContent.play,
  render: (args) => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={anchorRef}>Target</Button>
        <Tour
          {...args}
          steps={dialogSteps.map((step) => ({
            ...step,
            type: "anchor",
            anchorRef,
          }))}
        />
      </>
    );
  },
};

function NestedEscapeContent({ children }: { children: React.ReactNode }) {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      {children}
      <input
        aria-label="Handles Escape"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
          }
        }}
      />
      <Button ref={setAnchor} onClick={() => setOpen(true)}>
        Open nested help
      </Button>
      <Portal>
        <Popover anchorEl={anchor} open={open} onClose={() => setOpen(false)}>
          <Popover.Content>Nested help content</Popover.Content>
        </Popover>
      </Portal>
    </>
  );
}

export const NestedEscape: Story = {
  args: {
    showTour: false,
    onShowTourChange: fn(),
    steps: [dialogSteps[0], dialogSteps[2]],
    renderStep: (_step, { defaultContent }) => (
      <NestedEscapeContent>{defaultContent}</NestedEscapeContent>
    ),
  },
  render: (args) => <Tour {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));

    for (const title of ["Welcome", "Finished"]) {
      const popup = await canvas.findByRole("dialog", { name: title });
      await userEvent.click(
        within(popup).getByRole("button", { name: "Open nested help" }),
      );
      expect(await canvas.findByText("Nested help content")).toBeVisible();
      await userEvent.keyboard("{Escape}");
      await waitFor(() =>
        expect(canvas.queryByText("Nested help content")).not.toBeVisible(),
      );
      expect(popup).toBeVisible();
      expect(args.onShowTourChange).not.toHaveBeenCalled();

      await userEvent.click(
        within(popup).getByRole("textbox", { name: "Handles Escape" }),
      );
      await userEvent.keyboard("{Escape}");
      expect(popup).toBeVisible();
      expect(args.onShowTourChange).not.toHaveBeenCalled();

      // Move focus off the input without consuming Escape in its own handler.
      within(popup)
        .getByRole("button", {
          name: title === "Welcome" ? "Next" : "Previous",
        })
        .focus();
      await userEvent.keyboard("{Escape}");
      if (title === "Welcome") {
        expect(popup).toBeVisible();
        expect(args.onShowTourChange).not.toHaveBeenCalled();
        await userEvent.click(
          within(popup).getByRole("button", { name: "Next" }),
        );
      }
    }

    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
    expect(args.onShowTourChange).toHaveBeenCalledTimes(1);
    expect(args.onShowTourChange).toHaveBeenCalledWith(false);
  },
};

export const AnchorNestedEscape: Story = {
  ...NestedEscape,
  play: NestedEscape.play,
  render: (args) => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={anchorRef}>Target</Button>
        <Tour
          {...args}
          steps={[dialogSteps[0], dialogSteps[2]].map((step) => ({
            ...step,
            type: "anchor",
            anchorRef,
          }))}
        />
      </>
    );
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
          onShowTourChange={fn()}
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
              allowCancelTour: true,
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
    await waitFor(() =>
      expect(
        within(anchor).getByRole("button", { name: "Next" }),
      ).toHaveFocus(),
    );
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
    const closeButtons = within(last).getAllByRole("button", { name: "Close" });
    await waitFor(() =>
      expect(closeButtons[closeButtons.length - 1]).toHaveFocus(),
    );
    await userEvent.click(
      within(last).getByRole("button", { name: "Previous" }),
    );
    await canvas.findByRole("dialog", { name: "Second anchor" });
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
  },
};

export const SpotlightBackdrop: StoryObj = {
  render: () => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <section
          aria-label="Scrollable targets"
          style={{ height: 200, overflow: "auto" }}
        >
          <div style={{ height: 600, paddingTop: 80 }}>
            <Button ref={anchorRef}>Spotlight target</Button>
          </div>
        </section>
        <Tour type="anchor" anchorRef={anchorRef} title="Spotlight" />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const scroller = canvas.getByRole("region", { name: "Scrollable targets" });
    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    await canvas.findByRole("dialog", { name: "Spotlight" });
    const backdrop = canvasElement.querySelector<HTMLElement>(
      ".aksel-coach__backdrop",
    );
    if (!backdrop) {
      throw new Error("Expected a spotlight backdrop");
    }

    expect(backdrop.style.length).toBe(1);
    backdrop.style.setProperty("--ax-bg-overlay", "rgb(10, 20, 30)");
    expect(getComputedStyle(backdrop).backgroundColor).toBe("rgb(10, 20, 30)");
    expect(getComputedStyle(backdrop).position).toBe("fixed");
    expect(getComputedStyle(backdrop).pointerEvents).toBe("none");
    const initialClipPath = backdrop.style.clipPath;
    scroller.scrollTop = 40;
    await waitFor(() => {
      expect(scroller.scrollTop).toBe(40);
      expect(backdrop.style.clipPath).not.toBe(initialClipPath);
    });
    const bounds = backdrop.getBoundingClientRect();
    expect(bounds.top).toBe(0);
    expect(bounds.left).toBe(0);
    expect(bounds.width).toBe(document.documentElement.clientWidth);
    expect(bounds.height).toBeGreaterThanOrEqual(
      document.documentElement.clientHeight,
    );
  },
};

export const OverrideOneStep: Story = {
  args: {
    showTour: false,
    onShowTourChange: fn(),
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
    onShowTourChange: fn(),
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
    expect(args.onShowTourChange).toHaveBeenCalledWith(false);
  },
};

export const SingleStepRenderStep: SingleStepStory = {
  args: {
    type: "dialog",
    title: "Default title",
    description: "Default description",
    image: <svg role="img" aria-label="Illustration" />,
    showTour: false,
    onShowTourChange: fn(),
    renderStep: ({ title, description, image }, { defaultContent }) => (
      <Coach.Step>
        <p>Before default content</p>
        {defaultContent}
        <p>
          Received: {title}, {description}
        </p>
        {image}
      </Coach.Step>
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

export const SingleAnchorWithRenderStep: StoryObj = {
  render: () => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={anchorRef}>Target</Button>
        <Tour
          showTour={false}
          onShowTourChange={fn()}
          type="anchor"
          anchorRef={anchorRef}
          title="Unused title"
          aria-labelledby="custom-anchor-label"
          renderStep={() => (
            <Coach.Step>
              <Coach.Title>Custom title</Coach.Title>
              <Coach.Description id="custom-anchor-label">
                Custom accessible name
              </Coach.Description>
              <Coach.Footer>
                <Coach.CloseTrigger>
                  <Button>Done</Button>
                </Coach.CloseTrigger>
              </Coach.Footer>
            </Coach.Step>
          )}
        />
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
    return (
      <Coach type="dialog" title="Help" translations={translations}>
        <Coach.ShowTourTrigger>
          <Coach.Mark>
            <Button>Target action</Button>
          </Coach.Mark>
        </Coach.ShowTourTrigger>
      </Coach>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Target action" }),
    );
    const popup = await canvas.findByRole("dialog", { name: "Help" });
    const closeButtons = within(popup).getAllByRole("button", {
      name: "Close",
    });
    await userEvent.click(closeButtons[closeButtons.length - 1]);
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
    await userEvent.click(
      canvas.getByRole("button", { name: "Target action" }),
    );
    await canvas.findByRole("dialog", { name: "Help" });
  },
};

export const ControlledMark: Story = {
  args: {
    showTour: false,
    steps: dialogSteps,
    onShowTourChange: fn(),
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <Coach
        {...args}
        showTour={open}
        onShowTourChange={(nextOpen) => {
          args.onShowTourChange?.(nextOpen);
          setOpen(nextOpen);
        }}
        translations={translations}
      >
        <Coach.ShowTourTrigger>
          <Coach.Mark>
            <Button>Start tour</Button>
          </Coach.Mark>
        </Coach.ShowTourTrigger>
      </Coach>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    expect(args.onShowTourChange).toHaveBeenLastCalledWith(true);
    await canvas.findByRole("dialog", { name: "Welcome" });
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");
    const popup = await canvas.findByRole("dialog", { name: "Finished" });
    const closeButtons = within(popup).getAllByRole("button", {
      name: "Close",
    });
    await userEvent.click(closeButtons[closeButtons.length - 1]);
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
    expect(args.onShowTourChange).toHaveBeenLastCalledWith(false);
    await userEvent.click(canvas.getByRole("button", { name: "Start tour" }));
    await canvas.findByRole("dialog", { name: "Welcome" });
  },
};

export const DisabledMark: StoryObj = {
  render: () => (
    <Coach type="dialog" title="Help" disableTour showTour>
      <Coach.ShowTourTrigger>
        <Coach.Mark>
          <Button>Target action</Button>
        </Coach.Mark>
      </Coach.ShowTourTrigger>
    </Coach>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByRole("button", { name: "Show help" })).toBeNull();
    expect(canvas.getByRole("button", { name: "Target action" })).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Target action" }),
    );
    expect(canvas.queryByRole("dialog")).toBeNull();
  },
};

export const MarkWithCustomStep: StoryObj = {
  render: () => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    return (
      <Coach
        type="anchor"
        anchorRef={anchorRef}
        title="Default title"
        description="Default description"
        renderStep={({ title, description }) => (
          <Coach.Step>
            <Coach.Title>{title}</Coach.Title>
            <Coach.Description>{description}</Coach.Description>
            <Coach.Footer>
              <Coach.CloseTrigger>
                <Button>Done</Button>
              </Coach.CloseTrigger>
            </Coach.Footer>
          </Coach.Step>
        )}
      >
        <Coach.ShowTourTrigger>
          <Coach.Mark>
            <Button ref={anchorRef}>Target</Button>
          </Coach.Mark>
        </Coach.ShowTourTrigger>
      </Coach>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const target = canvas.getByRole("button", { name: "Target" });
    expect(canvas.queryByText("Default description")).toBeNull();
    await userEvent.click(target);
    const popup = await canvas.findByRole("dialog", { name: "Default title" });
    expect(within(popup).getByText("Default description")).toBeVisible();
    await userEvent.click(within(popup).getByRole("button", { name: "Done" }));
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
    expect(canvas.getByRole("button", { name: "Target" })).toBe(target);
    await userEvent.click(target);
    await canvas.findByRole("dialog", { name: "Default title" });
  },
};
