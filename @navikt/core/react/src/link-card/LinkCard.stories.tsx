import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SparklesIcon } from "@navikt/aksel-icons";
import { BoxNew } from "../layout/box";
import { HGrid } from "../layout/grid";
import { HStack, VStack } from "../layout/stack";
import { Tag } from "../tag";
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

export const TitleSizeXLarge: Story = {
  render: () => (
    <LinkCard>
      <LinkCardTitle size="xlarge">
        <LinkCardAnchor href="/#">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const TitleSizeLarge: Story = {
  render: () => (
    <LinkCard>
      <LinkCardTitle size="large">
        <LinkCardAnchor href="/#">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const TitleSizeMedium: Story = {
  render: () => (
    <LinkCard>
      <LinkCardTitle size="medium">
        <LinkCardAnchor href="/#">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const TitleSizeSmall: Story = {
  render: () => (
    <LinkCard>
      <LinkCardTitle size="small">
        <LinkCardAnchor href="/#">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const TitleSizeXSmall: Story = {
  render: () => (
    <LinkCard>
      <LinkCardTitle size="xsmall">
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

export const DescriptionLarge: Story = {
  render: () => (
    <LinkCard>
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardDescription size="large">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
        placeat eos nesciunt aut quae ad maiores incidunt ducimus veritatis
        velit.
      </LinkCardDescription>
    </LinkCard>
  ),
};

export const DescriptionMedium: Story = {
  render: () => (
    <LinkCard>
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardDescription size="medium">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
        placeat eos nesciunt aut quae ad maiores incidunt ducimus veritatis
        velit.
      </LinkCardDescription>
    </LinkCard>
  ),
};

export const DescriptionSmall: Story = {
  render: () => (
    <LinkCard>
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardDescription size="small">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
        placeat eos nesciunt aut quae ad maiores incidunt ducimus veritatis
        velit.
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

export const SizeMedium: Story = {
  render: () => (
    <LinkCard size="medium">
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

export const SizeSmall: Story = {
  render: () => (
    <LinkCard size="small">
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

export const SizeWithSubComponentOverrides: Story = {
  render: () => (
    <LinkCard size="medium">
      <IconDemo />
      <LinkCardTitle size="large">
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardDescription size="small">
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

export const Pressed: Story = {
  render: () => (
    <LinkCard isPressed>
      <IconDemo />
      <LinkCardTitle>
        <LinkCardAnchor href="/#" aria-current>
          Title
        </LinkCardAnchor>
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

export const ColorRoleWithPressed: Story = {
  render: () => (
    <HGrid gap="space-24" columns="repeat(auto-fit, minmax(300px, 1fr))">
      <LinkCard isPressed>
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
      <LinkCard isPressed data-color="brand-magenta">
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
      <LinkCard isPressed data-color="brand-beige">
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
  render: (...args) => (
    <VStack gap="space-16">
      <div>
        <h2>Title</h2>
        {Title.render?.(...args)}
      </div>
      <div>
        <h2>TitleWithMutliline</h2>
        {TitleWithMutliline.render?.(...args)}
      </div>
      <div>
        <h2>TitleSizeXLarge</h2>
        {TitleSizeLarge.render?.(...args)}
      </div>
      <div>
        <h2>TitleSizeXLarge</h2>
        {TitleSizeLarge.render?.(...args)}
      </div>
      <div>
        <h2>TitleSizeMedium</h2>
        {TitleSizeMedium.render?.(...args)}
      </div>
      <div>
        <h2>TitleSizeSmall</h2>
        {TitleSizeSmall.render?.(...args)}
      </div>
      <div>
        <h2>TitleSizeXSmall</h2>
        {TitleSizeXSmall.render?.(...args)}
      </div>
      <div>
        <h2>Description</h2>
        {Description.render?.(...args)}
      </div>
      <div>
        <h2>DescriptionWithMultiline</h2>
        {DescriptionWithMultiline.render?.(...args)}
      </div>
      <div>
        <h2>DescriptionLarge</h2>
        {DescriptionLarge.render?.(...args)}
      </div>
      <div>
        <h2>DescriptionMedium</h2>
        {DescriptionMedium.render?.(...args)}
      </div>
      <div>
        <h2>DescriptionSmall</h2>
        {DescriptionSmall.render?.(...args)}
      </div>
      <div>
        <h2>Footer</h2>
        {Footer.render?.(...args)}
      </div>
      <div>
        <h2>FooterWithMultiline</h2>
        {FooterWithMultiline.render?.(...args)}
      </div>
      <div>
        <h2>DescriptionAndFooter</h2>
        {DescriptionAndFooter.render?.(...args)}
      </div>
      <div>
        <h2>Icon</h2>
        {Icon.render?.(...args)}
      </div>
      <div>
        <h2>IconWithBackground</h2>
        {IconWithBackground.render?.(...args)}
      </div>
      <div>
        <h2>IconWithDescriptionAndFooter</h2>
        {IconWithDescriptionAndFooter.render?.(...args)}
      </div>
      <div>
        <h2>NoArrow</h2>
        {NoArrow.render?.(...args)}
      </div>
      <div>
        <h2>NoArrowWithRichContent</h2>
        {NoArrowWithRichContent.render?.(...args)}
      </div>
      <div>
        <h2>Image</h2>
        {Image.render?.(...args)}
      </div>
      <div>
        <h2>ImageWithAspectRatio</h2>
        {ImageWithAspectRatio.render?.(...args)}
      </div>
      <div>
        <h2>ImageWithArbitraryAspectRatio</h2>
        {ImageWithArbitraryAspectRatio.render?.(...args)}
      </div>
      <div>
        <h2>ImageWithIcon</h2>
        {ImageWithIcon.render?.(...args)}
      </div>
      <div>
        <h2>Pressed</h2>
        {Pressed.render?.(...args)}
      </div>
      <div>
        <h2>GridWithTitle</h2>
        {GridWithTitle.render?.(...args)}
      </div>
      <div>
        <h2>GridWithTitleAndMultiline</h2>
        {GridWithTitleAndMultiline.render?.(...args)}
      </div>
      <div>
        <h2>GridWithDescriptionAndFooter</h2>
        {GridWithDescriptionAndFooter.render?.(...args)}
      </div>
      <div>
        <h2>GridWithDifferentHeights</h2>
        {GridWithDifferentHeights.render?.(...args)}
      </div>
      <div>
        <h2>GridWithIcon</h2>
        {GridWithIcon.render?.(...args)}
      </div>
      <div>
        <h2>GridWithImage</h2>
        {GridWithImage.render?.(...args)}
      </div>
      <div>
        <h2>GridWithIconAndDescriptionAndFooter</h2>
        {GridWithIconAndDescriptionAndFooter.render?.(...args)}
      </div>
      <div>
        <h2>ColorRole</h2>
        {ColorRole.render?.(...args)}
      </div>
      <div>
        <h2>ColorRoleWithPressed</h2>
        {ColorRoleWithPressed.render?.(...args)}
      </div>
    </VStack>
  ),
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
      style={{
        backgroundColor: "var(--ax-bg-moderateA)",
        border: "1px solid var(--ax-border-subtleA)",
      }}
    >
      <LinkCardIcon>
        <SparklesIcon fontSize="2rem" />
      </LinkCardIcon>
    </BoxNew>
  );
}
