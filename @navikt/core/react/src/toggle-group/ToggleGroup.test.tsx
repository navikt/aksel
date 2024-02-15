import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ToggleGroup } from "./ToggleGroup";

const TestToggleGroup = ({ value, onChange, defaultValue }: any) => (
  <ToggleGroup value={value} onChange={onChange} defaultValue={defaultValue}>
    <ToggleGroup.Item value="toggle1" data-testid="toggle1">
      Toggle 1
    </ToggleGroup.Item>
    <ToggleGroup.Item value="toggle2" data-testid="toggle2">
      Toggle 2
    </ToggleGroup.Item>
    <ToggleGroup.Item value="toggle3" data-testid="toggle3">
      Toggle 3
    </ToggleGroup.Item>
  </ToggleGroup>
);

describe("ToggleGroup", () => {
  test("sets default value correctly", () => {
    render(<TestToggleGroup defaultValue="toggle2" />);
    const toggle = screen.getByTestId("toggle2");

    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  test("sets correct attributes on active toggle", () => {
    render(<TestToggleGroup defaultValue="toggle2" />);
    const toggle = screen.getByTestId("toggle2");

    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(toggle).toHaveAttribute("role", "radio");
    expect(toggle).toHaveAttribute("type", "button");
    expect(toggle).toHaveAttribute("tabindex", "-1");
  });

  test("sets correct attributes on idle toggle", () => {
    render(<TestToggleGroup defaultValue="toggle1" />);
    const toggle = screen.getByTestId("toggle2");

    expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(toggle).toHaveAttribute("role", "radio");
    expect(toggle).toHaveAttribute("type", "button");
    expect(toggle).toHaveAttribute("tabindex", "-1");
  });

  test("sets tabindex to 0 when focused", () => {
    render(<TestToggleGroup defaultValue="toggle2" />);
    const toggle = screen.getByTestId("toggle2");

    fireEvent.focus(toggle);
    expect(toggle).toHaveAttribute("tabindex", "0");
  });
});
