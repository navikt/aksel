import { describe, expect, test } from "vitest";
import { SidebarInputNodeT, SidebarT } from "../../types/sanity-schema";
import {
  generateSidebar,
  sortDeprecated,
  sortIndex,
} from "../generate-sidebar";

const baseItem = { slug: "/123", tag: "beta" as const, sidebarindex: null };

const input: SidebarInputNodeT[] = [
  {
    ...baseItem,
    kategori: "primitives",
    heading: "d",
    tag: "deprecated" as const,
    sidebarindex: 2,
  },
  { ...baseItem, kategori: "primitives", heading: "e", sidebarindex: 1 },
  { ...baseItem, kategori: "core", heading: "c", tag: "deprecated" as const },
  { ...baseItem, kategori: "primitives", heading: "f", sidebarindex: 0 },
  { ...baseItem, kategori: "core", heading: "b" },
];

const outputDeprecated = [
  { ...baseItem, kategori: "primitives", heading: "e", sidebarindex: 1 },
  { ...baseItem, kategori: "primitives", heading: "f", sidebarindex: 0 },
  { ...baseItem, kategori: "core", heading: "b" },
  {
    ...baseItem,
    kategori: "primitives",
    heading: "d",
    tag: "deprecated" as const,
    sidebarindex: 2,
  },
  { ...baseItem, kategori: "core", heading: "c", tag: "deprecated" as const },
];

const outputIndex = [
  { ...baseItem, kategori: "primitives", heading: "f", sidebarindex: 0 },
  { ...baseItem, kategori: "primitives", heading: "e", sidebarindex: 1 },
  {
    ...baseItem,
    kategori: "primitives",
    heading: "d",
    tag: "deprecated" as const,
    sidebarindex: 2,
  },
  { ...baseItem, kategori: "core", heading: "b" },
  { ...baseItem, kategori: "core", heading: "c", tag: "deprecated" as const },
];

const outputComplete: SidebarT = [
  {
    pages: [
      { slug: "/123", tag: "beta", heading: "f" },
      { slug: "/123", tag: "beta", heading: "e" },
      {
        slug: "/123",
        heading: "d",
        tag: "deprecated" as const,
      },
    ],
    title: "Primitives",
    value: "primitives",
  },
  {
    pages: [
      { slug: "/123", tag: "beta", heading: "b" },
      {
        slug: "/123",
        heading: "c",
        tag: "deprecated" as const,
      },
    ],
    title: "Core",
    value: "core",
  },
];

describe("generateSidebar function", () => {
  test("sort deprecated tags to bottom", () => {
    expect(input.sort(sortDeprecated)).toEqual(outputDeprecated);
  });

  test("sort by sidebarindex", () => {
    expect(input.sort(sortIndex)).toEqual(outputIndex);
  });

  test("generated output is correct", () => {
    expect(generateSidebar(input, "komponenter")).toEqual(outputComplete);
  });
});
