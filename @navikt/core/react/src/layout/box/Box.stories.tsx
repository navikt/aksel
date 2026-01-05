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

const Card = ({
  background,
  borderRadius = "xlarge",
  children,
}: Pick<BoxProps, "background" | "borderRadius" | "children">) => (
  <Box
    padding="4"
    background={background}
    borderColor="neutral-subtle"
    borderRadius={borderRadius}
    borderWidth="1"
  >
    <div style={{ width: "20rem" }}>{children}</div>
  </Box>
);

export const AsCard = () => (
  <HStack gap="4" justify="center">
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
          borderRadius="small"
          borderColor="neutral"
          borderWidth="1"
          padding="4"
          onClick={() => alert("Clicked!")}
        >
          <HStack gap="4" align="center">
            <VStack gap="2">
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
        padding="4"
        borderRadius="xlarge xlarge xlarge 0"
      >
        <VStack gap="2">
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
            padding="4"
            borderRadius="full 0 0 full"
          >
            <VStack align="center">
              <Detail>Episk ny pris</Detail>
              <Heading size="medium">889.99 kr</Heading>
            </VStack>
          </Box>
          <Box
            background="danger-soft"
            padding="4"
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
    <VStack gap="8">
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
        padding={{ xs: "2", sm: "3", md: "4", lg: "5", xl: "6", "2xl": "8" }}
        background="neutral-moderate"
      >
        <Box background="accent-strong">
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
        padding={{ xs: "2" }}
        paddingInline={{ md: "24 0" }}
        background="neutral-moderate"
      >
        <Box background="accent-strong">
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
      padding={{ xs: "2", sm: "3" }}
      paddingInline={{ sm: "4 0", md: "24 0" }}
      background="neutral-moderate"
    >
      <Box background="accent-strong">
        This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
        nisi aliquip. Aute amet occaecat ex aliqua irure elit labore pariatur.
        Proident pariatur proident pariatur magna consequat velit id commodo
        quis sunt tempor ullamco aliquip pariatur.
      </Box>
    </Box>
  </div>
);

export const Padding = () => (
  <VStack align="center" gap="2">
    <Box padding="20" background="accent-strong">
      <BodyLong>Padding all around</BodyLong>
    </Box>
    <Box padding="1" paddingBlock="20 0" background="accent-strong">
      <BodyLong>Padding to the North</BodyLong>
    </Box>
    <Box padding="1" paddingInline="0 20" background="accent-strong">
      <BodyLong>Padding to the East</BodyLong>
    </Box>
    <Box padding="1" paddingBlock="0 20" background="accent-strong">
      <BodyLong>Padding to the South</BodyLong>
    </Box>
    <Box padding="1" paddingInline="20 0" background="accent-strong">
      <BodyLong>Padding to the West</BodyLong>
    </Box>
  </VStack>
);

export const BoxInBox = () => (
  <div>
    <Box
      padding={{ xs: "2", sm: "3" }}
      paddingInline={{ sm: "4 1" }}
      background="accent-soft"
      borderWidth="2"
      borderColor="accent-strong"
      borderRadius="large"
    >
      <Box padding="8" paddingInline={{ sm: "12" }} background="default">
        <Box background="accent-moderate">
          CSS variables on a Box should not be inherited by children.
        </Box>
      </Box>
    </Box>
  </div>
);

export const WithHGrid = () => {
  return (
    <Box background="neutral-soft" padding="10">
      <HGrid
        gap="6"
        columns={{ xs: "repeat(auto-fit, minmax(10rem, 1fr))", md: 4 }}
      >
        <Box padding="4" background="neutral-moderate">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
        <Box padding="4" background="neutral-moderate">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
        <Box padding="4" background="neutral-moderate">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
        <Box padding="4" background="neutral-moderate">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
      </HGrid>
    </Box>
  );
};

export const BorderWidth = () => (
  <VStack gap="4">
    <Box
      background="neutral-moderate"
      padding="10"
      borderWidth="2"
      borderColor="neutral-strong"
    >
      Box
    </Box>
    <Box
      background="neutral-moderate"
      padding="10"
      borderWidth="1 2 3 4"
      borderColor="neutral-strong"
    >
      Box
    </Box>
    <Box
      background="neutral-moderate"
      padding="10"
      borderWidth="5 2 4 1"
      borderColor="neutral-strong"
      borderRadius="large"
    >
      Box
    </Box>
  </VStack>
);

export const BorderRadius = () => (
  <VStack gap="4">
    <Box
      background="neutral-moderate"
      padding="10"
      borderWidth="2"
      borderColor="neutral-strong"
      borderRadius="small medium large xlarge"
    >
      Box
    </Box>
    <Box
      background="neutral-moderate"
      padding="10"
      borderWidth="2"
      borderColor="neutral-strong"
      borderRadius="2 4 8 12"
    >
      Box
    </Box>
    <Box
      background="neutral-moderate"
      padding="10"
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
      padding="10"
      borderWidth="2"
      borderColor="neutral-strong"
      borderRadius={{
        xs: "small medium large xlarge",
        md: "medium small large full",
        lg: "xlarge large",
      }}
    >
      Box
    </Box>
  </VStack>
);

export const MarginDemo = () => (
  <VStack gap="4">
    <Box borderWidth="1">
      <Box
        background="accent-moderate"
        margin="5"
        marginInline={{ xs: "20", lg: "10" }}
      >
        Box
      </Box>
    </Box>
  </VStack>
);

export const PaddingDemo = () => (
  <VStack gap="4">
    <Box
      background="neutral-moderate"
      padding="5"
      paddingInline={{ xs: "20", lg: "10" }}
    >
      Box
    </Box>
  </VStack>
);

export const AsChild = () => (
  <VStack gap="4">
    <Box borderRadius="large" padding="4" asChild>
      <button onClick={() => alert("clicked")}>Box is now a button</button>
    </Box>
  </VStack>
);

export const Chromatic: Story = {
  render: () => (
    <VStack gap="2">
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
