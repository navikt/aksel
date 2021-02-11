import React from "react";
import { Layout } from "../src/index";
import { LeftContent } from "./components/LeftContent";
import { MainContent } from "./components/MainContent";
import { RightContent } from "./components/RightContent";

export default {
  title: "@navikt/layout/Article",
  component: { Layout },
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "white",
      values: [
        {
          name: "white",
          value: "#ffffff",
        },
        {
          name: "NAV gray",
          value: "#f1f1f1",
        },
      ],
    },
  },
};

export const ThreeColumns = () => (
  <Layout>
    <Layout.Section secondary>
      <LeftContent />
    </Layout.Section>
    <Layout.Section>
      <MainContent />
    </Layout.Section>
    <Layout.Section secondary>
      <RightContent />
    </Layout.Section>
  </Layout>
);

export const TwoColumns = () => (
  <Layout>
    <Layout.Section secondary>
      <LeftContent />
    </Layout.Section>
    <Layout.Section>
      <MainContent />
    </Layout.Section>
  </Layout>
);

export const OneColumn = () => (
  <Layout>
    <Layout.Section>
      <MainContent />
    </Layout.Section>
  </Layout>
);
