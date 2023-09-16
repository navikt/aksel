import type { Meta, StoryObj } from "@storybook/react";
import { WithSidebar } from "./WithSidebar";
import { SanityBlockContent } from "@/sanity-block";
import { getBlocks } from "@/sb-util";

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

export const KomponenterLanding: Story = {
  args: {
    children,
    pageType: {
      type: "Komponenter",
      title: "Heading",
    },
    pageProps: { content: "1" },
    variant: "landingPage",
    footer: "footer",
    intro: "intro",
    sidebar: [
      {
        heading: "Link 1",
        slug: "#",
        kategori: "core",
        tag: "ready",
        sidebarindex: null,
      },
      {
        heading: "Link 2",
        slug: "#",
        kategori: "primitives",
        tag: "ready",
        sidebarindex: null,
      },
      {
        heading: "Link e",
        slug: "#",
        kategori: "primitives",
        tag: "ready",
        sidebarindex: null,
      },
    ],
  },
};

export const Komponenter: Story = {
  args: {
    children,
    pageType: {
      type: "Komponenter",
      title: "Heading",
    },
    pageProps: { content: "1" },
    variant: "page",
    footer: "footer",
    intro: "intro",
    sidebar: [
      {
        heading: "Link 1",
        slug: "#",
        kategori: "core",
        tag: "ready",
        sidebarindex: null,
      },
      {
        heading: "Link 2",
        slug: "#",
        kategori: "primitives",
        tag: "ready",
        sidebarindex: null,
      },
      {
        heading: "Link 3",
        slug: "#",
        kategori: "primitives",
        tag: "ready",
        sidebarindex: null,
      },
    ],
  },
};
