import React from "react";
import type { Meta } from "@storybook/react";
import { BodyLong } from "../../typography";
import { Box } from "./Box";
import { HGrid, HStack, VStack } from "../..";

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

export const Card = {
  render: () => {
    const Card = ({ children }) => (
      <HStack gap="4">
        <Box
          padding="4"
          background="surface-action-subtle"
          borderColor="border-default"
          borderRadius="xlarge"
        >
          {children}
        </Box>
      </HStack>
    );

    return (
      <HStack gap="8">
        <Card>
          <h1>Card one</h1>
          <BodyLong>
            This is inside a box. Deserunt veniam eu fugiat ad est occaecat
            aliqua nisi aliquip. Aute amet occaecat ex aliqua irure elit labore
            pariatur. Proident pariatur proident pariatur magna consequat velit
            id commodo quis sunt tempor ullamco aliquip pariatur.
          </BodyLong>
        </Card>
        <Card>
          <h1>Card two</h1>
          <BodyLong>
            This is inside a box. Deserunt veniam eu fugiat ad est occaecat
            aliqua nisi aliquip. Aute amet occaecat ex aliqua irure elit labore
            pariatur. Proident pariatur proident pariatur magna consequat velit
            id commodo quis sunt tempor ullamco aliquip pariatur.
          </BodyLong>
        </Card>
        <Card>
          <h1>Card three</h1>
          <BodyLong>
            This is inside a box. Deserunt veniam eu fugiat ad est occaecat
            aliqua nisi aliquip. Aute amet occaecat ex aliqua irure elit labore
            pariatur. Proident pariatur proident pariatur magna consequat velit
            id commodo quis sunt tempor ullamco aliquip pariatur.
          </BodyLong>
        </Card>
      </HStack>
    );
  },
};

export const ThemingDemo = {
  render: () => {
    const LinkCard = ({ children }) => (
      <Box padding="4" background="surface-default">
        {children}
      </Box>
    );

    const SpecificLinkCard = () => {
      return (
        <div
          style={
            {
              "--a-linkcard-bg": "var(--a-surface-success-subtle)",
              "--a-linkcard-bg-hover": "var(--a-surface-success-moderate)",
            } as React.CSSProperties
          }
        >
          <LinkCard>Custom-stylet LinkCard som bruker Box som base</LinkCard>
        </div>
      );
    };

    return (
      <VStack gap="8">
        {/* Default look */}
        <LinkCard>Dette er et Card som bruker Box som base</LinkCard>
        {/* Themed/Custom look */}
        <SpecificLinkCard />
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
    <div>
      <Box padding="4">
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

export const WithHGrid = () => {
  return (
    <Box background="bg-default">
      <HGrid
        gap="6"
        columns={{ xs: "repeat(auto-fit, minmax(10rem, 1fr))", md: 4 }}
      >
        <Box>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
        <Box>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
        <Box>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
        <Box>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Box>
      </HGrid>
    </Box>
  );
};
