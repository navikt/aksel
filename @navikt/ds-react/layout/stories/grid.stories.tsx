import React from "react";
import { Layout } from "../src/index";

export default {
  title: "@navikt/grid",
  component: { Layout },
};

export const All = () => {
  const Navigation = () => <div>Navigation</div>;
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
