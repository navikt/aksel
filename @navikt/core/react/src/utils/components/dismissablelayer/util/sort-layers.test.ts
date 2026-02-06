import { describe, expect, test } from "vitest";
import { getSortedLayers } from "./sort-layers";

type DismissableLayerElement = HTMLDivElement;

describe("DismissableLayer: getSortedLayers", () => {
  beforeAll(() => {
    /* Reset id counter before tests to ensure consistent element ids */
    idCounter = 0;
  });

  test("should return empty array when no layers", () => {
    const layers = new Set<DismissableLayerElement>();
    const branchedLayers = new Map();

    const result = getSortedLayers(layers, branchedLayers);
    expect(result).toEqual([]);
  });

  test("should return single layer", () => {
    const layer = createTestElement();
    const layers = new Set([layer]);
    const branchedLayers = new Map();

    const result = getSortedLayers(layers, branchedLayers);
    expect(result).toEqual([layer]);
  });

  test("should return multiple independent layers in order", () => {
    const layer1 = createTestElement();
    const layer2 = createTestElement();
    const layer3 = createTestElement();
    const layers = new Set([layer1, layer2, layer3]);
    const branchedLayers = new Map();

    const result = getSortedLayers(layers, branchedLayers);
    expect(result).toEqual([layer1, layer2, layer3]);
  });

  test("should sort parent before child", () => {
    const parent = createTestElement();
    const child = createTestElement();
    const layers = new Set([child, parent]);
    const branchedLayers = new Map([[parent, new Set([child])]]);

    const result = getSortedLayers(layers, branchedLayers);
    expect(result).toEqual([parent, child]);
  });

  test("should handle nested parent-child relationships", () => {
    const grandparent = createTestElement();
    const parent = createTestElement();
    const child = createTestElement();
    const layers = new Set([child, parent, grandparent]);
    const branchedLayers = new Map([
      [grandparent, new Set([parent])],
      [parent, new Set([child])],
    ]);

    const result = getSortedLayers(layers, branchedLayers);
    expect(result).toEqual([grandparent, parent, child]);
  });

  test("should handle multiple children of same parent", () => {
    const parent = createTestElement();
    const child1 = createTestElement();
    const child2 = createTestElement();
    const layers = new Set([child1, child2, parent]);
    const branchedLayers = new Map([[parent, new Set([child1, child2])]]);

    const result = getSortedLayers(layers, branchedLayers);
    expect(result[0]).toBe(parent);
    expect(result.slice(1)).toContain(child1);
    expect(result.slice(1)).toContain(child2);
    expect(result).toHaveLength(3);
  });

  test("should handle complex branched structure", () => {
    const root = createTestElement();
    const branch1 = createTestElement();
    const branch2 = createTestElement();
    const leaf1 = createTestElement();
    const leaf2 = createTestElement();

    const layers = new Set([root, branch1, branch2, leaf1, leaf2]);
    const branchedLayers = new Map([
      [root, new Set([branch1, branch2])],
      [branch1, new Set([leaf1])],
      [branch2, new Set([leaf2])],
    ]);

    const result = getSortedLayers(layers, branchedLayers);
    expect(result[0]).toBe(root);
    expect(result.indexOf(branch1)).toBeLessThan(result.indexOf(leaf1));
    expect(result.indexOf(branch2)).toBeLessThan(result.indexOf(leaf2));
    expect(result).toHaveLength(5);
  });

  test("should ignore self-referential children", () => {
    const layer = createTestElement();
    const layers = new Set([layer]);
    const branchedLayers = new Map([[layer, new Set([layer])]]);

    const result = getSortedLayers(layers, branchedLayers);
    expect(result).toEqual([layer]);
  });

  test("should handle mixed independent and branched layers", () => {
    const independent = createTestElement();
    const parent = createTestElement();
    const child = createTestElement();
    const layers = new Set([independent, parent, child]);
    const branchedLayers = new Map([[parent, new Set([child])]]);

    const result = getSortedLayers(layers, branchedLayers);
    expect(result).toContain(independent);
    expect(result.indexOf(parent)).toBeLessThan(result.indexOf(child));
    expect(result).toHaveLength(3);
  });
});

let idCounter = 0;

function createTestElement() {
  const element = document.createElement("div");
  element.id = `layer-${idCounter++}`;
  return element;
}
