import React from "react";
import EtikettBase, {
  EtikettInfo,
  EtikettAdvarsel,
  EtikettFokus,
  EtikettSuksess,
} from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Etiketter/All",
  component: EtikettBase,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

export const All = () => (
  <>
    <EtikettInfo> Info</EtikettInfo>
    {"  "}
    <EtikettSuksess>Suksess</EtikettSuksess>
    {"  "}
    <EtikettFokus>Fokus</EtikettFokus>
    {"  "}
    <EtikettAdvarsel>Advarsel</EtikettAdvarsel>

    <br />
    <br />

    <EtikettInfo mini> Info</EtikettInfo>
    {"  "}
    <EtikettSuksess mini>Suksess</EtikettSuksess>
    {"  "}
    <EtikettFokus mini>Fokus</EtikettFokus>
    {"  "}
    <EtikettAdvarsel mini>Advarsel</EtikettAdvarsel>
  </>
);
