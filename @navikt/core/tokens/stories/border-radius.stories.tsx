import React from "react";
import { Meta } from "@storybook/react";

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
      border: 2px solid #23262a;
    }
    `}</style>
  </>
);

export const Small = () => <Border token="var(--a-border-radius-small)" />;
export const Medium = () => <Border token="var(--a-border-radius-medium)" />;
export const Large = () => <Border token="var(--a-border-radius-large)" />;
export const xLarge = () => <Border token="var(--a-border-radius-xlarge)" />;
export const Full = () => <Border token="var(--a-border-radius-full)" />;
