import React, { ReactNode } from "react";
import type { Meta } from "@storybook/react";
import { BodyLong, Heading } from "../../typography";
import { Box } from "./Box";
import { HGrid, HStack, VStack } from "../..";
import { BackgroundColors, BorderRadii } from "./types";
import { ChevronRightIcon } from "@navikt/aksel-icons";

export default {
  title: "ds-react/Box",
  component: Box,
} satisfies Meta<typeof Box>;

export const Default = {
  render: () => (
    <Box>
      <BodyLong>
        This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
        nisi aliquip. Aute amet occaecat ex aliqua irure elit labore pariatur.
        Proident pariatur proident pariatur magna consequat velit id commodo
        quis sunt tempor ullamco aliquip pariatur.
      </BodyLong>
    </Box>
  ),
};

const Card = ({
  background,
  borderRadius = "xlarge",
  children,
}: {
  background?: BackgroundColors;
  borderRadius?: BorderRadii;
  children: ReactNode;
}) => (
  <Box
    padding="4"
    background={background}
    borderColor="border-subtle"
    borderRadius={borderRadius}
  >
    <div style={{ width: "20rem" }}>{children}</div>
  </Box>
);

export const AsCard = {
  render: () => {
    return (
      <HStack gap="4" justify="center">
        <Card>
          <h1>Card one</h1>
          <BodyLong>
            This is inside a box. Deserunt veniam eu fugiat ad est occaecat
            aliqua nisi aliquip. Aute amet occaecat ex aliqua irure elit labore
          </BodyLong>
        </Card>
        <Card>
          <h1>Card two</h1>
          <BodyLong>
            This is inside a box. Deserunt veniam eu fugiat ad est occaecat
            aliqua nisi aliquip. Aute amet occaecat ex aliqua irure elit labore
          </BodyLong>
        </Card>
        <Card>
          <h1>Card three</h1>
          <BodyLong>
            This is inside a box. Deserunt veniam eu fugiat ad est occaecat
            aliqua nisi aliquip. Aute amet occaecat ex aliqua irure elit labore
          </BodyLong>
        </Card>
      </HStack>
    );
  },
};

export const ThemingDemo = {
  render: () => {
    const LinkCard = () => {
      return (
        <>
          <style>
            {" "}
            {/** complex / nested CSS selectors... a better way? */}
            {`
            .link-card:hover .navds-heading {
              color: var(--a-text-action);
              text-decoration: underline;
            }
          `}
          </style>
          <Box
            className="link-card"
            borderRadius="small"
            borderColor="border-default"
            padding="4"
            paddingBlockEnd="10" // this prop seems broken?
            paddingInlineStart="4"
            paddingInlineEnd="2"
            borderColorHover="border-action"
            onClick={() => alert("Clicked!")}
          >
            <HStack gap="4" align="center">
              <VStack gap="2">
                <Heading size="medium">
                  LinkCard som bruker Box, HStack og VStack
                </Heading>
                <BodyLong>This truly is inside a box!</BodyLong>
              </VStack>
              <ChevronRightIcon fontSize={24} />
            </HStack>
          </Box>
        </>
      );
    };

    const ChatBubble = () => {
      return <Box>Chatbobble som bruker Box som base</Box>;
    };

    return (
      <VStack gap="8">
        {/* Default look */}
        <Card>Dette er et Card som bruker Box som base</Card>
        {/* Themed/Custom look */}
        <LinkCard />
        <ChatBubble />
      </VStack>
    );
  },
};

export const OverridingAvTokens = {
  render: () => {
    const LinkCard = () => {
      return (
        <div
          style={
            {
              "--ac-box-background": "var(--a-surface-success-subtle)",
              "--ac-box-background-hover": "var(--a-surface-success-moderate)",
            } as React.CSSProperties
          }
        >
          <Card borderRadius="small">
            <h3>Overriding av tokens til Card (som bruker Box som base)</h3>
          </Card>
        </div>
      );
    };

    return (
      <VStack gap="8">
        {/* Default look */}
        <Card>Dette er et Card som bruker Box som base</Card>
        {/* Themed/Custom look */}
        <LinkCard />
      </VStack>
    );
  },
};

export const PaddingBreakpoints = {
  render: () => (
    <div>
      <Box padding={{ xs: "2", sm: "3", md: "4", lg: "5", xl: "6" }}>
        <BodyLong>
          This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
          nisi aliquip. Aute amet occaecat ex aliqua irure elit labore pariatur.
          Proident pariatur proident pariatur magna consequat velit id commodo
          quis sunt tempor ullamco aliquip pariatur.
        </BodyLong>
      </Box>
    </div>
  ),
};

export const PaddingBreakpointsInherit1 = {
  render: () => (
    <div>
      <Box padding={{ xs: "2" }} paddingInlineStart={{ md: "24" }}>
        <BodyLong>
          This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
          nisi aliquip. Aute amet occaecat ex aliqua irure elit labore pariatur.
          Proident pariatur proident pariatur magna consequat velit id commodo
          quis sunt tempor ullamco aliquip pariatur.
        </BodyLong>
      </Box>
    </div>
  ),
};
export const PaddingBreakpointsInherit2 = {
  render: () => (
    <div>
      <Box
        padding={{ xs: "2", sm: "3" }}
        paddingInlineStart={{ sm: "4", md: "24" }}
      >
        <BodyLong>
          This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
          nisi aliquip. Aute amet occaecat ex aliqua irure elit labore pariatur.
          Proident pariatur proident pariatur magna consequat velit id commodo
          quis sunt tempor ullamco aliquip pariatur.
        </BodyLong>
      </Box>
    </div>
  ),
};

export const Padding = {
  render: () => (
    <>
      <style>
        {`
          .navds-box {
            width: fit-content;
          }
        `}
      </style>
      <VStack align="center">
        <Box padding="20">
          <BodyLong>Padding all around</BodyLong>
        </Box>
        <Box padding="1" paddingBlockStart="20">
          <BodyLong>Padding to the North</BodyLong>
        </Box>
        <Box padding="1" paddingInlineEnd="20">
          <BodyLong>Padding to the East</BodyLong>
        </Box>
        <Box padding="1" paddingBlockEnd="20">
          <BodyLong>Padding to the South</BodyLong>
        </Box>
        <Box padding="1" paddingInlineStart="20">
          <BodyLong>Padding to the West</BodyLong>
        </Box>
      </VStack>
    </>
  ),
};

export const WithHGrid = () => {
  return (
    <Box background="bg-subtle" padding="10">
      <HGrid
        gap="6"
        columns={{ xs: "repeat(auto-fit, minmax(10rem, 1fr))", md: 4 }}
      >
        <Box padding="4" background="bg-default">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
        <Box padding="4" background="bg-default">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
        <Box padding="4" background="bg-default">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
        <Box padding="4" background="bg-default">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
      </HGrid>
    </Box>
  );
};
