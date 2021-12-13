import React from "react";
import { render, screen, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "..";
import faker from "faker";

const delay = 150;

afterEach(cleanup);

describe("Tooltip", () => {
  it("Hover triggers tooltip", async () => {
    render(
      <Tooltip data-testid="hover-tooltip" content="Tooltip text">
        <div>Hoverable element</div>
      </Tooltip>
    );

    userEvent.hover(screen.getByText("Hoverable element"));

    await act(() => new Promise((r) => setTimeout(r, delay)));

    const tooltip = screen.getByTestId("hover-tooltip");
    expect(tooltip).toHaveAttribute("aria-hidden", "false");
  });
  it("Hover triggers tooltip on disabled button", async () => {
    render(
      <Tooltip data-testid="disabled-tooltip" content="Tooltip text">
        <span data-testid="element-wrapper">
          <button style={{ pointerEvents: "none" }} disabled>
            disabled element
          </button>
        </span>
      </Tooltip>
    );

    userEvent.hover(screen.getByTestId("element-wrapper"));

    await act(() => new Promise((r) => setTimeout(r, delay)));

    const tooltip = screen.getByTestId("disabled-tooltip");
    expect(tooltip).toHaveAttribute("aria-hidden", "false");
  });
  it("Focus triggers tooltip", async () => {
    render(
      <Tooltip data-testid="focus-tooltip" content="Tooltip text">
        <button>Focusable element</button>
      </Tooltip>
    );

    userEvent.click(screen.getByText("Focusable element"));

    await act(() => new Promise((r) => setTimeout(r, delay)));

    const tooltip = screen.getByTestId("focus-tooltip");
    expect(tooltip).toHaveAttribute("aria-hidden", "false");
  });

  it("Changing delay works", async () => {
    render(
      <Tooltip data-testid="delay-tooltip" content="Tooltip text" delay={400}>
        <button>Changed delay</button>
      </Tooltip>
    );

    userEvent.hover(screen.getByText("Changed delay"));

    await act(() => new Promise((r) => setTimeout(r, 150)));

    /* Should not have opened yet */
    expect(screen.getByTestId("delay-tooltip")).toHaveAttribute(
      "aria-hidden",
      "true"
    );

    /* Should open now */
    await act(() => new Promise((r) => setTimeout(r, 350)));
    expect(screen.getByTestId("delay-tooltip")).toHaveAttribute(
      "aria-hidden",
      "false"
    );
  });

  it("Tooltip merges events correctly", async () => {
    const onFocus = jest.fn();

    render(
      <Tooltip data-testid="events-tooltip" content="Tooltip text">
        <button onFocus={onFocus}>Merged events</button>
      </Tooltip>
    );

    userEvent.click(screen.getByText("Merged events"));

    await act(() => new Promise((r) => setTimeout(r, 150)));

    expect(screen.getByTestId("events-tooltip")).toHaveAttribute(
      "aria-hidden",
      "false"
    );
    expect(onFocus).toHaveBeenCalled();
  });

  it("Tooltip merges aria-describedby correctly", async () => {
    const aria = faker.datatype.string();
    const id = faker.datatype.string();

    render(
      <Tooltip id={id} data-testid="aria-tooltip" content="Tooltip text">
        <button aria-describedby={aria}>aria merge</button>
      </Tooltip>
    );

    userEvent.click(screen.getByText("aria merge"));

    await act(() => new Promise((r) => setTimeout(r, 150)));

    expect(screen.getByText("aria merge")).toHaveAttribute(
      "aria-describedby",
      `${aria} ${id}`
    );
  });
});
