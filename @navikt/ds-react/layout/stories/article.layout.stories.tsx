import * as React from "react";
import { Layout } from "../src/index";
import { Left } from "./components/sections/Left";
import { Main } from "./components/sections/Main";
import { Right } from "./components/sections/Right";
import { ContentContainer } from "../../content-container/src";
import "./components/styles.css";

export default {
  title: "@navikt/layout/Article",
  component: { Layout },
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "NAV gray",
      values: [
        {
          name: "NAV gray",
          value: "#f1f1f1",
        },
        {
          name: "white",
          value: "#ffffff",
        },
      ],
    },
  },
};

export const ThreeColumns = () => (
  <ContentContainer>
    <Layout>
      <Layout.Section left>
        <Left />
      </Layout.Section>
      <Layout.Section>
        <Main />
      </Layout.Section>
      <Layout.Section right>
        <Right />
      </Layout.Section>
    </Layout>
  </ContentContainer>
);

export const TwoColumns = () => (
  <ContentContainer>
    <Layout>
      <Layout.Section left>
        <Left />
      </Layout.Section>
      <Layout.Section>
        <Main />
      </Layout.Section>
    </Layout>
  </ContentContainer>
);

export const OneColumn = () => (
  <ContentContainer>
    <Layout>
      <Layout.Section>
        <Main />
      </Layout.Section>
    </Layout>
  </ContentContainer>
);
