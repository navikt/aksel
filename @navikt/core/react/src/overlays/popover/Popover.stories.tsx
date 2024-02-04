import React from "react";
import Portal from "../portal/Portal";
import { Popover } from "./Popover";

export default { title: "Experimental/Popover" };

export const Styled = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "200vh",
      }}
    >
      <Style />
      <Popover>
        <Popover.Trigger>
          <button>123</button>
        </Popover.Trigger>
        <Portal>
          <Popover.Content className="content">Content</Popover.Content>
        </Portal>
      </Popover>
      <input />
    </div>
  );
};

function Style() {
  return (
    <style>
      {`
    .content {
      background-color: var(--a-gray-200);
      padding: 1rem;
      border-radius: var(--a-border-radius-large);
      transform-origin: var(--ac-floating-transform-origin),
    }

    .arrow {
      fill: var(--a-gray-200);
    }
    `}
    </style>
  );
}
