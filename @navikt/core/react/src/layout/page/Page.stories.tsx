import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { Box } from "../box";
import { Page } from "./Page";

const meta: Meta<typeof Page> = {
  title: "ds-react/Primitives/Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: StoryFn = () => (
  <Page footer={<Footer />}>
    <Header />
    <Content />
  </Page>
);

export const BelowFold: StoryFn = () => (
  <Page footer={<Footer />} footerPosition="belowFold">
    <Header />
    <Content />
  </Page>
);

function Header() {
  return (
    <Box as="header" background="surface-alt-3-subtle" style={{ height: 64 }}>
      Header
    </Box>
  );
}

function Content() {
  return (
    <Box as="main" background="surface-alt-3-subtle" style={{ height: 200 }}>
      Content
    </Box>
  );
}

function Footer() {
  return (
    <Box as="footer" background="surface-alt-3-subtle" style={{ height: 100 }}>
      Footer
    </Box>
  );
}
