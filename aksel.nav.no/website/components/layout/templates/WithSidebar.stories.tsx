import { SanityBlockContent } from "@/sanity-block";
import { getBlocks } from "@/sb-util";
import type { Meta, StoryObj } from "@storybook/react";
import { WithSidebar } from "./WithSidebar";

const meta = {
  title: "Layout/WithSidebar",
  component: WithSidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WithSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const children = (
  <>
    <SanityBlockContent blocks={getBlocks({ length: 1, heading: true })} />
    <SanityBlockContent blocks={getBlocks({ length: 2, heading: true })} />
    <SanityBlockContent blocks={getBlocks({ length: 2, heading: true })} />
    <SanityBlockContent blocks={getBlocks({ length: 2, heading: true })} />
  </>
);

const baseItem = { slug: "/123", tag: "beta" as const, sidebarindex: null };

const sidebar = [
  {
    pages: [
      { ...baseItem, kategori: "primitives", heading: "f", sidebarindex: 0 },
      { ...baseItem, kategori: "primitives", heading: "e", sidebarindex: 1 },
      {
        ...baseItem,
        kategori: "primitives",
        heading: "d",
        tag: "deprecated" as const,
        sidebarindex: 2,
      },
    ],
    title: "Primitives",
    value: "primitives",
  },
  {
    pages: [
      { ...baseItem, kategori: "core", heading: "b" },
      {
        ...baseItem,
        kategori: "core",
        heading: "c",
        tag: "deprecated" as const,
      },
    ],
    title: "Core",
    value: "core",
  },
];

export const KomponenterLanding: Story = {
  args: {
    children,
    pageType: {
      type: "komponenter",
      title: "Heading",
      rootUrl: "/komponenter",
      rootTitle: "Komponenter",
    },
    pageProps: { content: "1" },
    variant: "landingPage",
    footer: "footer",
    intro: "intro",
    sidebar,
  },
};

export const Komponenter: Story = {
  args: {
    children,
    pageType: {
      type: "komponenter",
      title: "Heading",
      rootUrl: "/komponenter",
      rootTitle: "Komponenter",
    },
    pageProps: { content: "1" },
    variant: "page",
    footer: "footer",
    intro: "intro",
    sidebar,
  },
};
