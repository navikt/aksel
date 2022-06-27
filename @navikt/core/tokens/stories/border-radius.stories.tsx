import React from "react";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "ds-tokens/Border-radius",
} as Meta;

const Border = ({ token }) => (
  <>
    <div className="border" style={{ borderRadius: token }} />
    <style>{`
    .border {
      width: 4rem;
      height: 4rem;
      background: #f7f7f7;
      border: 2px solid #292929;
    }
    `}</style>
  </>
);

export const Small = () => <Border token="var(--navds-border-radius-small)" />;
export const Medium = () => (
  <Border token="var(--navds-border-radius-medium)" />
);
export const Large = () => <Border token="var(--navds-border-radius-large)" />;
export const xLarge = () => (
  <Border token="var(--navds-border-radius-xlarge)" />
);
export const Full = () => <Border token="var(--navds-border-radius-full)" />;
