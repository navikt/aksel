import React from "react";
import NavFrontendSpinner from "../src/spinner";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Spinner",
  component: NavFrontendSpinner,
} as Meta;

export const All = () => {
  return (
    <div style={{ display: "grid", gridAutoRows: "8rem", rowGap: "2rem" }}>
      <NavFrontendSpinner />
      <NavFrontendSpinner transparent />
    </div>
  );
};
