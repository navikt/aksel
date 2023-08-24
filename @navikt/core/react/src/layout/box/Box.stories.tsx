import React from "react";
import type { Meta } from "@storybook/react";
import { BodyLong } from "../../typography";
import { Box } from "./Box";
import { VStack } from "../..";

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

/*
  padding,
  paddingBlockStart,
  paddingBlockEnd,
  paddingInlineStart,
  paddingInlineEnd

  padding="4"
  padding={{ top: 4, bottom: 4, left: 4, right: 4 }}
*/
/* 
box.padding ? box.padding : 
*/

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

export const PaddingBreakpointsInherit = {
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
