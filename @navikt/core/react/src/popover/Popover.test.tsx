import { act, fireEvent, screen } from "@testing-library/react";
import React from "react";
import { renderWithStyles as render } from "../../tests/utils";
import Popover from "./Popover";

describe("Popover", () => {
  test("open", () => {
    render(
      <Popover
        open
        anchorEl={document.createElement("div")}
        onClose={() => null}
        data-testid="popover-id"
      >
        <div />
      </Popover>
    );

    expect(screen.getByTestId("popover-id")).toBeVisible();
  });

  test("should be hidden", () => {
    render(
      <Popover
        open={false}
        anchorEl={document.createElement("div")}
        onClose={() => null}
        data-testid="popover-id"
      >
        <div />
      </Popover>
    );

    expect(screen.getByTestId("popover-id")).not.toBeVisible();
  });

  it("outsideClick", async () => {
    const fn = jest.fn();
    render(
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
      expect(screen.getByTestId("popover-id")).toBeVisible();
      screen.getByRole("link").focus();
    });

    expect(fn).toHaveBeenCalled();
  });

  it("escape", async () => {
    const fn = jest.fn();
    const { container } = render(
      <div>
        <Popover
          open={true}
          anchorEl={document.createElement("div")}
          onClose={fn}
          data-testid="popover-id"
        >
          <div />
        </Popover>
      </div>
    );

    expect(screen.getByTestId("popover-id")).toBeVisible();
    fireEvent.keyDown(
      // Should work anywhere
      container,
      { key: "Escape" }
    );

    expect(fn).toHaveBeenCalled();
  });

  it("keep open on popover-focus", async () => {
    const fn = jest.fn();
    render(
      <div>
        <Popover
          open={true}
          anchorEl={document.createElement("div")}
          onClose={fn}
          data-testid="popover-id"
        >
          <div />
        </Popover>
      </div>
    );

    await act(async () => {
      expect(screen.getByTestId("popover-id")).toBeVisible();
      screen.getByTestId("popover-id").focus();
    });

    expect(fn).toHaveBeenCalledTimes(0);
  }, 20000);

  it("keep open on popover-click", async () => {
    const fn = jest.fn();
    render(
      <div>
        <Popover
          open={true}
          anchorEl={document.createElement("div")}
          onClose={fn}
          data-testid="popover-id"
        >
          <div />
        </Popover>
      </div>
    );

    expect(screen.getByTestId("popover-id")).toBeVisible();
    fireEvent.click(screen.getByTestId("popover-id"));

    expect(fn).toHaveBeenCalledTimes(0);
  });
});
