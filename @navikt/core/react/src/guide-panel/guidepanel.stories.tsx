import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { InformationIcon } from "@navikt/aksel-icons";
import { Link } from "../link";
import { VStack } from "../primitives/stack";
import { BodyLong } from "../typography";
import { renderStoriesForChromatic } from "../utils/renderStoriesForChromatic";
import GuidePanel from "./GuidePanel";

type Story = StoryObj<typeof GuidePanel>;

export default {
  title: "ds-react/GuidePanel",
  component: GuidePanel,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof GuidePanel>;

const panelText = (
  <>
    Sit sint eu dolore reprehenderit exercitation labore aute anim sit
    adipisicing proident. Tempor ipsum ea cupidatat qui esse do veniam
    cupidatat. Excepteur irure reprehenderit esse tempor nisi duis qui ea enim
    id. <Link href="#">Link</Link>
  </>
);

export const Default: Story = {
  argTypes: {
    poster: {
      control: {
        type: "boolean",
      },
    },
  },
  args: {
    children: panelText,
  },
};

export const PosterVariants: Story = {
  render: () => (
    <VStack gap="space-24" align="start">
      <GuidePanel>
        If you exclude the `poster` prop, you will get the poster variant on
        mobile (&lt;480px) and the non-poster variant otherwise.
      </GuidePanel>
      <GuidePanel poster>
        Use the `poster` prop to get the poster variant on all viewports.
      </GuidePanel>
      <GuidePanel poster={false}>
        Set `poster=false` to get the non-poster variant on all viewports.
      </GuidePanel>
    </VStack>
  ),

  parameters: {
    chromatic: { viewports: [479, 800] },
  },
};

export const Content: Story = {
  render: () => (
    <GuidePanel>
      <BodyLong spacing>
        Duis et ex ad magna nostrud ut officia nulla cillum commodo sint irure
        elit nulla. Ad proident nulla ex sunt exercitation sunt Lorem non
        laboris ea ex cillum nulla consequat. Enim pariatur eiusmod quis est
        fugiat officia nostrud dolore occaecat.
      </BodyLong>
      <BodyLong>
        Do esse magna nulla amet excepteur. Tempor laboris ipsum magna velit
        dolore nulla id ex mollit. Deserunt ut esse laboris pariatur tempor
        laborum veniam enim. Nisi deserunt officia minim enim.
      </BodyLong>
    </GuidePanel>
  ),
};

export const CustomIllustration: Story = {
  render: () => (
    <GuidePanel illustration={<InformationIcon />}>{panelText}</GuidePanel>
  ),
};

export const ColorRole: Story = {
  render: () => (
    <VStack gap="space-40">
      <GuidePanel>{panelText}</GuidePanel>
      <GuidePanel data-color="brand-magenta">{panelText}</GuidePanel>
    </VStack>
  ),
};

export const Chromatic = renderStoriesForChromatic({
  PosterVariants,
  Content,
  CustomIllustration,
  ColorRole,
});
Chromatic.parameters = {
  chromatic: { disable: false, viewports: [479, 800] },
};
