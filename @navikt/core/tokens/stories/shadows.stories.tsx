import React from "react";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "ds-tokens/Shadows",
} as Meta;

const Shadow = ({ token }) => (
  <>
    <div className="shadow" style={{ boxShadow: token }} />
    <style>{`
    .shadow {
      width: 4rem;
      height: 4rem;
      background: #f7f7f7;
      border-radius: 16px;
    }
    `}</style>
  </>
);

export const XSmall = () => <Shadow token="var(--navds-shadow-xsmall)" />;
export const Small = () => <Shadow token="var(--navds-shadow-small)" />;
export const Medium = () => <Shadow token="var(--navds-shadow-medium)" />;
export const Large = () => <Shadow token="var(--navds-shadow-large)" />;
export const XxLarge = () => <Shadow token="var(--navds-shadow-xlarge)" />;
export const Focus = () => <Shadow token="var(--navds-shadow-focus)" />;
export const FocusInverted = () => (
  <Shadow token="var(--navds-shadow-focus-inverted)" />
);
