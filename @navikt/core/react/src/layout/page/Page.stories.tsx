import bgColors from "@navikt/ds-tokens/src/colors-bg.json";
import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { Bleed } from "../bleed";
import { Box } from "../box";
import Page from "./Page";
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
    contentPadding: {
      control: "boolean",
    },
  },
};

export default meta;

export const Default: StoryFn = ({
  belowFold,
  background,
  width,
  gutters,
  contentPadding,
}) => (
  <Page
    footer={<Footer width={width} gutters={gutters} />}
    footerPosition={belowFold ? "belowFold" : undefined}
    background={background}
    contentPadding={contentPadding}
  >
    <Header width={width} gutters={gutters} />
    <Content width={width} gutters={gutters} />
  </Page>
);

Default.args = {
  belowFold: false,
  gutters: false,
  contentPadding: false,
};

export const BelowFold: StoryFn = ({ width, gutters, contentPadding }) => (
  <Page
    footer={<Footer width={width} gutters={gutters} />}
    footerPosition="belowFold"
    contentPadding={contentPadding}
  >
    <Header width={width} gutters={gutters} />
    <Content width={width} gutters={gutters} />
  </Page>
);

function Header({ width, gutters }) {
  return (
    <Box as="header" background="surface-alt-3-subtle" style={{ height: 64 }}>
      <Page.Block width={width} gutters={gutters}>
        Header
      </Page.Block>
    </Box>
  );
}

function Content({ width, gutters }) {
  return (
    <Page.Block width={width} gutters={gutters} as="main">
      <Bleed marginInline="full full" asChild>
        <Box background="surface-alt-3-subtle" style={{ height: 300 }}>
          Main
        </Box>
      </Bleed>
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
