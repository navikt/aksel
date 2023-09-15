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

export const KomponenterLanding: Story = {
  args: {
    children: "children content",
    pageType: {
      type: "Komponenter",
      title: "Heading",
    },
    pageProps: { content: "1" },
    variant: "landingPage",
    withToc: true,
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
    children: "children content",
    pageType: {
      type: "Komponenter",
      title: "Heading",
    },
    pageProps: { content: "1" },
    variant: "page",
    withToc: true,
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
