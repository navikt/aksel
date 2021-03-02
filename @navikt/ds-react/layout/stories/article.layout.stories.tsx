import * as React from "react";
import { useEffect } from "react";
import { ContentContainer } from "../../index";
import { Layout } from "../index";
import { Left } from "./components/sections/Left";
import { Main } from "./components/sections/Main";
import { Right } from "./components/sections/Right";
import "./components/styles.css";

export default {
  title: "@navikt/layout/Article",
  component: { Layout },
  decorators: [
    (Story) => {
      useEffect(() => {
        document.getElementById("decorator-header").style.display = "block";
        document.getElementById("decorator-footer").style.display = "block";
        return () => {
          document.getElementById("decorator-header").style.display = "none";
          document.getElementById("decorator-footer").style.display = "none";
        };
      }, []);
      return <Story />;
    },
  ],
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
      <Layout.Section left sticky>
        <Left />
      </Layout.Section>
      <Layout.Section>
        <Main />
      </Layout.Section>
      <Layout.Section right sticky>
        <Right />
      </Layout.Section>
    </Layout>
  </ContentContainer>
);

export const TwoColumnsLeft = () => (
  <ContentContainer>
    <Layout>
      <Layout.Section left sticky>
        <Left />
      </Layout.Section>
      <Layout.Section>
        <Main />
      </Layout.Section>
    </Layout>
  </ContentContainer>
);

export const TwoColumnsRight = () => (
  <ContentContainer>
    <Layout>
      <Layout.Section>
        <Main />
      </Layout.Section>
      <Layout.Section right sticky>
        <Right />
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
