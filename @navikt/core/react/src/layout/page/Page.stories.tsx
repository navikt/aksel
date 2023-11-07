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
};

export default meta;

export const Default: StoryFn = ({
  belowFold,
  background,
  width,
  gutters,
  contentBlockPadding,
}) => (
  <Page
    footer={<Footer width={width} gutters={gutters} />}
    footerPosition={belowFold ? "belowFold" : undefined}
    background={background}
    contentBlockPadding={contentBlockPadding}
  >
    <Header width={width} gutters={gutters} />
    <Content width={width} gutters={gutters} />
  </Page>
);

Default.argTypes = {
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
  contentBlockPadding: {
    control: "radio",
    options: ["end", "none"],
  },
};

Default.args = {
  belowFold: false,
  gutters: false,
  contentBlockPadding: "end",
};

export const BelowFold: StoryFn = () => (
  <Page
    footer={<Footer />}
    footerPosition="belowFold"
    contentBlockPadding="end"
  >
    <Header />
    <Content />
  </Page>
);

export const Background: StoryFn = () => (
  <VStack gap="4">
    <Page background="bg-default">default</Page>
    <Page background="bg-subtle">subtle</Page>
  </VStack>
);

export const ContentBlockPadding: StoryFn = () => (
  <Page footer={<Footer width="laptop" gutters />} contentBlockPadding="end">
    <Header width="laptop" gutters />
    <Page.Block width="laptop" gutters as="main">
      <Box background="surface-alt-3-subtle" style={{ height: "80vh" }}>
        Main
      </Box>
    </Page.Block>
  </Page>
);

export const Gutters: StoryFn = () => (
  <Page footer={<Footer width="laptop" gutters />}>
    <Header width="laptop" gutters />
    <Content width="laptop" gutters />
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

export const WithDecorator: StoryFn = () => {
  return (
    <Page
      contentBlockPadding="end"
      footerPosition="belowFold"
      footer={<div id="decorator-footer"></div>}
    >
      <div id="decorator-header"></div>
      <Content width="laptop" gutters />
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

export const OutsideBackground = () => {
  return (
    <Page
      contentBlockPadding="end"
      footer={
        <Box
          background="surface-alt-3-subtle"
          style={{ height: 100 }}
          as="footer"
        >
          <Page.Block width="laptop" gutters>
            Footer
          </Page.Block>
        </Box>
      }
    >
      <Box background="surface-alt-1-subtle" style={{ height: 64 }} as="header">
        <Page.Block width="laptop" gutters>
          Header
        </Page.Block>
      </Box>
      <Box background="surface-alt-2-subtle" style={{ height: 300 }} as="main">
        <Page.Block width="laptop" gutters>
          main
        </Page.Block>
      </Box>
    </Page>
  );
};

function Header({ width = "laptop", gutters = false }: any) {
  return (
    <Page.Block as="header" width={width} gutters={gutters}>
      <Box background="surface-alt-3-subtle" style={{ height: 64 }}>
        Header
      </Box>
    </Page.Block>
  );
}

function Content({ width = "laptop", gutters = false }: any) {
  return (
    <Page.Block width={width} gutters={gutters} as="main">
      <Box background="surface-alt-3-subtle" style={{ height: 300 }}>
        Main
      </Box>
    </Page.Block>
  );
}

function Footer({ width = "laptop", gutters = false }: any) {
  return (
    <Page.Block width={width} gutters={gutters} as="footer">
      <Box background="surface-alt-3-subtle" style={{ height: 100 }}>
        Footer
      </Box>
    </Page.Block>
  );
}
