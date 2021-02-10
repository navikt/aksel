import React from "react";
import { ArticleLayout } from "../src/index";
import { Navigation } from "./components/Navigation";
import { Content } from "./components/Content";
import { Context } from "./components/Context";

export default {
  title: "@navikt/layout/Article",
  component: { ArticleLayout },
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
          name: "nav gray",
          value: "#f1f1f1",
        },
      ],
    },
  },
};

export const ThreeColumns = () => (
  <ArticleLayout
    leftContent={<Navigation />}
    mainContent={<Content />}
    rightContent={<Context />}
  />
);

export const TwoColumns = () => (
  <ArticleLayout leftContent={<Navigation />} mainContent={<Content />} />
);

export const OneColumn = () => <ArticleLayout mainContent={<Content />} />;
