import bgColors from "@navikt/ds-tokens/src/colors-bg.json";
import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { Box } from "../box";
import { Page } from "./Page";
import { widths } from "./parts/PageBlock";

const meta: Meta = {
  title: "ds-react/Primitives/Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },

  argTypes: {
    width: {
      control: "radio",
      options: widths,
    },
    background: {
      control: "radio",
      options: Object.keys(bgColors.a),
    },
    belowFold: {
      control: "boolean",
    },
    gutters: {
      control: "boolean",
    },
  },
};

export default meta;

export const Default: StoryFn = ({ belowFold, background, width, gutters }) => (
  <Page
    footer={<Footer width={width} gutters={gutters} />}
    footerPosition={belowFold ? "belowFold" : undefined}
    background={background}
  >
    <Header width={width} gutters={gutters} />
    <Content width={width} gutters={gutters} />
  </Page>
);

Default.args = {
  belowFold: false,
  gutters: false,
};

export const BelowFold: StoryFn = ({ width, gutters }) => (
  <Page
    footer={<Footer width={width} gutters={gutters} />}
    footerPosition="belowFold"
  >
    <Header width={width} gutters={gutters} />
    <Content width={width} gutters={gutters} />
  </Page>
);

function Header({ width, gutters }) {
  return (
    <Page.Block width={width} gutters={gutters} as="header">
      <Box background="surface-alt-3-subtle" style={{ height: 64 }}>
        Header
      </Box>
    </Page.Block>
  );
}

function Content({ width, gutters }) {
  return (
    <Page.Block width={width} gutters={gutters} as="main">
      <Box background="surface-alt-3-subtle" style={{ height: 300 }}>
        Main
      </Box>
    </Page.Block>
  );
}

function Footer({ width, gutters }) {
  return (
    <Page.Block width={width} gutters={gutters} as="footer">
      <Box background="surface-alt-3-subtle" style={{ height: 100 }}>
        Footer
      </Box>
    </Page.Block>
  );
}
