import React from "react";
import { render, screen, cleanup, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "..";

const delay = 150;

afterEach(cleanup);
describe("Tooltip", () => {
  it("Hover triggers tooltip", async () => {
    render(
      <Tooltip data-testid="hover-tooltip" content="Tooltip text">
        <div>Hoverable element</div>
      </Tooltip>
    );

    const content = screen.getByText("Hoverable element");

    userEvent.hover(content);

    await act(() => new Promise((r) => setTimeout(r, delay)));

    const tooltip = screen.getByTestId("hover-tooltip");
    expect(tooltip).toHaveAttribute("aria-hidden", "false");
  });
  /* it("renders with a correct title", async () => {
    render(
      <Tooltip title="Tooltip" placement="right-start">
        <span>Test</span>
      </Tooltip>
    );

    const content = screen.getByText("Test");

    fireEvent.mouseOver(content);
    await act(() => new Promise((r) => setTimeout(r, enterDelayDefault)));
    await waitFor(() => {
      const tooltip = screen.getByRole("tooltip");
      expect(content).toBeDefined();
      expect(tooltip).toBeDefined();
    });
  });
  it("renders on focus", async () => {
    render(
      <Tooltip title="Tooltip" placement="right-start">
        <span>Test</span>
      </Tooltip>
    );

    const content = screen.getByText("Test");

    fireEvent.focusIn(content);
    await act(() => new Promise((r) => setTimeout(r, enterDelayDefault)));
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeDefined();
    });
  });
  it("shows after correct delay", async () => {
    render(
      <Tooltip title="Tooltip" placement="right-start" enterDelay={500}>
        <span>Test</span>
      </Tooltip>
    );

    const content = screen.getByText("Test");

    fireEvent.mouseOver(content);

    await act(() => new Promise((r) => setTimeout(r, 200)));
    expect(screen.queryByText("Tooltip")).not.toBeInTheDocument();

    await act(() => new Promise((r) => setTimeout(r, 300)));
    await waitFor(() => {
      const tooltip = screen.getByRole("tooltip");
      expect(content).toBeDefined();
      expect(tooltip).toBeDefined();
    });
  });
  it("child onFocus is called when focusd", () => {
    const handler = jest.fn();
    render(
      <Tooltip title="Tooltip">
        <Button onFocus={handler}>Test</Button>
      </Tooltip>
    );

    const button = screen.getByText("Test");
    fireEvent.focus(button);

    expect(handler).toBeCalled();
  }); */
});
