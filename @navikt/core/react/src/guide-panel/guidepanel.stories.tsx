import React from "react";
import { BodyLong, GuidePanel, VStack } from "../index";
import { Meta } from "@storybook/react";
import { InformationIcon } from "@navikt/aksel-icons";

export default {
  title: "ds-react/GuidePanel",
  component: GuidePanel,
} satisfies Meta<typeof GuidePanel>;

const panelText = `Sit sint eu dolore reprehenderit exercitation labore aute anim sit
adipisicing proident. Tempor ipsum ea cupidatat qui esse do veniam
cupidatat. Excepteur irure reprehenderit esse tempor nisi duis qui ea
enim id.`;

export const Default = {
  render: (props) => {
    const style: React.CSSProperties = props?.colorOverride
      ? {
          "--ac-guide-panel-illustration-bg": "var(--a-purple-200)",
          "--ac-guide-panel-border": "var(--a-purple-400)",
        }
      : {};

    return (
      <GuidePanel style={style} poster={props?.poster}>
        {panelText}
      </GuidePanel>
    );
  },

  args: {
    poster: false,
    colorOverride: false,
  },
};

export const PosterVariants = {
  render: () => (
    <VStack gap="6" align="start">
      <GuidePanel>
        If you exclude the <code>poster</code> prop, you will get the poster
        variant on mobile (&lt;480px) and the non-poster variant otherwise.
      </GuidePanel>
      <GuidePanel poster>
        Use the <code>poster</code> prop to get the poster variant on all
        viewports.
      </GuidePanel>
      <GuidePanel poster={false}>
        Set <code>poster=false</code> to get the non-poster variant on all
        viewports.
      </GuidePanel>
    </VStack>
  ),

  parameters: {
    chromatic: { viewports: [479, 800] },
  },
};

export const ColorOverride = () => (
  <GuidePanel
    style={{
      "--ac-guide-panel-illustration-bg": "var(--a-purple-200)",
      "--ac-guide-panel-border": "var(--a-purple-400)",
    }}
  >
    {panelText}
  </GuidePanel>
);

export const Content = () => (
  <GuidePanel>
    <BodyLong spacing>
      Duis et ex ad magna nostrud ut officia nulla cillum commodo sint irure
      elit nulla. Ad proident nulla ex sunt exercitation sunt Lorem non laboris
      ea ex cillum nulla consequat. Enim pariatur eiusmod quis est fugiat
      officia nostrud dolore occaecat nisi.
    </BodyLong>
    <BodyLong>
      Do esse magna nulla amet excepteur. Tempor laboris ipsum magna velit
      dolore nulla id ex mollit. Deserunt ut esse laboris pariatur tempor
      laborum veniam enim. Nisi deserunt officia minim enim.
    </BodyLong>
  </GuidePanel>
);

export const CustomIllustration = () => (
  <GuidePanel illustration={<InformationIcon />}>{panelText}</GuidePanel>
);
