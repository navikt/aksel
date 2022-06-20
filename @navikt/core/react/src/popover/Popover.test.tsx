import { act, cleanup } from "@testing-library/react";
import React from "react";
import { renderWithStyles as render } from "../../tests/utils";
import Popover from "./Popover";

describe("Popover", () => {
  test("open", () => {
    const { getByTestId } = render(
      <Popover
        open
        anchorEl={document.createElement("div")}
        onClose={() => null}
        data-testid="popover-id"
      >
        <div />
      </Popover>
    );

    expect(getByTestId("popover-id")).toBeVisible();
    cleanup();
  });

  test("opentest", () => {
    const { getByTestId } = render(
      <Popover
        open={false}
        anchorEl={document.createElement("div")}
        onClose={() => null}
        data-testid="popover-id"
      >
        <div />
      </Popover>
    );

    expect(getByTestId("popover-id")).not.toBeVisible();
    cleanup();
  });

  it("outsideClick", async () => {
    const fn = jest.fn();
    const { getByRole, getByTestId } = render(
      <div>
        <Popover
          open={true}
          anchorEl={document.createElement("div")}
          onClose={fn}
          data-testid="popover-id"
        >
          <div />
        </Popover>
        <a href="/#">link</a>
      </div>
    );

    await act(async () => {
      expect(getByTestId("popover-id")).toBeVisible();
      getByRole("link").focus();
    });

    expect(fn).toHaveBeenCalled();

    cleanup();
  });
  /* test("default open", () => {
    const { getByRole } = render(
      <Tooltip content="Hello World" defaultOpen>
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>
    );

    expect(getByRole("tooltip")).toBeVisible();
    cleanup();
  });

  test("Focus", async () => {
    const { getByRole } = render(
      <Tooltip content="Hello World">
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>
    );
    simulatePointerDown();

    focusVisible(getByRole("button"));
    expect(getByRole("tooltip")).toBeVisible();

    cleanup();
  });
  test("Escape", async () => {
    const { queryByRole, getByRole } = render(
      <Tooltip content="Hello World">
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>
    );
    simulatePointerDown();

    focusVisible(getByRole("button"));
    expect(getByRole("tooltip")).toBeVisible();

    act(() => {
      fireEvent.keyDown(document, { key: "Escape" });
    });
    expect(queryByRole("tooltip")).toBeNull();

    cleanup();
  });

  it("delay", async () => {
    const user = userEvent.setup();

    const { queryByRole, getByRole } = render(
      <Tooltip content="Hello World" delay={300}>
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>
    );

    await act(async () => {
      await user.hover(getByRole("button"));
      await new Promise((r) => setTimeout(r, 250));
      expect(queryByRole("tooltip")).toBeNull();
      await new Promise((r) => setTimeout(r, 600));
    });

    expect(getByRole("tooltip")).toBeVisible();
    cleanup();
  }); */
});
