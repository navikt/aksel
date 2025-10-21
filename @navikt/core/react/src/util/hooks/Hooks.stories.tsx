import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
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
    (story) => (
      <div
        style={{
          background: "var(--ax-bg-softA)",
        }}
      >
        <h2>Resize to go from no scroll to scroll</h2>
        <div>{story()}</div>
        <div style={{ width: 400, resize: "horizontal", overflow: "auto" }}>
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
    ),
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
      <div>
        <button onClick={() => setEnabled(true)}>Enable</button>
        <button onClick={() => setEnabled(false)}>Disable</button>
      </div>
    </div>
  );
}
