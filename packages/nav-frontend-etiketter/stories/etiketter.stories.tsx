import React from "react";
import EtikettBase, {
  EtikettInfo,
  EtikettAdvarsel,
  EtikettFokus,
  EtikettSuksess,
} from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Etiketter",
  component: EtikettBase,
} as Meta;

export const All = () => (
  <div
    style={{
      display: "grid",
      gridAutoRows: "auto",
      rowGap: "2rem",
      gridAutoColumns: "fit-content",
      maxWidth: "50vw",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <EtikettInfo> Info</EtikettInfo>

      <EtikettSuksess>Suksess</EtikettSuksess>

      <EtikettFokus>Fokus</EtikettFokus>

      <EtikettAdvarsel>Advarsel</EtikettAdvarsel>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <EtikettInfo mini> Info</EtikettInfo>

      <EtikettSuksess mini>Suksess</EtikettSuksess>

      <EtikettFokus mini>Fokus</EtikettFokus>

      <EtikettAdvarsel mini>Advarsel</EtikettAdvarsel>
    </div>
  </div>
);
