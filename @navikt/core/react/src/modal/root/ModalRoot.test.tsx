import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { useState } from "react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Button } from "../../button";
import { Modal } from "../index";

const Test = () => {
  const [open, setOpen] = useState(true);

  return (
    <Modal open={open} onClose={() => null} aria-label="Test">
      <Modal.Body>
        <p>Foobar</p>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Modal.Body>
    </Modal>
  );
};

describe("Modal", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should be visible", async () => {
    render(<Test />);
    expect(await screen.findByText("Foobar")).toBeVisible();
  });

  test("should be hidden after setting 'open' to false", async () => {
    render(<Test />);
    fireEvent.click(screen.getByText("Close"));
    expect(screen.getByText("Foobar")).not.toBeVisible();
  });

  test.each([false, true])(
    "should toggle scroll lock (scrollbar-gutter support: %s)",
    async (supportsScrollbarGutter) => {
      vi.spyOn(CSS, "supports").mockReturnValue(supportsScrollbarGutter);
      render(<Test />);

      const lockedElement = supportsScrollbarGutter
        ? document.body
        : document.documentElement;

      await waitFor(() => {
        expect(lockedElement.style.overflowX).toBe("hidden");
      });
      await waitFor(() => {
        expect(lockedElement.style.overflowY).toBe("hidden");
      });
      await waitFor(() => {
        expect(document.documentElement.style.scrollBehavior).toBe(
          supportsScrollbarGutter ? "" : "unset",
        );
      });
      await waitFor(() => {
        expect(document.documentElement.style.scrollbarGutter).toBe("stable");
      });

      fireEvent.click(screen.getByText("Close"));
      await waitFor(() => {
        expect(document.documentElement.style.cssText).toBe("");
        expect(lockedElement.style.overflowX).toBe("");
        expect(lockedElement.style.overflowY).toBe("");
      });
    },
  );
});
