import React from "react";
import { BodyLong, GuidePanel } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/GuidePanel",
  component: GuidePanel,
} as Meta;

const panelText = `Sit sint eu dolore reprehenderit exercitation labore aute anim sit
adipisicing proident. Tempor ipsum ea cupidatat qui esse do veniam
cupidatat. Excepteur irure reprehenderit esse tempor nisi duis qui ea
enim id.`;

export const Default = (props) => {
  const newProps = props?.colorOverride
    ? {
        style: {
          ["--navds-guide-panel-color-illustration-background" as any]:
            "var(--navds-global-color-purple-200)",
          ["--navds-guide-panel-color-border" as any]:
            "var(--navds-global-color-purple-400)",
        },
      }
    : {};

  return (
    <GuidePanel {...newProps} poster={props?.poster}>
      {panelText}
    </GuidePanel>
  );
};

Default.args = {
  poster: false,
  colorOverride: false,
};

export const Poster = () => <GuidePanel poster>{panelText}</GuidePanel>;

export const ColorOverride = () => (
  <GuidePanel
    style={{
      ["--navds-guide-panel-color-illustration-background" as any]:
        "var(--navds-global-color-purple-200)",
      ["--navds-guide-panel-color-border" as any]:
        "var(--navds-global-color-purple-400)",
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
