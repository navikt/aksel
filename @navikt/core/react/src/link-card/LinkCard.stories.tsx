import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { SparklesIcon } from "@navikt/aksel-icons";
import { Box } from "../primitives/box";
import { HGrid } from "../primitives/grid";
import { HStack, VStack } from "../primitives/stack";
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
        <Tag size="small">Tag 1</Tag>
        <Tag size="small">Tag 2</Tag>
        <Tag size="small">Tag 3</Tag>
        <Tag size="small">Tag 4</Tag>
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
        <HStack gap="space-8">
          <Tag size="small" variant="info">
            Tag 1
          </Tag>
          <Tag size="small" variant="neutral">
            Tag 2
          </Tag>
        </HStack>
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
    <LinkCard arrow={false}>
      <IconDemo />
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const NoArrowWithRichContent: Story = {
  render: () => (
    <LinkCard arrow={false}>
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

export const CenteredArrow: Story = {
  render: () => (
    <LinkCard arrowPosition="center">
      <IconDemo />
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const CenteredArrowWithRichContent: Story = {
  render: () => (
    <LinkCard arrowPosition="center">
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

export const Image: Story = {
  render: () => (
    <LinkCard>
      <LinkCardImage>
        <img src="https://picsum.photos/id/237/400" alt="alt-placeholder" />
      </LinkCardImage>
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const ImageWithAspectRatio: Story = {
  render: () => (
    <LinkCard>
      <LinkCardImage aspectRatio="16/10">
        <img
          src="https://picsum.photos/id/237/400"
          alt="alt-placeholder"
          width="400px"
        />
      </LinkCardImage>
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const ImageWithArbitraryAspectRatio: Story = {
  render: () => (
    <LinkCard>
      <LinkCardImage aspectRatio="4/2">
        <img
          src="https://picsum.photos/id/237/400"
          alt="alt-placeholder"
          width="400px"
        />
      </LinkCardImage>
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const ImageWithIcon: Story = {
  render: () => (
    <LinkCard>
      <LinkCardImage aspectRatio="16/10">
        <img
          src="https://picsum.photos/id/237/400"
          alt="alt-placeholder"
          width="400px"
        />
      </LinkCardImage>
      <IconDemo />
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const ImageWithPictureTag: Story = {
  render: () => (
    <LinkCard>
      <LinkCardImage aspectRatio="16/10">
        <picture>
          <source
            srcSet="https://picsum.photos/id/237/400"
            width="400px"
            media="(orientation: portrait)"
          />
          <img
            src="https://picsum.photos/id/231/400"
            alt="alt-placeholder"
            width="400px"
          />
        </picture>
      </LinkCardImage>
      <IconDemo />
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const ImageEmulatingNextjsStatic: Story = {
  render: () => (
    <LinkCard>
      <LinkCardImage aspectRatio="16/10">
        <span
          style={{
            boxSizing: "border-box",
            display: "inline-block",
            overflow: "hidden",
            width: "400px",
            height: "400px",
            background: "none",
            opacity: "1",
            border: "0px",
            margin: "0px",
            padding: "0px",
            position: "relative",
          }}
        >
          <img
            src="https://picsum.photos/id/237/400"
            alt="alt-placeholder"
            decoding="async"
            sizes="100vw"
            style={{
              position: "absolute",
              inset: "0px",
              boxSizing: "border-box",
              padding: "0px",
              border: "none",
              margin: "auto",
              display: "block",
              width: "0px",
              height: "0px",
              minWidth: "100%",
              maxWidth: "100%",
              minHeight: "100%",
              maxHeight: "100%",
              objectFit: "cover",
            }}
          />
        </span>
      </LinkCardImage>
      <IconDemo />
      <LinkCardTitle>
        <LinkCardAnchor href="/#">Title</LinkCardAnchor>
      </LinkCardTitle>
    </LinkCard>
  ),
};

export const ImageEmulatingNextjsFill: Story = {
  render: () => (
    <LinkCard>
      <LinkCardImage aspectRatio="16/10">
        <span
          style={{
            boxSizing: "border-box",
            display: "inline-block",
            overflow: "hidden",
            width: "initial",
            height: "initial",
            background: "none",
            opacity: "1",
            border: "0px",
            margin: "0px",
            padding: "0px",
            position: "absolute",
            inset: "0px",
          }}
        >
          <img
            src="https://picsum.photos/id/866/400"
            alt="alt-placeholder"
            decoding="async"
            sizes="100vw"
            style={{
              position: "absolute",
              inset: "0px",
              boxSizing: "border-box",
              padding: "0px",
              border: "none",
              margin: "auto",
              display: "block",
              width: "0px",
              height: "0px",
              minWidth: "100%",
              maxWidth: "100%",
              minHeight: "100%",
              maxHeight: "100%",
              objectFit: "cover",
            }}
          />
        </span>
      </LinkCardImage>
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
      <LinkCard size="small">
        <LinkCardTitle>
          <LinkCardAnchor href="/#">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </LinkCardAnchor>
        </LinkCardTitle>
        <LinkCardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </LinkCardDescription>
        <LinkCardFooter>
          <FooterContentDemo />
        </LinkCardFooter>
      </LinkCard>
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
        <h2>Description</h2>
        {Description.render?.(...args)}
      </div>
      <div>
        <h2>DescriptionWithMultiline</h2>
        {DescriptionWithMultiline.render?.(...args)}
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
        <h2>CenteredArrow</h2>
        {CenteredArrow.render?.(...args)}
      </div>
      <div>
        <h2>CenteredArrowWithRichContent</h2>
        {CenteredArrowWithRichContent.render?.(...args)}
      </div>
      <div>
        <h2>SizeMedium</h2>
        {SizeMedium.render?.(...args)}
      </div>
      <div>
        <h2>SizeSmall</h2>
        {SizeSmall.render?.(...args)}
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
        <h2>ImageEmulatingNextjsFill</h2>
        {ImageEmulatingNextjsFill.render?.(...args)}
      </div>
      <div>
        <h2>ImageEmulatingNextjsStatic</h2>
        {ImageEmulatingNextjsStatic.render?.(...args)}
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
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};

export const UUDemo: Story = {
  render: () => (
    <div lang="nb">
      <h1>Demo tittel</h1>
      <h2>
        Demoen består av to ulike måter å bruke LinkCard på. Den første bruker
        en H3 som tittel, og den andre bruker en span. I tillegg er den andre
        demoen i en liste for å emulere realistisk bruk. Selve
        LinkCard-komponenten består av tittel, beskrivelse, ikon og footer.
      </h2>
      <VStack
        as="section"
        gap="space-12"
        aria-label="Demo med LinkCard som har en tittel og beskrivelse. Tittelen er en H2"
      >
        <h2>Demo 1 start</h2>
        <LinkCard>
          <IconDemo />
          <LinkCardTitle as="h3">
            <LinkCardAnchor href="https://aksel.nav.no/">
              Komponent-tittel 1
            </LinkCardAnchor>
          </LinkCardTitle>
          <LinkCardDescription>
            Komponent-description 1. Denne inneholder ofte en del lengre innhold
            som vi ikke ønsker at skal forstyrre skjermleser.
          </LinkCardDescription>
          <LinkCardFooter>
            <FooterContentDemo />
          </LinkCardFooter>
        </LinkCard>
        <LinkCard>
          <IconDemo />
          <LinkCardTitle as="h3">
            <LinkCardAnchor href="https://aksel.nav.no/">
              Komponent-tittel 2
            </LinkCardAnchor>
          </LinkCardTitle>
          <LinkCardDescription>
            Komponent-description 2. Denne inneholder ofte en del lengre innhold
            som vi ikke ønsker at skal forstyrre skjermleser.
          </LinkCardDescription>
          <LinkCardFooter>
            <FooterContentDemo />
          </LinkCardFooter>
        </LinkCard>
        <LinkCard>
          <IconDemo />
          <LinkCardTitle as="h3">
            <LinkCardAnchor href="https://aksel.nav.no/">
              Komponent-tittel 3
            </LinkCardAnchor>
          </LinkCardTitle>
          <LinkCardDescription>
            Komponent-description 3. Denne inneholder ofte en del lengre innhold
            som vi ikke ønsker at skal forstyrre skjermleser.
          </LinkCardDescription>
          <LinkCardFooter>
            <FooterContentDemo />
          </LinkCardFooter>
        </LinkCard>
        <h2>Demo 1 slutt</h2>
      </VStack>
      <br />
      <VStack
        as="section"
        gap="space-12"
        aria-label="Demo med LinkCard som har en tittel og beskrivelse. Tittelen er en span, og ligger i en liste"
      >
        <h2>Demo 2 start</h2>
        <ul>
          <li>
            <LinkCard>
              <IconDemo />
              <LinkCardTitle>
                <LinkCardAnchor href="https://aksel.nav.no/">
                  Komponent-tittel 1
                </LinkCardAnchor>
              </LinkCardTitle>
              <LinkCardDescription>
                Komponent-description 1. Denne inneholder ofte en del lengre
                innhold som vi ikke ønsker at skal forstyrre skjermleser.
              </LinkCardDescription>
              <LinkCardFooter>
                <FooterContentDemo />
              </LinkCardFooter>
            </LinkCard>
          </li>
          <li>
            <LinkCard>
              <IconDemo />
              <LinkCardTitle>
                <LinkCardAnchor href="https://aksel.nav.no/">
                  Komponent-tittel 2
                </LinkCardAnchor>
              </LinkCardTitle>
              <LinkCardDescription>
                Komponent-description 2. Denne inneholder ofte en del lengre
                innhold som vi ikke ønsker at skal forstyrre skjermleser.
              </LinkCardDescription>
              <LinkCardFooter>
                <FooterContentDemo />
              </LinkCardFooter>
            </LinkCard>
          </li>
          <li>
            <LinkCard>
              <IconDemo />
              <LinkCardTitle>
                <LinkCardAnchor href="https://aksel.nav.no/">
                  Komponent-tittel 3
                </LinkCardAnchor>
              </LinkCardTitle>
              <LinkCardDescription>
                Komponent-description 3. Denne inneholder ofte en del lengre
                innhold som vi ikke ønsker at skal forstyrre skjermleser.
              </LinkCardDescription>
              <LinkCardFooter>
                <FooterContentDemo />
              </LinkCardFooter>
            </LinkCard>
          </li>
        </ul>
        <h2>Demo 2 slutt</h2>
      </VStack>
    </div>
  ),
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
    <Box
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
    </Box>
  );
}
