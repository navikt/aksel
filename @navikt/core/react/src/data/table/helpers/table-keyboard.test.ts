import { describe, expect, test } from "vitest";
import { shouldBlockNavigation } from "./table-keyboard";

describe("shouldBlockNavigation", () => {
  test("should return false for non-arrow keys", () => {
    const event = new KeyboardEvent("keydown", { key: "Enter" });
    Object.defineProperty(event, "target", {
      value: document.createElement("div"),
    });
    expect(shouldBlockNavigation(event)).toBe(false);
  });

  test("should return false when target is null", () => {
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    Object.defineProperty(event, "target", { value: null });
    expect(shouldBlockNavigation(event)).toBe(false);
  });

  test("should return false for non-editable elements", () => {
    const div = document.createElement("div");
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    Object.defineProperty(event, "target", { value: div });
    expect(shouldBlockNavigation(event)).toBe(false);
  });

  test("should return true when target is contentEditable", () => {
    const div = document.createElement("div");
    div.setAttribute("contenteditable", "true");
    document.body.appendChild(div);

    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    Object.defineProperty(event, "target", { value: div });
    expect(shouldBlockNavigation(event)).toBe(true);

    document.body.removeChild(div);
  });

  test("should return true when target is inside contentEditable", () => {
    const parent = document.createElement("div");
    parent.setAttribute("contenteditable", "true");
    const child = document.createElement("span");
    parent.appendChild(child);
    document.body.appendChild(parent);

    const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
    Object.defineProperty(event, "target", { value: child });
    expect(shouldBlockNavigation(event)).toBe(true);

    document.body.removeChild(parent);
  });

  test("should return false for checkbox input", () => {
    const input = document.createElement("input");
    input.type = "checkbox";
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    Object.defineProperty(event, "target", { value: input });
    expect(shouldBlockNavigation(event)).toBe(false);
  });

  test("should return false for radio input", () => {
    const input = document.createElement("input");
    input.type = "radio";
    const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
    Object.defineProperty(event, "target", { value: input });
    expect(shouldBlockNavigation(event)).toBe(false);
  });

  test("should return false for non-text input types", () => {
    const input = document.createElement("input");
    input.type = "button";
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    Object.defineProperty(event, "target", { value: input });
    expect(shouldBlockNavigation(event)).toBe(false);
  });

  test("should return true for text input when selectionStart is null", () => {
    const input = document.createElement("input");
    input.type = "text";
    Object.defineProperty(input, "selectionStart", {
      value: null,
      configurable: true,
    });
    Object.defineProperty(input, "selectionEnd", {
      value: null,
      configurable: true,
    });
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    Object.defineProperty(event, "target", { value: input });
    expect(shouldBlockNavigation(event)).toBe(true);
  });

  test("should block ArrowLeft when cursor is not at start of text input", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = "test";
    input.setSelectionRange(2, 2);
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    Object.defineProperty(event, "target", { value: input });
    expect(shouldBlockNavigation(event)).toBe(true);
  });

  test("should not block ArrowLeft when cursor is at start of text input", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = "test";
    input.setSelectionRange(0, 0);
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    Object.defineProperty(event, "target", { value: input });
    expect(shouldBlockNavigation(event)).toBe(false);
  });

  test("should block ArrowRight when cursor is not at end of text input", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = "test";
    input.setSelectionRange(2, 2);
    const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
    Object.defineProperty(event, "target", { value: input });
    expect(shouldBlockNavigation(event)).toBe(true);
  });

  test("should not block ArrowRight when cursor is at end of text input", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = "test";
    input.setSelectionRange(4, 4);
    const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
    Object.defineProperty(event, "target", { value: input });
    expect(shouldBlockNavigation(event)).toBe(false);
  });

  test("should block ArrowLeft when text is selected in input", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = "test";
    input.setSelectionRange(0, 2);
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    Object.defineProperty(event, "target", { value: input });
    expect(shouldBlockNavigation(event)).toBe(true);
  });

  test("should block ArrowRight when text is selected in input", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = "test";
    input.setSelectionRange(1, 3);
    const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
    Object.defineProperty(event, "target", { value: input });
    expect(shouldBlockNavigation(event)).toBe(true);
  });

  test("should handle various text input types", () => {
    /**
     * Email and number types are excluded since "setSelectionRange" does not work.
     */
    const types = ["text", "search", "url", "tel", "password"];
    types.forEach((type) => {
      const input = document.createElement("input");
      input.type = type;
      input.value = "test";
      input.setSelectionRange(2, 2);
      const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
      Object.defineProperty(event, "target", { value: input });
      expect(shouldBlockNavigation(event)).toBe(true);
    });
  });

  test("should block ArrowUp when cursor is not at start of textarea", () => {
    const textarea = document.createElement("textarea");
    textarea.value = "line1\nline2";
    textarea.setSelectionRange(5, 5);
    const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
    Object.defineProperty(event, "target", { value: textarea });
    expect(shouldBlockNavigation(event)).toBe(true);
  });

  test("should not block ArrowUp when cursor is at start of textarea", () => {
    const textarea = document.createElement("textarea");
    textarea.value = "line1\nline2";
    textarea.setSelectionRange(0, 0);
    const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
    Object.defineProperty(event, "target", { value: textarea });
    expect(shouldBlockNavigation(event)).toBe(false);
  });

  test("should block ArrowDown when cursor is not at end of textarea", () => {
    const textarea = document.createElement("textarea");
    textarea.value = "line1\nline2";
    textarea.setSelectionRange(5, 5);
    const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
    Object.defineProperty(event, "target", { value: textarea });
    expect(shouldBlockNavigation(event)).toBe(true);
  });

  test("should not block ArrowDown when cursor is at end of textarea", () => {
    const textarea = document.createElement("textarea");
    textarea.value = "line1\nline2";
    textarea.setSelectionRange(11, 11);
    const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
    Object.defineProperty(event, "target", { value: textarea });
    expect(shouldBlockNavigation(event)).toBe(false);
  });

  test("should return true for select with ArrowDown", () => {
    const select = document.createElement("select");
    const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
    Object.defineProperty(event, "target", { value: select });
    expect(shouldBlockNavigation(event)).toBe(true);
  });

  test("should return true for select with ArrowUp", () => {
    const select = document.createElement("select");
    const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
    Object.defineProperty(event, "target", { value: select });
    expect(shouldBlockNavigation(event)).toBe(true);
  });

  test("should return false for select with ArrowLeft", () => {
    const select = document.createElement("select");
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    Object.defineProperty(event, "target", { value: select });
    expect(shouldBlockNavigation(event)).toBe(false);
  });

  test("should return false for select with ArrowRight", () => {
    const select = document.createElement("select");
    const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
    Object.defineProperty(event, "target", { value: select });
    expect(shouldBlockNavigation(event)).toBe(false);
  });

  test("should handle element inside editable parent", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = "test";
    input.setSelectionRange(2, 2);
    const wrapper = document.createElement("div");
    wrapper.appendChild(input);
    document.body.appendChild(wrapper);

    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    Object.defineProperty(event, "target", { value: input });
    expect(shouldBlockNavigation(event)).toBe(true);

    document.body.removeChild(wrapper);
  });
});
