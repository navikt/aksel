import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { useState } from "react";
import { describe, expect, test } from "vitest";
import { Button, Modal } from "..";
import { BODY_CLASS, BODY_CLASS_LEGACY } from "./ModalUtils";

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
  test("should be visible", () => {
    render(<Test />);
    expect(screen.getByText("Foobar")).toBeVisible();
  });

  test("should be hidden after setting 'open' to false", async () => {
    render(<Test />);
    fireEvent.click(screen.getByText("Close"));
    expect(screen.getByText("Foobar")).not.toBeVisible();
  });

  test("should toggle body class", async () => {
    render(<Test />);
    expect(document.body.classList).toContain(BODY_CLASS);
    expect(document.body.classList).toContain(BODY_CLASS_LEGACY);

    fireEvent.click(screen.getByText("Close"));
    await waitFor(() => {
      expect(document.body.classList).not.toContain(BODY_CLASS);
    });
    await waitFor(() => {
      expect(document.body.classList).not.toContain(BODY_CLASS_LEGACY);
    });
  });

  test("should toggle body class when using portal", async () => {
    render(
      <Modal portal open onClose={() => null} aria-label="Test">
        <Modal.Header />
      </Modal>,
    );
    expect(document.body.classList).toContain(BODY_CLASS);
    expect(document.body.classList).toContain(BODY_CLASS_LEGACY);

    fireEvent.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(document.body.classList).not.toContain(BODY_CLASS),
    );
    await waitFor(() =>
      expect(document.body.classList).not.toContain(BODY_CLASS_LEGACY),
    );
  });
});
