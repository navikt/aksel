import * as AkselIcons from "@navikt/aksel-icons";
import { StarFillIcon } from "@navikt/aksel-icons";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta = {
  title: "aksel-icons/Icons",
} satisfies Meta<typeof StarFillIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icons: Story = {
  render: () => {
    return (
      <div className="colgap">
        {Object.entries(AkselIcons).map(([key, Value]) => (
          <div key={key} className="icon-section">
            <span>{key}</span>
            <span className="icon-group">
              <span>
                <Value fontSize="3rem" aria-hidden title={key} />
              </span>
              <span>
                <Value fontSize="3rem" aria-hidden title={key + " Inverted"} />
              </span>
            </span>
          </div>
        ))}
        <style>
          {`
          .icon-section{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--a-spacing-4);
            align-items: center;
          }
          .icon-group {
            display: flex;
            gap: var(--a-spacing-4)
          }

          .icon-group > span:last-of-type {
            background: var(--a-surface-inverted);
            color: var(--a-icon-on-inverted);
          }
          `}
        </style>
      </div>
    );
  },
};
