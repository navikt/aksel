import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { InformationIcon } from "@navikt/aksel-icons";
import { VStack } from "../layout/stack";
import { BodyLong } from "../typography";
import GuidePanel from "./GuidePanel";

type Story = StoryObj<typeof GuidePanel>;

export default {
  title: "ds-react/GuidePanel",
  component: GuidePanel,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof GuidePanel>;

const panelText = `Sit sint eu dolore reprehenderit exercitation labore aute anim sit
adipisicing proident. Tempor ipsum ea cupidatat qui esse do veniam
cupidatat. Excepteur irure reprehenderit esse tempor nisi duis qui ea
enim id.`;

export const Default: StoryObj<{ poster?: boolean; colorOverride?: boolean }> =
  {
    render: (props) => {
      const style = props.colorOverride
        ? {
            "--ac-guide-panel-illustration-bg": "var(--a-purple-200)",
            "--ac-guide-panel-border": "var(--a-purple-400)",
          }
        : {};

      return (
        <VStack gap="2">
          <GuidePanel style={style} poster={props?.poster}>
            {panelText}
          </GuidePanel>
        </VStack>
      );
    },

    args: {
      poster: undefined,
      colorOverride: false,
    },
  };

export const PosterVariants: Story = {
  render: () => (
    <VStack gap="6" align="start">
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

export const ColorOverride: Story = {
  render: () => (
    <div>
      <GuidePanel
        style={{
          "--ac-guide-panel-illustration-bg": "var(--a-purple-200)",
          "--ac-guide-panel-border": "var(--a-purple-400)",
        }}
      >
        {panelText}
      </GuidePanel>
    </div>
  ),
};

export const Content: Story = {
  render: () => (
    <GuidePanel>
      <BodyLong spacing>
        Duis et ex ad magna nostrud ut officia nulla cillum commodo sint irure
        elit nulla. Ad proident nulla ex sunt exercitation sunt Lorem non
        laboris ea ex cillum nulla consequat. Enim pariatur eiusmod quis est
        fugiat officia nostrud dolore occaecat nisi.
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
      <div>
        <GuidePanel>
          <BodyLong spacing>
            Duis et ex ad magna nostrud ut officia nulla cillum commodo sint
            irure elit nulla. Ad proident nulla ex sunt exercitation sunt Lorem
            non laboris ea ex cillum nulla consequat. Enim pariatur eiusmod quis
            est fugiat officia nostrud dolore occaecat nisi.
          </BodyLong>
          <BodyLong>
            Do esse magna nulla amet excepteur. Tempor laboris ipsum magna velit
            dolore nulla id ex mollit. Deserunt ut esse laboris pariatur tempor
            laborum veniam enim. Nisi deserunt officia minim enim.
          </BodyLong>
        </GuidePanel>
      </div>
      <div>
        <GuidePanel data-color="brand-magenta">
          <BodyLong spacing>
            Duis et ex ad magna nostrud ut officia nulla cillum commodo sint
            irure elit nulla. Ad proident nulla ex sunt exercitation sunt Lorem
            non laboris ea ex cillum nulla consequat. Enim pariatur eiusmod quis
            est fugiat officia nostrud dolore occaecat nisi.
          </BodyLong>
          <BodyLong>
            Do esse magna nulla amet excepteur. Tempor laboris ipsum magna velit
            dolore nulla id ex mollit. Deserunt ut esse laboris pariatur tempor
            laborum veniam enim. Nisi deserunt officia minim enim.
          </BodyLong>
        </GuidePanel>
      </div>
    </VStack>
  ),
};

export const Chromatic: Story = {
  render: (props, context) => (
    <div>
      <div>
        <h2>Default</h2>
        {Default.render?.(Default.args || {}, context)}
      </div>
      <div>
        <h2>PosterVariants</h2>
        {PosterVariants.render?.(props, context)}
      </div>
      <div>
        <h2>ColorOverride</h2>
        {ColorOverride.render?.(props, context)}
      </div>
      <div>
        <h2>Content</h2>
        {Content.render?.(props, context)}
      </div>
      <div>
        <h2>CustomIllustration</h2>
        {CustomIllustration.render?.(props, context)}
      </div>
      <div>
        <h2>ColorRole</h2>
        {ColorRole.render?.(props, context)}
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
