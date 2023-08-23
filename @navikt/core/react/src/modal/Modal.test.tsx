import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button, Modal } from "..";

const Test = () => {
  const [open, setOpen] = useState(true);

  return (
    <Modal open={open}>
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
});
