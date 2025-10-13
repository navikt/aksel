import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useEffect, useRef } from "react";
import { useFocusGuards } from "./useFocusGuard";

export default {
  title: "Utilities/Hooks",
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta;

export const UseFocusGuard: StoryObj = {
  render: () => {
    useFocusGuards();

    const ref = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
      const focusButton = () => {
        ref.current?.focus();
        console.count("Re-focus");
      };

      document.addEventListener("focusout", focusButton);

      /* Initial focus on button */
      ref.current?.focus();
      return () => document.removeEventListener("focusout", focusButton);
    }, []);

    return (
      <div>
        <p>
          Since FocusGuards are enabled, we are able to intercept focusout-event
          and re-focus button before we end up leaving the DOM. Both tab and
          shift+tab should therefore stay on button,.
        </p>
        <button ref={ref}>MainFocusButton</button>
      </div>
    );
  },
};

export const UseFocusGuardDisabled: StoryObj = {
  render: () => {
    const ref = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
      const focusButton = () => {
        console.log("left");
        ref.current?.focus();
      };

      document.addEventListener("focusout", focusButton);

      /* Initial focus on button */
      ref.current?.focus();
      return () => document.removeEventListener("focusout", focusButton);
    }, []);

    return (
      <div>
        <p>
          Since FocusGuards are disabled, we get the focusout-event, but since
          control has left the current document, calling focus() has no effect.
          Tab and shift+tab will move focus outside the current document (most
          likely to the browser, or Iframe parent).
        </p>
        <button ref={ref}>MainFocusButton</button>
      </div>
    );
  },
};
