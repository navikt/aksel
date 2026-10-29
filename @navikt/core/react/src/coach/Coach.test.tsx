import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { consoleWarning } from "../utils/helpers/consoleWarning";
import { Coach } from "./index";
import { CoachContextProvider } from "./root/Coach.context";
import type { CoachStepItem } from "./types";
import { missingTriggersWarning } from "./warnings";

vi.mock("../utils/helpers/consoleWarning", () => ({
  consoleWarning: vi.fn(),
}));

function createContext(
  overrides: Partial<React.ComponentProps<typeof CoachContextProvider>> = {},
) {
  return {
    showTour: true,
    onClose: vi.fn(),
    currentStep: { id: "first", type: "dialog" as const },
    currentStepIndex: 0,
    totalSteps: 3,
    currentStepSize: "medium" as const,
    goToNextStep: vi.fn(),
    goToPreviousStep: vi.fn(),
    setTitleId: vi.fn(),
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Coach.Mark", () => {
  test("opens the tour without triggering its anchor click handler", async () => {
    const user = userEvent.setup();
    const openTour = vi.fn();
    const onClick = vi.fn();
    const onAnchorClick = vi.fn();
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <CoachContextProvider {...createContext({ openTour })}>
        <Coach.Mark ref={ref} aria-label="Show help" onClick={onClick}>
          <button type="button" onClick={onAnchorClick}>
            Target
          </button>
        </Coach.Mark>
      </CoachContextProvider>,
    );

    const mark = screen.getByRole("button", { name: "Show help" });
    expect(ref.current).toBe(mark);
    expect(mark).toHaveAttribute("aria-haspopup", "dialog");
    await user.click(mark);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(openTour).toHaveBeenCalledTimes(1);
    expect(onAnchorClick).not.toHaveBeenCalled();
  });

  test("allows the consumer to cancel opening", async () => {
    const user = userEvent.setup();
    const openTour = vi.fn();
    render(
      <CoachContextProvider {...createContext({ openTour })}>
        <Coach.Mark
          aria-label="Show help"
          onClick={(event) => event.preventDefault()}
        />
      </CoachContextProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Show help" }));
    expect(openTour).not.toHaveBeenCalled();
  });

  test("hides disabled marks without hiding their anchor", () => {
    render(
      <CoachContextProvider {...createContext({ disableTour: true })}>
        <Coach.Mark aria-label="Show help">
          <button type="button">Target</button>
        </Coach.Mark>
      </CoachContextProvider>,
    );
    expect(screen.queryByRole("button", { name: "Show help" })).toBeNull();
    expect(screen.getByRole("button", { name: "Target" })).toBeVisible();
  });
});

describe.each([
  {
    name: "NextTrigger",
    Trigger: Coach.NextTrigger,
    action: "goToNextStep" as const,
  },
  {
    name: "PreviousTrigger",
    Trigger: Coach.PreviousTrigger,
    action: "goToPreviousStep" as const,
  },
  {
    name: "CloseTrigger",
    Trigger: Coach.CloseTrigger,
    action: "onClose" as const,
  },
])("Coach.$name", ({ Trigger, action }) => {
  test("composes handlers and forwards both refs to the child button", async () => {
    const user = userEvent.setup();
    const context = createContext();
    const onTriggerClick = vi.fn();
    const onChildClick = vi.fn();
    const triggerRef = React.createRef<HTMLButtonElement>();
    const childRef = React.createRef<HTMLButtonElement>();

    render(
      <CoachContextProvider {...context}>
        <Trigger ref={triggerRef} onClick={onTriggerClick}>
          <button type="button" ref={childRef} onClick={onChildClick}>
            Action
          </button>
        </Trigger>
      </CoachContextProvider>,
    );

    const button = screen.getByRole("button", { name: "Action" });
    expect(triggerRef.current).toBe(button);
    expect(childRef.current).toBe(button);
    expect(button).toHaveAttribute("type", "button");

    await user.click(button);

    expect(onTriggerClick).toHaveBeenCalledTimes(1);
    expect(onChildClick).toHaveBeenCalledTimes(1);
    expect(context[action]).toHaveBeenCalledTimes(1);
  });

  test.each(["trigger", "child"])(
    "allows the %s click handler to cancel the action",
    async (source) => {
      const user = userEvent.setup();
      const context = createContext();
      const preventDefault = (event: React.MouseEvent<HTMLButtonElement>) =>
        event.preventDefault();

      render(
        <CoachContextProvider {...context}>
          <Trigger onClick={source === "trigger" ? preventDefault : undefined}>
            <button
              type="button"
              onClick={source === "child" ? preventDefault : undefined}
            >
              Action
            </button>
          </Trigger>
        </CoachContextProvider>,
      );

      await user.click(screen.getByRole("button", { name: "Action" }));

      expect(context[action]).not.toHaveBeenCalled();
    },
  );
});

describe("Coach.Title", () => {
  test.each([undefined, "custom-title"])(
    "registers its title id (%s) and clears it on unmount",
    (id) => {
      const context = createContext();
      const titleRef = React.createRef<HTMLHeadingElement>();
      const { unmount } = render(
        <CoachContextProvider {...context}>
          <Coach.Title id={id} ref={titleRef}>
            Welcome
          </Coach.Title>
        </CoachContextProvider>,
      );

      const title = screen.getByRole("heading", { name: "Welcome", level: 1 });
      expect(title.id).not.toBe("");
      const expectedId = id ?? title.id;
      expect(title).toHaveAttribute("id", expectedId);
      expect(titleRef.current).toBe(title);
      expect(context.setTitleId).toHaveBeenLastCalledWith(title.id);

      unmount();

      expect(context.setTitleId).toHaveBeenLastCalledWith(undefined);
    },
  );
});

describe("Coach.Progress", () => {
  test("uses one-based numbering and supports custom translations", () => {
    const context = createContext({ currentStepIndex: 1 });
    render(
      <CoachContextProvider {...context}>
        <Coach.Progress
          translations={{ currentStep: "Step {current}/{total}" }}
        />
      </CoachContextProvider>,
    );

    expect(screen.getByText("Step 2/3")).toBeInTheDocument();
  });

  test.each([0, 1])("hides progress for %s steps", (totalSteps) => {
    const context = createContext({ totalSteps });
    render(
      <CoachContextProvider {...context}>
        <Coach.Progress
          translations={{ currentStep: "Step {current}/{total}" }}
        />
      </CoachContextProvider>,
    );

    expect(screen.queryByText(/^Step /)).not.toBeInTheDocument();
  });
});

describe("missingTriggersWarning", () => {
  function createPopup({
    id = "current",
    next = false,
    previous = false,
    close = false,
    topClose = false,
  } = {}) {
    render(
      <div role="dialog" data-coach-step-id={id}>
        {next && (
          <button type="button" data-coach-next-trigger>
            Next
          </button>
        )}
        {previous && (
          <button type="button" data-coach-previous-trigger>
            Previous
          </button>
        )}
        {close && (
          <button type="button" data-coach-close-trigger>
            Close
          </button>
        )}
        {topClose && (
          <button
            type="button"
            data-coach-close-trigger
            data-coach-top-close-trigger
          >
            Dismiss
          </button>
        )}
      </div>,
    );
    return screen.getByRole("dialog");
  }

  const step: CoachStepItem = { id: "current", type: "dialog" };

  test.each([
    { index: 0, total: 3, triggers: ["NextTrigger"] },
    { index: 1, total: 3, triggers: ["NextTrigger", "PreviousTrigger"] },
    { index: 2, total: 3, triggers: ["PreviousTrigger", "CloseTrigger"] },
    { index: 0, total: 1, triggers: ["CloseTrigger"] },
  ])(
    "requires $triggers on step $index of $total",
    ({ index, total, triggers }) => {
      missingTriggersWarning(index, total, step, createPopup());

      expect(consoleWarning).toHaveBeenCalledTimes(triggers.length);
      for (const trigger of triggers) {
        expect(consoleWarning).toHaveBeenCalledWith(
          expect.stringContaining(`<Coach.${trigger}>`),
        );
      }
    },
  );

  test.each([
    { index: 0, total: 3, next: true },
    { index: 1, total: 3, next: true, previous: true },
    { index: 2, total: 3, previous: true, close: true },
    { index: 0, total: 1, close: true },
  ])("accepts valid triggers on step $index of $total", (configuration) => {
    missingTriggersWarning(
      configuration.index,
      configuration.total,
      step,
      createPopup(configuration),
    );

    expect(consoleWarning).not.toHaveBeenCalled();
  });

  test("does not count the top close button as the final action", () => {
    missingTriggersWarning(0, 1, step, createPopup({ topClose: true }));

    expect(consoleWarning).toHaveBeenCalledWith(
      expect.stringContaining("<Coach.CloseTrigger>"),
    );
  });

  test("ignores a previous step's popup during transitions", () => {
    missingTriggersWarning(1, 3, step, createPopup({ id: "previous" }));

    expect(consoleWarning).not.toHaveBeenCalled();
  });

  test("ignores unmounted and not-yet-mounted popups", () => {
    const { unmount } = render(
      <div role="dialog" data-coach-step-id={step.id} />,
    );
    const popup = screen.getByRole("dialog");
    unmount();

    missingTriggersWarning(0, 3, step, popup);
    missingTriggersWarning(0, 3, step, null);

    expect(consoleWarning).not.toHaveBeenCalled();
  });

  test("does not count triggers outside the current popup", () => {
    const popup = createPopup();
    render(
      <button type="button" data-coach-next-trigger>
        Unrelated next
      </button>,
    );

    missingTriggersWarning(0, 3, step, popup);

    expect(consoleWarning).toHaveBeenCalledWith(
      expect.stringContaining("<Coach.NextTrigger>"),
    );
  });
});
