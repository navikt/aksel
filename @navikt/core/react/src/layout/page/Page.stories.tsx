import bgColors from "@navikt/ds-tokens/src/colors-bg.json";
import type { Meta, StoryFn } from "@storybook/react";
import React, { useEffect } from "react";
import { Box } from "../box";
import { VStack } from "../stack";
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

export const Background: StoryFn = () => (
  <VStack gap="4">
    <Page background="bg-default">default</Page>
    <Page background="bg-subtle">subtle</Page>
  </VStack>
);

export const ContentPadding: StoryFn = ({ width = "laptop-xl" }) => (
  <Page footer={<Footer width={width} gutters />} contentPadding>
    <Header width={width} gutters />
    <Page.Block width={width} gutters as="main">
      <Box background="surface-alt-3-subtle" style={{ height: "80vh" }}>
        Main
      </Box>
    </Page.Block>
  </Page>
);

export const Gutters: StoryFn = ({ width = "laptop" }) => (
  <Page footer={<Footer width={width} gutters />}>
    <Header width={width} gutters />
    <Content width={width} gutters />
  </Page>
);

Gutters.parameters = {
  chromatic: {
    modes: {
      mobile_portrait: {
        viewport: {
          width: 400,
          height: 850,
        },
      },
      desktop: {
        viewport: {
          width: 1280,
          height: 960,
        },
      },
    },
  },
};

const MILJO_URL = "https://www.nav.no/dekoratoren";

export const WithDecorator: StoryFn = ({
  width = "laptop",
  gutters = true,
}) => {
  return (
    <Page
      contentPadding
      footerPosition="belowFold"
      footer={<div id="decorator-footer"></div>}
    >
      <div id="decorator-header"></div>
      <Content width={width} gutters={gutters} />
      <div
        id="decorator-env"
        data-src={`${MILJO_URL}/env?context=privatperson`}
      ></div>
    </Page>
  );
};

WithDecorator.decorators = [
  (Story) => {
    useEffect(() => {
      const script = document.createElement("script");
      script.src = `${MILJO_URL}/client.js`;
      script.async = true;
      document.body.appendChild(script);

      const styles = document.createElement("link");
      styles.href = `${MILJO_URL}/css/client.css`;
      styles.rel = "stylesheet";
      document.head.appendChild(styles);

      return () => {
        document.body.removeChild(script);
        document.head.removeChild(styles);
      };
    }, []);

    return <Story />;
  },
];

function Header({ width, gutters }) {
  return (
    <Page.Block as="header" width={width} gutters={gutters}>
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
