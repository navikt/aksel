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
  title: "nav-frontend/Ikonknapper",
  component: Hamburgerknapp,
} as Meta;

export const All = () => (
  <div
    style={{
      display: "grid",
      gridAutoRows: "auto",
      rowGap: "2rem",
      gridAutoColumns: "max-content",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Hamburgerknapp />

      <Menyknapp />

      <Nesteknapp />

      <Systemerknapp />

      <Søkeknapp />

      <Tilbakeknapp />

      <Xknapp />
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Hamburgerknapp mini />

      <Menyknapp mini />

      <Nesteknapp mini />

      <Systemerknapp mini />

      <Søkeknapp mini />

      <Tilbakeknapp mini />

      <Xknapp mini />
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Hamburgerknapp kompakt />

      <Menyknapp kompakt />

      <Nesteknapp kompakt />

      <Systemerknapp kompakt />

      <Søkeknapp kompakt />

      <Tilbakeknapp kompakt />

      <Xknapp kompakt />
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Hamburgerknapp mini kompakt />

      <Menyknapp mini kompakt />

      <Nesteknapp mini kompakt />

      <Systemerknapp mini kompakt />

      <Søkeknapp mini kompakt />

      <Tilbakeknapp mini kompakt />

      <Xknapp mini kompakt />
    </div>
  </div>
);
