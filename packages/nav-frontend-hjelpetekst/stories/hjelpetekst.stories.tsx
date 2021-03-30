import React from "react";
import Hjelpetekst from "../src/hjelpetekst";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Hjelpetekst",
  component: Hjelpetekst,
} as Meta;

export const All = () => (
  <Hjelpetekst style={{ margin: "6rem 0 0 6rem" }} type={"under" as any}>
    Innhold
  </Hjelpetekst>
);
