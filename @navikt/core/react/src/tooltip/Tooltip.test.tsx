import { act, cleanup, fireEvent } from "@testing-library/react";
import React from "react";
import { focusVisible, simulatePointerDown } from "../../tests/utils";
import userEvent from "@testing-library/user-event";
import Tooltip from "./Tooltip";
import { renderWithStyles as render } from "../../tests/utils";

describe("Tooltip", () => {
  test("controlled open", () => {
    const { getByRole } = render(
      <Tooltip content="Hello World" open>
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>
    );

    expect(getByRole("tooltip")).toBeVisible();
    cleanup();
  });

  test("default open", () => {
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
  });

  it("outsideClick", async () => {
    const { queryByRole, getByRole } = render(
      <div>
        <Tooltip content="Hello World">
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>
        <a href="/#">link</a>
      </div>
    );

    simulatePointerDown(getByRole("button"));
    focusVisible(getByRole("button"));

    await act(async () => {
      expect(getByRole("tooltip")).toBeVisible();
      getByRole("link").focus();
    });

    expect(queryByRole("tooltip")).toBeNull();

    cleanup();
  });

  it("keep open on tooltip-click", async () => {
    const { getByRole } = render(
      <div>
        <Tooltip content="Hello World">
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>
      </div>
    );

    simulatePointerDown(getByRole("button"));
    focusVisible(getByRole("button"));

    await act(async () => {
      expect(getByRole("tooltip")).toBeVisible();
      fireEvent.click(getByRole("tooltip"));
    });

    expect(getByRole("tooltip")).toBeVisible();

    cleanup();
  });

  it("close on focus-loss", async () => {
    const { getByRole, queryByRole } = render(
      <div>
        <Tooltip content="Hello World">
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>
        <a href="/#">link</a>
      </div>
    );

    simulatePointerDown(getByRole("button"));
    focusVisible(getByRole("button"));

    await act(async () => {
      expect(getByRole("tooltip")).toBeVisible();
      getByRole("link").focus();
    });

    expect(queryByRole("tooltip")).toBeNull();

    cleanup();
  });
});
