import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, Detail, Heading } from "../../typography";
import { HGrid } from "../grid";
import { HStack, VStack } from "../stack";
import { Box, BoxProps } from "./Box";

const meta: Meta<typeof Box> = {
  title: "ds-react/Primitives/Box",
  component: Box,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Default = () => (
  <Box>
    <BodyLong>
      This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
      nisi aliquip. Aute amet occaecat ex aliqua irure elit labore pariatur.
      Proident pariatur proident pariatur magna consequat velit id commodo quis
      sunt tempor ullamco aliquip pariatur.
    </BodyLong>
  </Box>
);

export const BackgroundTypes = () => (
  <VStack gap="space-24">
    <Box padding="space-16" background="brand-beige-moderate">
      Static color
    </Box>
    <Box padding="space-16" background="moderate">
      Dynamic themed app theme
    </Box>
    <div data-color="danger">
      <Box padding="space-16" background="moderate">
        Dynamic themed danger
      </Box>
    </div>
    <Box padding="space-16" background="sunken">
      Default tokens
    </Box>
  </VStack>
);

const Card = ({
  background,
  borderRadius = "12",
  children,
}: Pick<BoxProps, "background" | "borderRadius" | "children">) => (
  <Box
    padding="space-16"
    background={background}
    borderColor="neutral-subtle"
    borderRadius={borderRadius}
    borderWidth="1"
  >
    <div style={{ width: "20rem" }}>{children}</div>
  </Box>
);

export const AsCard = () => (
  <HStack gap="space-16" justify="center">
    <Card>
      <h1>Card one</h1>
      <BodyLong>
        This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
        nisi aliquip. Aute amet occaecat ex aliqua irure elit labore
      </BodyLong>
    </Card>
    <Card>
      <h1>Card two</h1>
      <BodyLong>
        This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
        nisi aliquip. Aute amet occaecat ex aliqua irure elit labore
      </BodyLong>
    </Card>
    <Card>
      <h1>Card three</h1>
      <BodyLong>
        This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
        nisi aliquip. Aute amet occaecat ex aliqua irure elit labore
      </BodyLong>
    </Card>
  </HStack>
);

export const ThemingDemo = () => {
  const LinkCard = () => {
    return (
      <>
        <style>
          {`
            .link-card {
              color: var(--navds-color-text-primary);
              text-decoration: none;
            }
            .link-card:hover {
              border-color: var(--ax-border-accent-strong);
            }
            .link-card:hover .aksel-heading {
              color: var(--ax-text-accent-subtle);
              text-decoration: underline;
            }
            .link-card:hover .link-card__chevron,
            .link-card:focus-within .link-card__chevron {
              transform: translateX(4px);
            }
            .link-card__chevron {
              flex-shrink: 0;
              font-size: 1.5rem;
              transition: transform 200ms;
            }
          `}
        </style>
        <Box
          as="a"
          href="#"
          className="link-card"
          borderRadius="2"
          borderColor="neutral"
          borderWidth="1"
          padding="space-16"
          onClick={() => alert("Clicked!")}
        >
          <HStack gap="space-16" align="center">
            <VStack gap="space-8">
              <Heading size="medium">
                LinkCard som bruker Box, HStack og VStack
              </Heading>
              <BodyLong>This truly is inside a box!</BodyLong>
            </VStack>
            <ChevronRightIcon fontSize={24} className="link-card__chevron" />
          </HStack>
        </Box>
      </>
    );
  };

  const ChatBubble = () => {
    return (
      <Box
        background="neutral-soft"
        padding="space-16"
        borderRadius="12 12 12 0"
      >
        <VStack gap="space-8">
          <Detail>BOX • 01.01.21 14:00</Detail>
          <BodyLong>
            Hei! Dette er en chatbobble som bruker Box som base!
          </BodyLong>
        </VStack>
      </Box>
    );
  };

  const PricePill = () => {
    return (
      <>
        <style>
          {`
              .old-price {
                text-decoration: line-through;
              }
            `}
        </style>
        <HStack>
          <Box
            background="success-soft"
            padding="space-16"
            borderRadius="full 0 0 full"
          >
            <VStack align="center">
              <Detail>Episk ny pris</Detail>
              <Heading size="medium">889.99 kr</Heading>
            </VStack>
          </Box>
          <Box
            background="danger-soft"
            padding="space-16"
            borderRadius="0 full full 0"
          >
            <VStack align="center">
              <Detail>Førpris</Detail>
              <Heading className="old-price" size="medium">
                399.99 kr
              </Heading>
            </VStack>
          </Box>
        </HStack>
      </>
    );
  };

  return (
    <VStack gap="space-32">
      <Card>Dette er et Card som bruker Box som base</Card>
      <LinkCard />
      <ChatBubble />
      <PricePill />
    </VStack>
  );
};

export const PaddingBreakpoints = {
  render: () => (
    <div>
      <Box
        padding={{
          xs: "space-8",
          sm: "space-12",
          md: "space-16",
          lg: "space-20",
          xl: "space-24",
          "2xl": "space-32",
        }}
        background="neutral-strong"
      >
        <Box background="accent-moderate">
          This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
          nisi aliquip. Aute amet occaecat ex aliqua irure elit labore pariatur.
          Proident pariatur proident pariatur magna consequat velit id commodo
          quis sunt tempor ullamco aliquip pariatur.
        </Box>
      </Box>
    </div>
  ),
};

export const PaddingBreakpointsInherit1 = {
  render: () => (
    <div>
      <Box
        padding={{ xs: "space-8" }}
        paddingInline={{ md: "space-96 space-0" }}
        background="neutral-strong"
      >
        <Box background="accent-moderate">
          This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
          nisi aliquip. Aute amet occaecat ex aliqua irure elit labore pariatur.
          Proident pariatur proident pariatur magna consequat velit id commodo
          quis sunt tempor ullamco aliquip pariatur.
        </Box>
      </Box>
    </div>
  ),
};
export const PaddingBreakpointsInherit2 = () => (
  <div>
    <Box
      padding={{ xs: "space-8", sm: "space-12" }}
      paddingInline={{ sm: "space-16 space-0", md: "space-96 space-0" }}
      background="neutral-strong"
    >
      <Box background="accent-moderate">
        This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
        nisi aliquip. Aute amet occaecat ex aliqua irure elit labore pariatur.
        Proident pariatur proident pariatur magna consequat velit id commodo
        quis sunt tempor ullamco aliquip pariatur.
      </Box>
    </Box>
  </div>
);

export const Padding = () => (
  <VStack align="center" gap="space-8">
    <Box padding="space-80" background="accent-moderate">
      <BodyLong>Padding all around</BodyLong>
    </Box>
    <Box
      padding="space-4"
      paddingBlock="space-80 space-0"
      background="accent-moderate"
    >
      <BodyLong>Padding to the North</BodyLong>
    </Box>
    <Box
      padding="space-4"
      paddingInline="space-0 space-80"
      background="accent-moderate"
    >
      <BodyLong>Padding to the East</BodyLong>
    </Box>
    <Box
      padding="space-4"
      paddingBlock="space-0 space-80"
      background="accent-moderate"
    >
      <BodyLong>Padding to the South</BodyLong>
    </Box>
    <Box
      padding="space-4"
      paddingInline="space-80 space-0"
      background="accent-moderate"
    >
      <BodyLong>Padding to the West</BodyLong>
    </Box>
  </VStack>
);

export const BoxInBox = () => (
  <div>
    <Box
      padding={{ xs: "space-8", sm: "space-12" }}
      paddingInline={{ sm: "space-16 space-4" }}
      background="accent-soft"
      borderWidth="2"
      borderColor="accent-strong"
      borderRadius="8"
    >
      <Box
        padding="space-32"
        paddingInline={{ sm: "space-48" }}
        background="default"
      >
        <Box background="accent-moderate">
          CSS variables on a Box should not be inherited by children.
        </Box>
      </Box>
    </Box>
  </div>
);

export const WithHGrid = () => {
  return (
    <Box background="neutral-soft" padding="space-40">
      <HGrid
        gap="space-24"
        columns={{ xs: "repeat(auto-fit, minmax(10rem, 1fr))", md: 4 }}
      >
        <Box padding="space-16" background="neutral-moderate">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
        <Box padding="space-16" background="neutral-moderate">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
        <Box padding="space-16" background="neutral-moderate">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
        <Box padding="space-16" background="neutral-moderate">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
      </HGrid>
    </Box>
  );
};

export const BorderWidth = () => (
  <VStack gap="space-16">
    <Box
      background="neutral-moderate"
      padding="space-40"
      borderWidth="2"
      borderColor="neutral-strong"
    >
      Box
    </Box>
    <Box
      background="neutral-moderate"
      padding="space-40"
      borderWidth="1 2 3 4"
      borderColor="neutral-strong"
    >
      Box
    </Box>
    <Box
      background="neutral-moderate"
      padding="space-40"
      borderWidth="5 2 4 1"
      borderColor="neutral-strong"
      borderRadius="8"
    >
      Box
    </Box>
  </VStack>
);

export const BorderRadius = () => (
  <VStack gap="space-16">
    <Box
      background="neutral-moderate"
      padding="space-40"
      borderWidth="2"
      borderColor="neutral-strong"
      borderRadius="2 4 8 12"
    >
      Box
    </Box>
    <Box
      background="neutral-moderate"
      padding="space-40"
      borderWidth="2"
      borderColor="neutral-strong"
      borderRadius="2 4 8 12"
    >
      Box
    </Box>
    <Box
      background="neutral-moderate"
      padding="space-40"
      borderWidth="2"
      borderColor="neutral-strong"
      borderRadius={{
        xs: "2 4 8 12",
        md: "4 2 8 full",
        lg: "12 8",
      }}
    >
      Box
    </Box>

    <Box
      background="neutral-moderate"
      padding="space-40"
      borderWidth="2"
      borderColor="neutral-strong"
      borderRadius={{
        xs: "2 4 8 12",
        md: "4 2 8 full",
        lg: "12 8",
      }}
    >
      Box
    </Box>
  </VStack>
);

export const MarginDemo = () => (
  <VStack gap="space-16">
    <Box borderWidth="1">
      <Box
        background="accent-moderate"
        margin="space-20"
        marginInline={{ xs: "space-80", lg: "space-40" }}
      >
        Box
      </Box>
    </Box>
  </VStack>
);

export const PaddingDemo = () => (
  <VStack gap="space-16">
    <Box
      background="neutral-moderate"
      padding="space-20"
      paddingInline={{ xs: "space-80", lg: "space-40" }}
    >
      Box
    </Box>
  </VStack>
);

export const AsChild = () => (
  <VStack gap="space-16">
    <Box borderRadius="8" padding="space-16" asChild>
      <button onClick={() => alert("clicked")}>Box is now a button</button>
    </Box>
  </VStack>
);

export const Chromatic: Story = {
  render: () => (
    <VStack gap="space-8">
      <div>
        <h2>Default</h2>
        <Default />
      </div>
      <div>
        <h2>As card</h2>
        <AsCard />
      </div>
      <div>
        <h2>Theming demo</h2>
        <ThemingDemo />
      </div>
      <div>
        <h2>Padding breakpoints</h2>
        <PaddingBreakpoints.render />
      </div>
      <div>
        <h2>Padding breakpoints inherit 1</h2>
        <PaddingBreakpointsInherit1.render />
      </div>
      <div>
        <h2>Padding breakpoints inherit 2</h2>
        <PaddingBreakpointsInherit2 />
      </div>
      <div>
        <h2>Padding</h2>
        <Padding />
      </div>
      <div>
        <h2>Box in box</h2>
        <BoxInBox />
      </div>
      <div>
        <h2>With HGrid</h2>
        <WithHGrid />
      </div>
      <div>
        <h2>Border width</h2>
        <BorderWidth />
      </div>
      <div>
        <h2>Border radius</h2>
        <BorderRadius />
      </div>
      <div>
        <h2>Padding demo</h2>
        <PaddingDemo />
      </div>
    </VStack>
  ),
  parameters: {
    chromatic: {
      disable: false,
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
  },
};
