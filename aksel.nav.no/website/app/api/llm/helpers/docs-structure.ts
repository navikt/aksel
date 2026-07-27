import { SchemaConfig } from "aksel-sanity-studio/schema";

type KategoriValue = {
  title: string;
  value: string;
};

type SectionEntry<T extends readonly KategoriValue[]> = {
  title: string;
  prefix: string;
  order: number;
  kategorier: T;
  staticPages: { title: string; slug: string; category: T[number]["value"] }[];
};

type MarkdownArticle = {
  _type: string;
  heading?: string | null;
  kategori?: string | null;
  sidebarindex?: number | null;
  slug?: string | null;
};

type LlmSectionConfig = typeof llmSectionConfig;

type GroupedLlmSection = {
  type: keyof LlmSectionConfig;
  config: LlmSectionConfig[keyof LlmSectionConfig];
  itemCount: number;
  categories: {
    kategori: KategoriValue;
    items: MarkdownArticle[];
    staticPages: { title: string; slug: string; category: string }[];
  }[];
};

const MARKDOWN_PAGE_PATHS = {
  TOKENS: "/grunnleggende/styling/design-tokens",
  CODEMODS: "/grunnleggende/kode/codemods-config",
  TAILWIND_CONFIG: "/grunnleggende/styling/tailwind-config",
  ICONS: "/komponenter/ikoner",
} as const;

const llmSectionConfig = {
  komponent_artikkel: {
    title: "Components",
    prefix: "komponenter",
    order: 0,
    kategorier: SchemaConfig.komponentKategorier,
    staticPages: [
      { title: "Ikoner", slug: MARKDOWN_PAGE_PATHS.ICONS, category: "core" },
    ],
  } satisfies SectionEntry<typeof SchemaConfig.komponentKategorier>,
  ds_artikkel: {
    title: "Foundations",
    prefix: "grunnleggende",
    order: 1,
    kategorier: SchemaConfig.grunnleggendeKategorier,
    staticPages: [
      {
        title: "Design tokens",
        slug: MARKDOWN_PAGE_PATHS.TOKENS,
        category: "styling",
      },
      {
        title: "Tailwind config for `@navikt/ds-tailwind`",
        slug: MARKDOWN_PAGE_PATHS.TAILWIND_CONFIG,
        category: "styling",
      },
      {
        title: "Codemods and migration scripts to run with `@navikt/aksel` CLI",
        slug: MARKDOWN_PAGE_PATHS.CODEMODS,
        category: "kode",
      },
    ],
  } satisfies SectionEntry<typeof SchemaConfig.grunnleggendeKategorier>,
  templates_artikkel: {
    title: "Templates and Patterns",
    prefix: "monster-maler",
    order: 2,
    kategorier: SchemaConfig.templatesKategorier,
    staticPages: [],
  } satisfies SectionEntry<typeof SchemaConfig.templatesKategorier>,
};

function groupLlmDocumentation(items: MarkdownArticle[]): GroupedLlmSection[] {
  const byType = new Map<string, MarkdownArticle[]>();
  for (const item of items) {
    if (!item.slug || !item.heading) {
      continue;
    }

    const list = byType.get(item._type) ?? [];
    list.push(item);
    byType.set(item._type, list);
  }

  const sortedConfig = Object.entries(llmSectionConfig).sort(
    ([, a], [, b]) => a.order - b.order,
  );

  return sortedConfig.map(([type, config]) => {
    const typeItems = (byType.get(type) ?? []).sort((a, b) => {
      const sidebarSort = (a.sidebarindex ?? 0) - (b.sidebarindex ?? 0);
      if (sidebarSort !== 0) {
        return sidebarSort;
      }

      return (a.heading ?? "").localeCompare(b.heading ?? "");
    });

    const itemsByKategori = new Map<string, MarkdownArticle[]>();
    for (const item of typeItems) {
      if (!item.kategori) {
        continue;
      }

      const list = itemsByKategori.get(item.kategori) ?? [];
      list.push(item);
      itemsByKategori.set(item.kategori, list);
    }

    return {
      type: type as keyof LlmSectionConfig,
      config,
      itemCount: typeItems.length,
      categories: config.kategorier.map((kategori) => ({
        kategori,
        items: itemsByKategori.get(kategori.value) ?? [],
        staticPages: config.staticPages.filter(
          (page) => page.category === kategori.value,
        ),
      })),
    };
  });
}

export { groupLlmDocumentation, llmSectionConfig, MARKDOWN_PAGE_PATHS };
export type { MarkdownArticle };
