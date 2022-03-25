import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import { Heading } from "../..";
import { Search } from "..";

export default {
  title: "ds-react/form/search",
  component: Search,
} as Meta;

export const LightTheme = () => (
  <div
    style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: 16 }}
  >
    <Heading size="xlarge">Search</Heading>
    <Heading level="2" size="large">
      size medium
    </Heading>
    <Search label="hidden label" />
    <Search label="hidden label" variant="secondary" />
    <Search label="hidden label" variant="no-button" />
    <Search label="with label" hideLabel={false} />

    <Heading level="2" size="large">
      size small
    </Heading>
    <Search label="hidden label" size="small" />
    <Search label="hidden label" variant="secondary" size="small" />
    <Search label="hidden label" variant="no-button" size="small" />
    <Search label="with label" hideLabel={false} size="small" />
  </div>
);

export const DarkTheme = () => (
  <div data-theme="dark">
    <LightTheme />
  </div>
);

DarkTheme.parameters = {
  backgrounds: { default: "dark" },
};
