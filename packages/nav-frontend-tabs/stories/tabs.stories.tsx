import React from "react";
import Tabs from "../src/tabs";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Tabs",
  component: Tabs,
} as Meta;

export const All = () => {
  return (
    <div>
      <Tabs
        tabs={[{ label: "Første" }, { label: "Andre" }, { label: "Tredje" }]}
        onChange={() => {}}
      />
      <div style={{ marginTop: "4rem" }}>
        <Tabs
          tabs={[{ label: "Første" }, { label: "Andre" }, { label: "Tredje" }]}
          onChange={() => {}}
          kompakt
        />
      </div>
    </div>
  );
};
