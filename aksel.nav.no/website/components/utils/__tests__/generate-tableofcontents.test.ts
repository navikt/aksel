import { describe, expect, test } from "vitest";
import { generateTableOfContents } from "../generate-tableofcontents";
import { komponentPage } from "./mockdata";

const generalPageOut = [
  { title: "Eksempler", id: "15e02c0bf767", children: [] },
  {
    title: "Varianter",
    id: "8e900c15ffa9",
    children: [
      { title: "Margin", id: "3fa1893ab0eb" },
      { title: "Reflective padding", id: "5e3def4c77b1" },
      { title: "As child", id: "1a95c50cf6fc" },
    ],
  },
  {
    title: "Props",
    id: "8684a3062267",
    children: [{ title: "Bleed", id: "158c48d4e3d2" }],
  },
];

const komponentOutWithIntro = [
  { title: "Intro", id: "intro", children: [] },
  ...generalPageOut,
];

describe("Testing generateTableOfContent function", () => {
  test("general page-content gets correct TOC", () => {
    expect(
      generateTableOfContents({
        type: "aksel_artikkel",
        content: komponentPage,
      }),
    ).toEqual(generalPageOut);
  });

  test("komponent-page with intro gets correct TOC", () => {
    expect(
      generateTableOfContents({
        type: "komponent_artikkel",
        content: komponentPage,
        intro: true,
      }),
    ).toEqual(komponentOutWithIntro);
  });
});
