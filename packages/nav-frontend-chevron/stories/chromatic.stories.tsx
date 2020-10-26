import React from "react";
import NavFrontendChevron, {
  HoyreChevron,
  VenstreChevron,
  OppChevron,
  NedChevron,
} from "../src/chevron";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Chevron/All",
  component: NavFrontendChevron,
} as Meta;

export const All = () => (
  <>
    <HoyreChevron />
    {"  "}
    <VenstreChevron />
    {"  "}
    <OppChevron />
    {"  "}
    <NedChevron />

    <br />
    <br />

    <HoyreChevron stor />
    {"  "}
    <VenstreChevron stor />
    {"  "}
    <OppChevron stor />
    {"  "}
    <NedChevron stor />
  </>
);
