import { describe, expect, test } from "vitest";
import {
  type MarkdownArticle,
  groupLlmDocumentation,
  llmSectionConfig,
} from "../docs-structure";

describe("groupLlmDocumentation", () => {
  test("groups entries by configured section and category", () => {
    const items: MarkdownArticle[] = [
      {
        _type: "komponent_artikkel",
        heading: "Button",
        kategori: "core",
        sidebarindex: 2,
        slug: "komponenter/core/button",
      },
      {
        _type: "komponent_artikkel",
        heading: "Accordion",
        kategori: "core",
        sidebarindex: 1,
        slug: "komponenter/core/accordion",
      },
      {
        _type: "komponent_artikkel",
        heading: "Should be ignored",
        kategori: "core",
        sidebarindex: 0,
      },
      {
        _type: "ds_artikkel",
        heading: "Z-index",
        kategori: "styling",
        sidebarindex: 3,
        slug: "grunnleggende/styling/z-index",
      },
      {
        _type: "ds_artikkel",
        heading: "Colors",
        kategori: "styling",
        sidebarindex: 3,
        slug: "grunnleggende/styling/colors",
      },
      {
        _type: "ds_artikkel",
        heading: "CLI",
        kategori: "kode",
        sidebarindex: 1,
        slug: "grunnleggende/kode/cli",
      },
      {
        _type: "ds_artikkel",
        heading: "Missing category",
        sidebarindex: 0,
        slug: "grunnleggende/missing-category",
      },
    ];

    const result = groupLlmDocumentation(items);

    expect(result.map((section) => section.type)).toEqual([
      "komponent_artikkel",
      "ds_artikkel",
      "templates_artikkel",
    ]);

    expect(result[0].config).toBe(llmSectionConfig.komponent_artikkel);
    expect(result[0].itemCount).toBe(2);

    const componentsCoreCategory = result[0].categories.find(
      (category) => category.kategori.value === "core",
    );

    expect(componentsCoreCategory?.staticPages).toEqual([
      { title: "Ikoner", slug: "/komponenter/ikoner", category: "core" },
    ]);
    expect(componentsCoreCategory?.items.map((item) => item.heading)).toEqual([
      "Accordion",
      "Button",
    ]);

    const foundationsStylingCategory = result[1].categories.find(
      (category) => category.kategori.value === "styling",
    );

    expect(foundationsStylingCategory?.staticPages).toEqual([
      {
        title: "Design tokens",
        slug: "/grunnleggende/styling/design-tokens",
        category: "styling",
      },
      {
        title: "Tailwind config for `@navikt/ds-tailwind`",
        slug: "/grunnleggende/styling/tailwind-config",
        category: "styling",
      },
    ]);
    expect(
      foundationsStylingCategory?.items.map((item) => item.heading),
    ).toEqual(["Colors", "Z-index"]);

    const foundationsCodeCategory = result[1].categories.find(
      (category) => category.kategori.value === "kode",
    );

    expect(foundationsCodeCategory?.staticPages).toEqual([
      {
        title: "Codemods and migration scripts to run with `@navikt/aksel` CLI",
        slug: "/grunnleggende/kode/codemods-config",
        category: "kode",
      },
    ]);
    expect(foundationsCodeCategory?.items.map((item) => item.heading)).toEqual([
      "CLI",
    ]);
    expect(result[1].itemCount).toBe(4);
    expect(result[2].itemCount).toBe(0);
  });
});
