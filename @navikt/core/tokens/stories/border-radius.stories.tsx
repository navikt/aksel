import { Meta } from "@storybook/react-vite";
import React from "react";

export default {
  title: "ds-tokens/Border-radius",
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta;

const Border = ({ token }) => (
  <>
    <div className="border" style={{ borderRadius: token }} />
    <style>{`
    .border {
      width: 4rem;
      height: 4rem;
      background: #f7f7f7;
      border: 2px solid #23262a;
    }
    `}</style>
  </>
);

export const Small = () => <Border token="var(--a-border-radius-small)" />;
export const Medium = () => <Border token="var(--a-border-radius-medium)" />;
export const Large = () => <Border token="var(--a-border-radius-large)" />;
export const XLarge = () => <Border token="var(--a-border-radius-xlarge)" />;
export const Full = () => <Border token="var(--a-border-radius-full)" />;

export const Chromatic = {
  render: () => (
    <div className="colgap">
      <Small />
      <Medium />
      <Large />
      <XLarge />
      <Full />
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
