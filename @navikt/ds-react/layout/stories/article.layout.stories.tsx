import React from "react";
import { ArticleLayout } from "../src/index";
import { Navigation } from "./components/Navigation";
import { Content } from "./components/Content";
import { Context } from "./components/Context";

export default {
  title: "@navikt/layout/Article",
  component: { ArticleLayout },
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
