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
  <div>
    <h1>Etikett</h1>
    <div style={{ display: "flex", gap: 8 }}>
      <EtikettInfo>Info</EtikettInfo>
      <EtikettSuksess>Suksess</EtikettSuksess>
      <EtikettFokus>Fokus</EtikettFokus>
      <EtikettAdvarsel>Advarsel</EtikettAdvarsel>
    </div>
    <h2>mini</h2>
    <div style={{ display: "flex", gap: 8 }}>
      <EtikettInfo mini>Info</EtikettInfo>
      <EtikettSuksess mini>Suksess</EtikettSuksess>
      <EtikettFokus mini>Fokus</EtikettFokus>
      <EtikettAdvarsel mini>Advarsel</EtikettAdvarsel>
    </div>
  </div>
);
