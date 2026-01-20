import { describe, expect, test, vi } from "vitest";
import { mergeProps } from "../merge-props";

describe("Testing mergeProps function for Slot", () => {
  test("child props should override slot props", () => {
    const slotProps = { prop1: "slot", prop2: "slot" };
    const childProps = { prop1: "child" };
    const result = mergeProps(slotProps, childProps);
    expect(result).toEqual({ prop1: "child", prop2: "slot" });
  });

  test("if a handler exists on both slot and child props, the composed function is created", () => {
    const slotClick = vi.fn();
    const childClick = vi.fn();
    const slotProps = { onClick: slotClick };
    const childProps = { onClick: childClick };
    const result = mergeProps(slotProps, childProps);

    result.onClick();

    expect(slotClick).toHaveBeenCalledTimes(1);
    expect(childClick).toHaveBeenCalledTimes(1);
  });

  test("if a handler exists only on the slot props, only the slot handler is used", () => {
    const slotClick = vi.fn();
    const slotProps = { onClick: slotClick };
    const childProps = {};
    const result = mergeProps(slotProps, childProps);

    result.onClick();

    expect(slotClick).toHaveBeenCalledTimes(1);
  });

  test("if the prop is `style`, the styles are merged", () => {
    const slotProps = { style: { color: "red" } };
    const childProps = { style: { backgroundColor: "blue" } };
    const result = mergeProps(slotProps, childProps);
    expect(result.style).toEqual({ color: "red", backgroundColor: "blue" });
  });

  test("if the prop is `className`, the class names are joined with a space", () => {
    const slotProps = { className: "class1" };
    const childProps = { className: "class2" };
    const result = mergeProps(slotProps, childProps);
    expect(result.className).toBe("class1 class2");
  });
});
