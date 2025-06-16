import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SparklesIcon } from "@navikt/aksel-icons";
import { BoxNew } from "../layout/box";
import { HGrid } from "../layout/grid";
import { HStack, VStack } from "../layout/stack";
import { Heading } from "../typography";
import { LinkAnchor, LinkAnchorArrow, LinkAnchorOverlay } from "./LinkAnchor";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardIcon,
  LinkCardImage,
  LinkCardTitle,
} from "./LinkCard";

type Story = StoryObj<typeof LinkCard>;

export default {
  title: "ds-react/LinkCard",
  component: LinkCard,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof LinkCard>;

export const Default: StoryObj = {
  render: () => {
    return (
      <HGrid gap="space-32" columns="repeat(auto-fit, minmax(300px, 1fr))">
        <LinkCard>
          <LinkCardTitle as="span">
            <LinkCardAnchor href="https://aksel.nav.no/">Tittel</LinkCardAnchor>
          </LinkCardTitle>
        </LinkCard>

        <LinkCard hasArrow={false}>
          <LinkCardTitle as="span">
            <LinkCardAnchor href="https://aksel.nav.no/">
              Tittel with no arrow
            </LinkCardAnchor>
          </LinkCardTitle>
        </LinkCard>

        <LinkCard>
          <LinkCardTitle as="h2">
            <LinkCardAnchor href="/href">Tittel</LinkCardAnchor>
          </LinkCardTitle>
          <LinkCardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            placeat eos nesciunt aut quae ad maiores incidunt ducimus veritatis
            velit.
          </LinkCardDescription>
        </LinkCard>

        <LinkCard>
          <LinkCardImage
            src="https://aksel.nav.no/images/og/ikoner/og-ikoner.png"
            alt="alt-test"
          />
          <LinkCardTitle as="h2">
            <LinkCardAnchor href="/href">Tittel</LinkCardAnchor>
          </LinkCardTitle>
          <LinkCardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            placeat eos nesciunt aut quae ad maiores incidunt ducimus veritatis
            velit.
          </LinkCardDescription>
        </LinkCard>
        <LinkCard>
          <LinkCardImage
            src="https://aksel.nav.no/images/og/ikoner/og-ikoner.png"
            alt="alt-test"
            aspectRatio="16/10"
          />
          <LinkCardTitle as="h2">
            <LinkCardAnchor href="/href">Tittel</LinkCardAnchor>
          </LinkCardTitle>
          <LinkCardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            placeat eos nesciunt aut quae ad maiores incidunt ducimus veritatis
            velit.
          </LinkCardDescription>
        </LinkCard>
        <LinkCard>
          <LinkCardTitle as="h2">
            <LinkCardAnchor href="/href">Tittel</LinkCardAnchor>
          </LinkCardTitle>
          <LinkCardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            placeat eos nesciunt aut quae ad maiores incidunt ducimus veritatis
            velit.
          </LinkCardDescription>
          <LinkCardFooter>
            Footer Footer Footer Footer Footer Footer Footer Footer Footer
            Footer Footer Footer
          </LinkCardFooter>
        </LinkCard>
        <LinkCard>
          <BoxNew
            asChild
            background="accent-moderateA"
            padding="space-8"
            borderRadius="12"
          >
            <LinkCardIcon>
              <SparklesIcon fontSize="2rem" />
            </LinkCardIcon>
          </BoxNew>
          <LinkCardTitle as="h2">
            <LinkCardAnchor href="/href">Tittel</LinkCardAnchor>
          </LinkCardTitle>
        </LinkCard>
        <LinkCard>
          <BoxNew
            asChild
            background="accent-moderateA"
            padding="space-8"
            borderRadius="12"
          >
            <LinkCardIcon>
              <SparklesIcon fontSize="2rem" />
            </LinkCardIcon>
          </BoxNew>
          <LinkCardTitle as="h2">
            <LinkCardAnchor href="/href">Tittel</LinkCardAnchor>
          </LinkCardTitle>
          <LinkCardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            placeat eos nesciunt aut quae ad maiores incidunt ducimus veritatis
            velit.
          </LinkCardDescription>
        </LinkCard>

        <LinkCard>
          <BoxNew
            asChild
            background="accent-moderateA"
            padding="space-8"
            borderRadius="12"
          >
            <LinkCardIcon>
              <SparklesIcon fontSize="2rem" />
            </LinkCardIcon>
          </BoxNew>
          <LinkCardTitle as="h2">
            <LinkCardAnchor href="/href">Tittel</LinkCardAnchor>
          </LinkCardTitle>
          <LinkCardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            placeat eos nesciunt aut quae ad maiores incidunt ducimus veritatis
            velit.
          </LinkCardDescription>
          <LinkCardFooter>
            Footer Footer Footer Footer Footer Footer Footer Footer Footer
            Footer Footer Footer
          </LinkCardFooter>
        </LinkCard>
        <LinkAnchor href="#">LINK ANCHOR</LinkAnchor>
        <LinkAnchorOverlay asChild>
          <div style={{ padding: "2rem", border: "1px solid red" }}>
            <LinkAnchor href="#123">Custom LinkAnchor</LinkAnchor>
          </div>
        </LinkAnchorOverlay>
      </HGrid>
    );
  },
};

export const LinkAnchorDemo: StoryObj = {
  render: () => {
    return (
      <VStack gap="space-8">
        <HStack gap="space-4" align="center" asChild>
          <LinkAnchor href="https://aksel.nav.no/">
            LinkAnchor
            <LinkAnchorArrow />
          </LinkAnchor>
        </HStack>
        <HStack gap="space-4" align="center" asChild>
          <LinkAnchor href="https://aksel.nav.no/">
            LinkAnchor
            <LinkAnchorArrow />
          </LinkAnchor>
        </HStack>
        <HStack gap="space-4" align="center" asChild>
          <LinkAnchor href="https://aksel.nav.no/">
            LinkAnchor
            <LinkAnchorArrow />
          </LinkAnchor>
        </HStack>
        <HStack gap="space-4" align="center" asChild>
          <LinkAnchor href="https://aksel.nav.no/">
            LinkAnchor
            <LinkAnchorArrow />
          </LinkAnchor>
        </HStack>
      </VStack>
    );
  },
};

export const LinkAnchorNavNoDemo: StoryObj = {
  render: () => {
    return (
      <VStack gap="space-0">
        <LinkAnchor href="https://aksel.nav.no/" asChild>
          <BoxNew
            borderWidth="1 0 0 0"
            padding="space-8"
            borderColor="neutral"
            asChild
          >
            <HStack gap="space-8" align="center" asChild>
              <Heading size="medium" as="a">
                <LinkAnchorArrow />
                LinkAnchor
              </Heading>
            </HStack>
          </BoxNew>
        </LinkAnchor>
        <LinkAnchor href="https://aksel.nav.no/" asChild>
          <BoxNew
            borderWidth="1 0 0 0"
            padding="space-8"
            borderColor="neutral"
            asChild
          >
            <HStack gap="space-8" align="center" asChild>
              <Heading size="medium" as="a">
                <LinkAnchorArrow />
                LinkAnchor
              </Heading>
            </HStack>
          </BoxNew>
        </LinkAnchor>
        <LinkAnchor href="https://aksel.nav.no/" asChild>
          <BoxNew
            borderWidth="1 0 1 0"
            padding="space-8"
            borderColor="neutral"
            asChild
          >
            <HStack gap="space-8" align="center" asChild>
              <Heading size="medium" as="a">
                <LinkAnchorArrow />
                LinkAnchor
              </Heading>
            </HStack>
          </BoxNew>
        </LinkAnchor>
      </VStack>
    );
  },
};

export const Chromatic: Story = {
  render: () => <div>Chromatic</div>,
  parameters: {
    chromatic: { disable: false },
  },
};
