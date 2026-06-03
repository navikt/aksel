import { describe, expect, test } from "vitest";
import { rovingFocus } from "./roving-focus";

describe("rovingFocus", () => {
  const setup = () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button class="item">1</button>
      <button class="item">2</button>
      <button class="item">3</button>
    `;
    document.body.appendChild(container);
    const items = Array.from(container.querySelectorAll<HTMLElement>(".item"));
    return { container, items };
  };

  test("focuses first item on 'first'", () => {
    const { container, items } = setup();
    rovingFocus(".item", container, "first");
    expect(document.activeElement).toBe(items[0]);
  });

  test("focuses last item on 'last'", () => {
    const { container, items } = setup();
    rovingFocus(".item", container, "last");
    expect(document.activeElement).toBe(items[2]);
  });

  test("focuses next item", () => {
    const { container, items } = setup();
    rovingFocus(".item", container, "next", items[0]);
    expect(document.activeElement).toBe(items[1]);
  });

  test("loops to first on 'next' when at end", () => {
    const { container, items } = setup();
    rovingFocus(".item", container, "next", items[2], true);
    expect(document.activeElement).toBe(items[0]);
  });

  test("stays at end on 'next' when loop is false", () => {
    const { container, items } = setup();
    rovingFocus(".item", container, "next", items[2], false);
    expect(document.activeElement).toBe(items[2]);
  });

  test("focuses previous item", () => {
    const { container, items } = setup();
    rovingFocus(".item", container, "prev", items[1]);
    expect(document.activeElement).toBe(items[0]);
  });

  test("loops to last on 'prev' when at start", () => {
    const { container, items } = setup();
    rovingFocus(".item", container, "prev", items[0], true);
    expect(document.activeElement).toBe(items[2]);
  });

  test("focuses last item on 'prev' when current is missing", () => {
    const { container, items } = setup();
    rovingFocus(".item", container, "prev", null, true);
    expect(document.activeElement).toBe(items[2]);
  });

  test("stays at start on 'prev' when loop is false", () => {
    const { container, items } = setup();
    rovingFocus(".item", container, "prev", items[0], false);
    expect(document.activeElement).toBe(items[0]);
  });

  test("does nothing if selector matches no items", () => {
    const container = document.createElement("div");
    const activeBefore = document.activeElement;
    rovingFocus(".missing", container, "first");
    expect(document.activeElement).toBe(activeBefore);
  });
});
