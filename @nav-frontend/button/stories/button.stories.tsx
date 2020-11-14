import React, { useRef, useEffect } from "react";
import Button from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "@nav-frontend/button",
  component: Button,
} as Meta;

export const All = () => {
  return (
    <>
      <div
        style={{
          padding: 24,
          background: "lightgray",
        }}
      >
        {["primary", "secondary", "action", "danger"].map(
          (variant: "primary" | "secondary" | "action" | "danger") => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          )
        )}
      </div>
      <div
        style={{
          padding: 24,
          background: "lightgray",
        }}
      >
        {["primary", "secondary", "action", "danger"].map(
          (variant: "primary" | "secondary" | "action" | "danger") => (
            <Button key={variant} variant={variant} disabled>
              {variant}
            </Button>
          )
        )}
      </div>
      <div
        style={{
          padding: 24,
          background: "lightgray",
        }}
      >
        {["primary", "secondary", "action", "danger"].map(
          (variant: "primary" | "secondary" | "action" | "danger") => (
            <Button key={variant} as="a" variant={variant} href="#">
              {variant}
            </Button>
          )
        )}
      </div>
    </>
  );
};
