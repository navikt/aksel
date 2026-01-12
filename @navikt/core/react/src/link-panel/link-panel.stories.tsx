import { Meta } from "@storybook/react-vite";
import React from "react";
import { renderStoriesForChromatic } from "../util/renderStoriesForChromatic";
import LinkPanel from "./LinkPanel";

export default {
  title: "ds-react/LinkPanel",
  component: LinkPanel,
  parameters: { chromatic: { disable: true } },
} satisfies Meta<typeof LinkPanel>;

export const Default = {
  render: (props: any) => {
    return (
      <LinkPanel href="#" border={props?.border}>
        <LinkPanel.Title>
          Consectetur eu duis aliqua eu irure fugiat fugiat eu.
        </LinkPanel.Title>
        {props.description && (
          <LinkPanel.Description>
            Aliqua id aliquip Lorem esse
          </LinkPanel.Description>
        )}
      </LinkPanel>
    );
  },
  argTypes: {
    border: {
      control: { type: "boolean" },
    },
  },
  args: {
    description: false,
  },
};

export const Description = () => {
  return (
    <LinkPanel href="#">
      <LinkPanel.Title>
        Consectetur eu duis aliqua eu irure fugiat fugiat eu.
      </LinkPanel.Title>
      <LinkPanel.Description>
        Aliqua id aliquip Lorem esse
      </LinkPanel.Description>
    </LinkPanel>
  );
};

export const NoBorder = () => {
  return (
    <LinkPanel href="#" border={false}>
      <LinkPanel.Title>
        Consectetur eu duis aliqua eu irure fugiat fugiat eu.
      </LinkPanel.Title>
    </LinkPanel>
  );
};

export const Chromatic = renderStoriesForChromatic({
  Default,
  Description,
  NoBorder,
});
