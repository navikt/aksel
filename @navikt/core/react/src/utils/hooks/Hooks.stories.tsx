import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useEffect, useState } from "react";
import { useScrollLock } from "./useScrollLock";

export default {
  title: "Utilities/Hooks",
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta;

export const UseScrollLock: StoryObj = {
  render: ScrollLockComponent,
  decorators: [
    (story) => (
      <div style={{ height: "200vh", background: "var(--ax-bg-softA)" }}>
        <h2>200vh container</h2>
        <div>{story()}</div>
      </div>
    ),
  ],
  parameters: {
    layout: "padded",
  },
};

export const UseScrollLockScrollXAndY: StoryObj = {
  render: ScrollLockComponent,
  decorators: [
    (story) => (
      <div
        style={{
          height: "200vh",
          width: "200vw",
          background: "var(--ax-bg-softA)",
        }}
      >
        <h2>200vh and 200vw container</h2>
        <div>{story()}</div>
      </div>
    ),
  ],
  parameters: {
    layout: "padded",
  },
};

export const UseScrollLockResizeTest: StoryObj = {
  render: ScrollLockComponent,
  decorators: [
    (story) => {
      const [width, setWidth] = useState(400);
      return (
        <div
          style={{
            background: "var(--ax-bg-softA)",
          }}
        >
          <div>{story()}</div>
          <button onClick={() => setWidth(() => 80)}>Scroll</button>
          <button onClick={() => setWidth(() => 400)}>No scroll</button>
          <div style={{ width }}>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      );
    },
  ],
  parameters: {
    layout: "padded",
  },
};

export const ScrollLockBodyStyleTest: StoryObj = {
  render: ScrollLockComponent,
  decorators: [
    (story) => (
      <div
        style={{
          height: "200vh",
          width: "200vw",
          background: "var(--ax-bg-softA)",
        }}
      >
        <h2>200vh and 200vw container</h2>
        <div>{story()}</div>
      </div>
    ),
    (story) => {
      useEffect(() => {
        document.body.style.marginBlock = "6rem";
      }, []);

      return (
        <>
          <div
            style={{
              top: "4rem",
              position: "absolute",
              width: "100vw",
              height: "4rem",
              background: "red",
            }}
          />
          {story()}
        </>
      );
    },
  ],
  parameters: {
    layout: "padded",
  },
};

function ScrollLockComponent() {
  const [enabled, setEnabled] = useState(false);

  useScrollLock({
    enabled,
    mounted: false,
    open: true,
  });

  return (
    <div>
      <div style={{ position: "relative" }}>
        <p>
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button onClick={() => setEnabled(true)}>Enable</button>
        <button onClick={() => setEnabled(false)}>Disable</button>
      </div>
    </div>
  );
}
