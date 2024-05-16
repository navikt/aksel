import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import * as AkselIcons from "@navikt/aksel-icons";
import type { StarFillIcon } from "@navikt/aksel-icons";

const meta: Meta<typeof StarFillIcon> = {
  title: "aksel-icons/Icons",
};
export default meta;

type Story = StoryObj<typeof StarFillIcon>;

export const Icons: Story = {
  render: () => {
    return (
      <div className="icons">
        {Object.entries(AkselIcons).map(([key, Value]) => (
          <React.Fragment key={key}>
            <Value fontSize="3rem" aria-hidden title={key} />
          </React.Fragment>
        ))}
        <style>
          {`
          .icons{
            display: flex;
            flex-wrap: wrap;
          }
          `}
        </style>
      </div>
    );
  },
};

export const IconsInverted: Story = {
  render: () => {
    return (
      <div className="icons">
        {Object.entries(AkselIcons).map(([key, Value]) => (
          <React.Fragment key={key}>
            <Value
              fontSize="3rem"
              aria-hidden
              title={key}
              className="icon-color"
            />
          </React.Fragment>
        ))}
        <style>
          {`
          .icons{
            display: flex;
            flex-wrap: wrap;
            background: var(--a-gray-900);
          }
          .icon-color{
            color: var(--a-icon-on-inverted);
          }
          `}
        </style>
      </div>
    );
  },
};
