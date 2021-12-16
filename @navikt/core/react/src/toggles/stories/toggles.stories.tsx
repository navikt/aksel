import React from "react";
import { Toggles } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/toggles",
  component: Toggles,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

export const All = () => {
  return (
    <div>
      <h2>Toggles</h2>
      <Toggles>
        <Toggles.Button>Tekst</Toggles.Button>
        <Toggles.Button>Tekst</Toggles.Button>
        <Toggles.Button>Tekst</Toggles.Button>
        <Toggles.Button>Tekst</Toggles.Button>
      </Toggles>
    </div>
  );
};
