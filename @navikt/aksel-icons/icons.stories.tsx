import React from "react";
import { Meta } from "@storybook/react";
import * as AkselIcons from "@navikt/aksel-icons";

export default {
  title: "aksel-icons/Icons",
} as Meta;

export const Icons = () => {
  return (
    <div className="colgap">
      {Object.entries(AkselIcons).map(([key, Value]) => (
        <div key={key} className="icon-section">
          <span>{key}</span>
          <span className="icon-group">
            <span>
              <Value fontSize="3rem" />
            </span>
            <span>
              <Value fontSize="3rem" />
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
};
