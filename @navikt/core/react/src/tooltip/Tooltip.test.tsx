import { act, fireEvent, screen } from "@testing-library/react";
import React from "react";
import {
  focusVisible,
  simulatePointerDown,
  renderWithStyles as render,
} from "../../tests/utils";
import userEvent from "@testing-library/user-event";
import Tooltip from "./Tooltip";

describe("Tooltip", () => {
  test("controlled open", () => {
    render(
      <Tooltip content="Hello World" open>
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>
    );

    expect(screen.getByRole("tooltip")).toBeVisible();
  });

  test("default open", () => {
    render(
      <Tooltip content="Hello World" defaultOpen>
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>
    );

    expect(screen.getByRole("tooltip")).toBeVisible();
  });

  test("Focus", async () => {
    render(
      <Tooltip content="Hello World">
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>
    );
    simulatePointerDown();

    focusVisible(screen.getByRole("button"));
    expect(screen.getByRole("tooltip")).toBeVisible();
  });

  test("Escape", async () => {
    render(
      <Tooltip content="Hello World">
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>
    );
    simulatePointerDown();

    focusVisible(screen.getByRole("button"));
    expect(screen.getByRole("tooltip")).toBeVisible();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("delay", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Hello World" delay={300}>
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>
    );

    await act(async () => {
      await user.hover(screen.getByRole("button"));
      await new Promise((r) => setTimeout(r, 250));
      expect(screen.queryByRole("tooltip")).toBeNull();
      await new Promise((r) => setTimeout(r, 600));
    });

    expect(screen.getByRole("tooltip")).toBeVisible();
  });

  it("outsideClick", async () => {
    render(
      <div>
        <Tooltip content="Hello World">
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>
        <a href="/#">link</a>
      </div>
    );

    simulatePointerDown(screen.getByRole("button"));
    focusVisible(screen.getByRole("button"));

    await act(async () => {
      expect(screen.getByRole("tooltip")).toBeVisible();
      screen.getByRole("link").focus();
    });

    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("keep open on tooltip-click", async () => {
    render(
      <div>
        <Tooltip content="Hello World">
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>
      </div>
    );

    simulatePointerDown(screen.getByRole("button"));
    focusVisible(screen.getByRole("button"));

    expect(screen.getByRole("tooltip")).toBeVisible();
    fireEvent.click(screen.getByRole("tooltip"));

    expect(screen.getByRole("tooltip")).toBeVisible();
  });

  it("close on focus-loss", async () => {
    render(
      <div>
        <Tooltip content="Hello World">
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>
        <a href="/#">link</a>
      </div>
    );

    simulatePointerDown(screen.getByRole("button"));
    focusVisible(screen.getByRole("button"));

    await act(async () => {
      expect(screen.getByRole("tooltip")).toBeVisible();
      screen.getByRole("link").focus();
    });

    expect(screen.queryByRole("tooltip")).toBeNull();
  });
});
