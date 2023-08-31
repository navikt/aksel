import React, { ReactNode } from "react";
import type { Meta } from "@storybook/react";
import { BodyLong, Detail, Heading } from "../../typography";
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
    shadow="xsmall"
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
            {`
            .link-card {
              color: var(--navds-color-text-primary);
              text-decoration: none;
            }
            .link-card:hover .navds-heading {
              color: var(--a-text-action);
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
            borderColor={{ default: "border-default", hover: "border-action" }}
            padding="4"
            paddingInlineStart="4"
            shadow={{ hover: "small" }}
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
        <>
          <Box
            background="surface-neutral-subtle"
            shadow="xsmall"
            padding="4"
            borderRadius="xlarge"
            borderRadiusEndStart="small"
          >
            <VStack gap="2">
              <Detail>BOX • 01.01.21 14:00</Detail>
              <BodyLong>
                Hei! Dette er en chatbobble som bruker Box som base!
              </BodyLong>
            </VStack>
          </Box>
        </>
      );
    };

    return (
      <VStack gap="8">
        <Card>Dette er et Card som bruker Box som base</Card>
        <LinkCard />
        <ChatBubble />
      </VStack>
    );
  },
};

export const PaddingBreakpoints = {
  render: () => (
    <div>
      <Box
        padding={{ xs: "2", sm: "3", md: "4", lg: "5", xl: "6" }}
        borderColor="border-default"
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

export const PaddingBreakpointsInherit1 = {
  render: () => (
    <div>
      <Box
        padding={{ xs: "2" }}
        paddingInlineStart={{ md: "24" }}
        borderColor="border-default"
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
export const PaddingBreakpointsInherit2 = {
  render: () => (
    <div>
      <Box
        padding={{ xs: "2", sm: "3" }}
        paddingInlineStart={{ sm: "4", md: "24" }}
        borderColor="border-default"
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
        <Box padding="20" borderColor="border-default">
          <BodyLong>Padding all around</BodyLong>
        </Box>
        <Box padding="1" paddingBlockStart="20" borderColor="border-default">
          <BodyLong>Padding to the North</BodyLong>
        </Box>
        <Box padding="1" paddingInlineEnd="20" borderColor="border-default">
          <BodyLong>Padding to the East</BodyLong>
        </Box>
        <Box padding="1" paddingBlockEnd="20" borderColor="border-default">
          <BodyLong>Padding to the South</BodyLong>
        </Box>
        <Box padding="1" paddingInlineStart="20" borderColor="border-default">
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
