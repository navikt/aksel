import React from "react";
import { ArticleLayout } from "../src/index";
import { LeftContent } from "./components/LeftContent";
import { MainContent } from "./components/MainContent";
import { RightContent } from "./components/RightContent";

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
    leftContent={<LeftContent />}
    mainContent={<MainContent />}
    rightContent={<RightContent />}
  />
);

export const TwoColumns = () => (
  <ArticleLayout leftContent={<LeftContent />} mainContent={<MainContent />} />
);

export const OneColumn = () => <ArticleLayout mainContent={<MainContent />} />;
