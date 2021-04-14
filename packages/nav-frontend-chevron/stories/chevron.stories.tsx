import React from "react";
import NavFrontendChevron, {
  HoyreChevron,
  VenstreChevron,
  OppChevron,
  NedChevron,
} from "../src/chevron";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Chevron",
  component: NavFrontendChevron,
} as Meta;

export const All = () => (
  <div
    style={{
      display: "grid",
      gridAutoRows: "auto",
      rowGap: "2rem",
      gridAutoColumns: "fit-content",
    }}
  >
    <div>
      <HoyreChevron />

      <VenstreChevron />

      <OppChevron />

      <NedChevron />
    </div>
    <div>
      <HoyreChevron stor />

      <VenstreChevron stor />

      <OppChevron stor />

      <NedChevron stor />
    </div>
  </div>
);
