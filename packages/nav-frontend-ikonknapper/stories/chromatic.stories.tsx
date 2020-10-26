import React from "react";
import {
  Hamburgerknapp,
  Menyknapp,
  Nesteknapp,
  Systemerknapp,
  Søkeknapp,
  Tilbakeknapp,
  Xknapp,
} from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Ikonknapper/All",
  component: Hamburgerknapp,
} as Meta;

export const All = () => (
  <>
    <Hamburgerknapp />
    {"  "}
    <Menyknapp />
    {"  "}
    <Nesteknapp />
    {"  "}
    <Systemerknapp />
    {"  "}
    <Søkeknapp />
    {"  "}
    <Tilbakeknapp />
    {"  "}
    <Xknapp />

    <br />
    <br />

    <Hamburgerknapp mini />
    {"  "}
    <Menyknapp mini />
    {"  "}
    <Nesteknapp mini />
    {"  "}
    <Systemerknapp mini />
    {"  "}
    <Søkeknapp mini />
    {"  "}
    <Tilbakeknapp mini />
    {"  "}
    <Xknapp mini />

    <br />
    <br />

    <Hamburgerknapp kompakt />
    {"  "}
    <Menyknapp kompakt />
    {"  "}
    <Nesteknapp kompakt />
    {"  "}
    <Systemerknapp kompakt />
    {"  "}
    <Søkeknapp kompakt />
    {"  "}
    <Tilbakeknapp kompakt />
    {"  "}
    <Xknapp kompakt />

    <br />
    <br />

    <Hamburgerknapp mini kompakt />
    {"  "}
    <Menyknapp mini kompakt />
    {"  "}
    <Nesteknapp mini kompakt />
    {"  "}
    <Systemerknapp mini kompakt />
    {"  "}
    <Søkeknapp mini kompakt />
    {"  "}
    <Tilbakeknapp mini kompakt />
    {"  "}
    <Xknapp mini kompakt />
  </>
);
