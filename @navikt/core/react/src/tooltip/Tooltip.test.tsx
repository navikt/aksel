import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import React from "react";
import Tooltip from "./Tooltip";

describe("Tooltip rendering", () => {
  test("controlled open", () => {
    render(
      <Tooltip content="hello" open>
        <button>testbutton</button>
      </Tooltip>
    );
    expect(screen.getByRole("tooltip").textContent).toBe("hello");

    // The positioning does not matter
    cleanup();
  });
  test("default open", () => {
    render(
      <Tooltip content="hello" defaultOpen>
        <button>testbutton</button>
      </Tooltip>
    );
    expect(screen.getByRole("tooltip").textContent).toBe("hello");

    cleanup();
  });

  test("Focus", async () => {
    render(
      <Tooltip content="hello">
        <div tabIndex={0} data-testid="wrapper">
          testwrapper
        </div>
      </Tooltip>
    );

    act(() => screen.getByTestId("wrapper").focus());
    await new Promise((r) => setTimeout(r, 200));
    expect(screen.getByRole("tooltip").textContent).toBe("hello");

    cleanup();
  });
  test("Escape", async () => {
    render(
      <Tooltip content="hello" data-testid="tooltipid">
        <button tabIndex={0} data-testid="wrapper">
          testwrapper
        </button>
      </Tooltip>
    );
    act(() => screen.getByTestId("wrapper").focus());
    await new Promise((r) => setTimeout(r, 200));
    fireEvent.keyDown(document, { key: "Escape" });

    await new Promise((r) => setTimeout(r, 200));

    expect(() => screen.getByTestId("tooltipid")).toThrow();
    cleanup();
  });
});

/* describe("Uncontrolled RadioGroup", () => {
  test("handles state correctly", async () => {
    const user = userEvent.setup();

    render(<Group />);

    const input1 = screen.getByLabelText(label1) as HTMLInputElement;
    const input2 = screen.getByLabelText(label2) as HTMLInputElement;

    expect(input1.checked).toBe(false);
    expect(input2.checked).toBe(false);

    await user.click(screen.getByLabelText(label2));

    expect(input1.checked).toBe(false);
    expect(input2.checked).toBe(true);
  });

  test("handles defaultValue correctly", async () => {
    const user = userEvent.setup();
    render(<Group defaultValue={value1} />);

    const input1 = screen.getByLabelText(label1) as HTMLInputElement;
    const input2 = screen.getByLabelText(label2) as HTMLInputElement;

    expect(input1.checked).toBe(true);
    expect(input2.checked).toBe(false);

    await user.click(screen.getByLabelText(label2));

    expect(input1.checked).toBe(false);
    expect(input2.checked).toBe(true);
  });
});
 */
