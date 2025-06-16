import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SparklesIcon } from "@navikt/aksel-icons";
import { BoxNew } from "../layout/box";
import { HGrid } from "../layout/grid";
import { HStack } from "../layout/stack";
import { Tag } from "../tag";
import { LinkAnchor, LinkAnchorOverlay } from "./LinkAnchor";
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

export const Default: Story = {
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

export const Title: Story = {
  render: () => (
    <LinkCard>
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const TitleWithMutliline: Story = {
  render: () => (
    <LinkCard style={{ maxWidth: 200 }}>
      <LinkCardTitle>
        <LinkCardAnchor href="/#">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const Description: Story = {
  render: () => (
    <LinkCard>
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
        placeat eos nesciunt aut quae ad maiores incidunt ducimus veritatis
        velit.
      </LinkCardDescription>
    </LinkCard>
  ),
};

export const DescriptionWithMultiline: Story = {
  render: () => (
    <LinkCard style={{ maxWidth: 200 }}>
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </LinkCardDescription>
    </LinkCard>
  ),
};

export const Footer: Story = {
  render: () => (
    <LinkCard>
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardFooter>
        <FooterContentDemo />
      </LinkCardFooter>
    </LinkCard>
  ),
};

export const FooterWithMultiline: Story = {
  render: () => (
    <LinkCard style={{ maxWidth: 200 }}>
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardFooter>
        <FooterContentDemo />
        <FooterContentDemo />
      </LinkCardFooter>
    </LinkCard>
  ),
};

export const DescriptionAndFooter: Story = {
  render: () => (
    <LinkCard>
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </LinkCardDescription>
      <LinkCardFooter>
        <FooterContentDemo />
      </LinkCardFooter>
    </LinkCard>
  ),
};

export const Icon: Story = {
  render: () => (
    <LinkCard>
      <LinkCardIcon>
        <SparklesIcon fontSize="2rem" />
      </LinkCardIcon>
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const IconWithBackground: Story = {
  render: () => (
    <LinkCard>
      <IconDemo />
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const IconWithDescriptionAndFooter: Story = {
  render: () => (
    <LinkCard>
      <IconDemo />
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </LinkCardDescription>
      <LinkCardFooter>
        <FooterContentDemo />
      </LinkCardFooter>
    </LinkCard>
  ),
};

export const NoArrow: Story = {
  render: () => (
    <LinkCard hasArrow={false}>
      <IconDemo />
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const NoArrowWithRichContent: Story = {
  render: () => (
    <LinkCard hasArrow={false}>
      <IconDemo />
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </LinkCardDescription>
      <LinkCardFooter>
        <FooterContentDemo />
      </LinkCardFooter>
    </LinkCard>
  ),
};

export const Image: Story = {
  render: () => (
    <LinkCard>
      <LinkCardImage alt="alt-placeholder" src="https://picsum.photos/400" />
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const ImageWithAspectRatio: Story = {
  render: () => (
    <LinkCard>
      <LinkCardImage
        alt="alt-placeholder"
        src="https://picsum.photos/400"
        aspectRatio="16/10"
      />
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const ImageWithArbitraryAspectRatio: Story = {
  render: () => (
    <LinkCard>
      <LinkCardImage
        alt="alt-placeholder"
        src="https://picsum.photos/400"
        aspectRatio="4/2"
      />
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const ImageWithIcon: Story = {
  render: () => (
    <LinkCard>
      <LinkCardImage
        alt="alt-placeholder"
        src="https://picsum.photos/400"
        aspectRatio="16/10"
      />
      <IconDemo />
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const GridWithTitle: Story = {
  render: (...args) => (
    <HGrid gap="space-24" columns="repeat(auto-fit, minmax(300px, 1fr))">
      {Title.render?.(...args)}
      {Title.render?.(...args)}
      {Title.render?.(...args)}
    </HGrid>
  ),
  parameters: {
    layout: "padded",
  },
};

export const GridWithTitleAndMultiline: Story = {
  render: (...args) => (
    <HGrid gap="space-24" columns="repeat(auto-fit, minmax(300px, 1fr))">
      {Title.render?.(...args)}
      <LinkCard>
        <LinkCardTitle>
          <LinkCardAnchor href="/#">
            Title with a rather long text that will most likely wrap across
            multiple lines.
          </LinkCardAnchor>
        </LinkCardTitle>
      </LinkCard>
      {Title.render?.(...args)}
    </HGrid>
  ),
  parameters: {
    layout: "padded",
  },
};

export const GridWithDescriptionAndFooter: Story = {
  render: (...args) => (
    <HGrid gap="space-24" columns="repeat(auto-fit, minmax(300px, 1fr))">
      {DescriptionAndFooter.render?.(...args)}
      {DescriptionAndFooter.render?.(...args)}
      {DescriptionAndFooter.render?.(...args)}
    </HGrid>
  ),
  parameters: {
    layout: "padded",
  },
};

export const GridWithDifferentHeights: Story = {
  render: (...args) => (
    <HGrid gap="space-24" columns="repeat(auto-fit, minmax(300px, 1fr))">
      {DescriptionAndFooter.render?.(...args)}
      {Description.render?.(...args)}
      {Title.render?.(...args)}
      {Footer.render?.(...args)}
    </HGrid>
  ),
  parameters: {
    layout: "padded",
  },
};

export const GridWithIcon: Story = {
  render: (...args) => (
    <HGrid gap="space-24" columns="repeat(auto-fit, minmax(300px, 1fr))">
      {Icon.render?.(...args)}
      {Icon.render?.(...args)}
      {Icon.render?.(...args)}
    </HGrid>
  ),
  parameters: {
    layout: "padded",
  },
};

export const GridWithImage: Story = {
  render: (...args) => (
    <HGrid gap="space-24" columns="repeat(auto-fit, minmax(300px, 1fr))">
      {ImageWithAspectRatio.render?.(...args)}
      {ImageWithAspectRatio.render?.(...args)}
      {ImageWithAspectRatio.render?.(...args)}
    </HGrid>
  ),
  parameters: {
    layout: "padded",
  },
};

export const GridWithIconAndDescriptionAndFooter: Story = {
  render: (...args) => (
    <HGrid gap="space-24" columns="repeat(auto-fit, minmax(300px, 1fr))">
      {IconWithDescriptionAndFooter.render?.(...args)}
      {IconWithDescriptionAndFooter.render?.(...args)}
      {IconWithDescriptionAndFooter.render?.(...args)}
    </HGrid>
  ),
  parameters: {
    layout: "padded",
  },
};

export const ColorRole: Story = {
  render: () => (
    <HGrid gap="space-24" columns="repeat(auto-fit, minmax(300px, 1fr))">
      <LinkCard>
        <IconDemo />
        <LinkCardTitle>
          <LinkCardAnchor href="/#">Default color</LinkCardAnchor>
        </LinkCardTitle>
        <LinkCardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </LinkCardDescription>
        <LinkCardFooter>
          <FooterContentDemo />
        </LinkCardFooter>
      </LinkCard>
      <LinkCard data-color="brand-magenta">
        <IconDemo />
        <LinkCardTitle>
          <LinkCardAnchor href="/#">Brand magenta</LinkCardAnchor>
        </LinkCardTitle>
        <LinkCardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </LinkCardDescription>
        <LinkCardFooter>
          <FooterContentDemo />
        </LinkCardFooter>
      </LinkCard>
      <LinkCard data-color="brand-beige">
        <IconDemo />
        <LinkCardTitle>
          <LinkCardAnchor href="/#">Brand beige</LinkCardAnchor>
        </LinkCardTitle>
        <LinkCardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </LinkCardDescription>
        <LinkCardFooter>
          <FooterContentDemo />
        </LinkCardFooter>
      </LinkCard>
    </HGrid>
  ),
  parameters: {
    layout: "padded",
  },
};

/* Chromatic setup */
export const Chromatic: Story = {
  render: () => <div>Chromatic</div>,
  parameters: {
    chromatic: { disable: false },
  },
};

/* Utilities */
function FooterContentDemo() {
  return (
    <HStack gap="space-8">
      <Tag size="small" variant="info">
        Tag 1
      </Tag>
      <Tag size="small" variant="neutral">
        Tag 2
      </Tag>
    </HStack>
  );
}

function IconDemo() {
  return (
    <BoxNew
      asChild
      padding="space-8"
      borderRadius="12"
      style={{ backgroundColor: "var(--ax-bg-moderate)" }}
    >
      <LinkCardIcon>
        <SparklesIcon fontSize="2rem" />
      </LinkCardIcon>
    </BoxNew>
  );
}
