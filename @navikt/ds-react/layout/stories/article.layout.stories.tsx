import React from "react";
import { ArticleLayout } from "../src/index";
import { Navigation } from "./components/Navigation";
import { Content } from "./components/Content";
import { Context } from "./components/Context";

export default {
  title: "@navikt/layout/Article",
  component: { ArticleLayout },
};

export const OneColumn = () => {
  return <ArticleLayout mainContent={<Content />} />;
};

export const TwoColumns = () => {
  return (
    <ArticleLayout leftContent={<Navigation />} mainContent={<Content />} />
  );
};

export const ThreeColumns = () => {
  return (
    <ArticleLayout
      leftContent={<Navigation />}
      mainContent={<Content />}
      rightContent={<Context />}
    />
  );
};

export const styles = {
  ul: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  li: {
    marginBottom: "1rem",
  },
  p: {
    marginBottom: "1rem",
  },
};
