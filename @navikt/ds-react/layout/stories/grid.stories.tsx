import React from "react";
import { Layout } from "../src/index";
import Lenke from "nav-frontend-lenker";

export default {
  title: "@navikt/layout",
  component: { Layout },
};

export const All = () => {
  const Navigation = () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Lenke href={"#"}>Test</Lenke>
      <Lenke href={"#"}>Test</Lenke>
      <Lenke href={"#"}>Test</Lenke>
      <Lenke href={"#"}>Test</Lenke>
    </div>
  );
  const Content = () => <div>Main content</div>;
  const Context = () => <div>Test</div>;
  return (
    <Layout
      columns={3}
      leftContent={<Navigation />}
      mainContent={<Content />}
      rightContent={<Context />}
    />
  );
};
