import { act, cleanup, fireEvent } from "@testing-library/react";
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

  test("should be hidden", () => {
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

  it("escape", async () => {
    const fn = jest.fn();
    const { container, getByTestId } = render(
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
      expect(getByTestId("popover-id")).toBeVisible();
      fireEvent.keyDown(
        // Should work anywhere
        container,
        { key: "Escape" }
      );
    });

    expect(fn).toHaveBeenCalled();

    cleanup();
  });

  it("keep open on popover-focus", async () => {
    const fn = jest.fn();
    const { getByTestId } = render(
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
      expect(getByTestId("popover-id")).toBeVisible();
      getByTestId("popover-id").focus();
    });

    expect(fn).toHaveBeenCalledTimes(0);

    cleanup();
  }, 20000);

  it("keep open on popover-click", async () => {
    const fn = jest.fn();
    const { getByTestId } = render(
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
      expect(getByTestId("popover-id")).toBeVisible();
      fireEvent.click(getByTestId("popover-id"));
    });

    expect(fn).toHaveBeenCalledTimes(0);

    cleanup();
  });
});
