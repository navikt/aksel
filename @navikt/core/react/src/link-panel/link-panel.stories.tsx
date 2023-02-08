import { Meta } from "@storybook/react";
import React from "react";
import { LinkPanel } from "..";

export default {
  title: "ds-react/LinkPanel",
  component: LinkPanel,
  argTypes: {
    border: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta;

export const Default = (props: any) => {
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
};

Default.args = {
  description: false,
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
