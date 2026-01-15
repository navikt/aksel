import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { useState } from "react";
import { describe, expect, test } from "vitest";
import { Button, Modal } from "..";

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
  test("should be visible", async () => {
    render(<Test />);
    expect(await screen.findByText("Foobar")).toBeVisible();
  });

  test("should be hidden after setting 'open' to false", async () => {
    render(<Test />);
    fireEvent.click(screen.getByText("Close"));
    expect(screen.getByText("Foobar")).not.toBeVisible();
  });

  test("should toggle scroll lock", async () => {
    render(<Test />);

    await waitFor(() => {
      expect(document.documentElement.style.overflowX).toBe("hidden");
    });
    await waitFor(() => {
      expect(document.documentElement.style.overflowY).toBe("hidden");
    });
    await waitFor(() => {
      expect(document.documentElement.style.scrollBehavior).toBe("unset");
    });
    await waitFor(() => {
      expect(document.documentElement.style.scrollbarGutter).toBe("stable");
    });

    fireEvent.click(screen.getByText("Close"));
    await waitFor(() => {
      expect(document.documentElement.style.cssText).toBe("");
    });
  });
});
