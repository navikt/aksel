import React from "react";
import { GuidePanel } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Illustration as SvgTemplate } from "./illustration";
export default {
  title: "ds-react/guidepanel",
  component: GuidePanel,
} as Meta;

const panelText = `Sit sint eu dolore reprehenderit exercitation labore aute anim sit
adipisicing proident. Tempor ipsum ea cupidatat qui esse do veniam
cupidatat. Excepteur irure reprehenderit esse tempor nisi duis qui ea
enim id.`;

export const All = () => {
  return (
    <div>
      <h1>GuidePanel</h1>
      <GuidePanel illustration={<SvgTemplate />}>{panelText}</GuidePanel>
      <h2>GuidePanel compact</h2>
      <GuidePanel compact illustration={<SvgTemplate />}>
        {panelText}
      </GuidePanel>
      <h2>GuidePanel poster</h2>
      <GuidePanel poster illustration={<SvgTemplate />}>
        {panelText}
      </GuidePanel>
      <h2>GuidePanel compact, poster</h2>
      <GuidePanel poster compact illustration={<SvgTemplate />}>
        {panelText}
      </GuidePanel>
      <h2>custom colors</h2>
      <GuidePanel illustration={<SvgTemplate />} color="#99C3FF">
        {panelText}
      </GuidePanel>
      <GuidePanel
        illustration={<SvgTemplate />}
        color="var(--navds-color-green-30)"
      >
        {panelText}
      </GuidePanel>
      <GuidePanel illustration={<SvgTemplate />} color="#99C3FF">
        {panelText}Ullamco reprehenderit fugiat reprehenderit ad nisi aliqua
        irure enim id nisi do non magna. Nisi ut incididunt dolor aliqua
        adipisicing. Cupidatat sint et qui minim sint aute anim non Lorem
        reprehenderit id et excepteur. Consectetur velit aliqua eiusmod sit. Sit
        velit minim consectetur deserunt Lorem non elit fugiat consectetur sunt
        aliqua Lorem minim. Ullamco dolor mollit laboris velit deserunt nisi
        ipsum minim dolor ad cillum in id do.
        {panelText}Ullamco reprehenderit fugiat reprehenderit ad nisi aliqua
        irure enim id nisi do non magna. Nisi ut incididunt dolor aliqua
        adipisicing. Cupidatat sint et qui minim sint aute anim non Lorem
        reprehenderit id et excepteur. Consectetur velit aliqua eiusmod sit. Sit
        velit minim consectetur deserunt Lorem non elit fugiat consectetur sunt
        aliqua Lorem minim. Ullamco dolor mollit laboris velit deserunt nisi
        ipsum minim dolor ad cillum in id do.
        {panelText}Ullamco reprehenderit fugiat reprehenderit ad nisi aliqua
        irure enim id nisi do non magna. Nisi ut incididunt dolor aliqua
        adipisicing. Cupidatat sint et qui minim sint aute anim non Lorem
        reprehenderit id et excepteur. Consectetur velit aliqua eiusmod sit. Sit
        velit minim consectetur deserunt Lorem non elit fugiat consectetur sunt
        aliqua Lorem minim. Ullamco dolor mollit laboris velit deserunt nisi
        ipsum minim dolor ad cillum in id do.
      </GuidePanel>
    </div>
  );
};
