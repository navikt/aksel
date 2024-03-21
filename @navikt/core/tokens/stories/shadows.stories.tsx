import { Meta } from "@storybook/react";
import React from "react";

export default {
  title: "ds-tokens/Shadows",
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

const Shadow = ({ token }) => (
  <>
    <div className="shadow" style={{ boxShadow: token }} />
    <style>{`
    .shadow {
      width: 12rem;
      height: 6rem;
      border-radius: 16px;
    }
    `}</style>
  </>
);

export const XSmall = () => <Shadow token="var(--a-shadow-xsmall)" />;
export const Small = () => <Shadow token="var(--a-shadow-small)" />;
export const Medium = () => <Shadow token="var(--a-shadow-medium)" />;
export const Large = () => <Shadow token="var(--a-shadow-large)" />;
export const XLarge = () => <Shadow token="var(--a-shadow-xlarge)" />;
export const Focus = () => <Shadow token="var(--a-shadow-focus)" />;
export const FocusInverted = () => (
  <Shadow token="var(--a-shadow-focus-inverted)" />
);

export const Chromatic = {
  render: () => (
    <div className="colgap">
      <XSmall />
      <Small />
      <Medium />
      <Large />
      <XLarge />
      <Focus />
      <FocusInverted />
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
