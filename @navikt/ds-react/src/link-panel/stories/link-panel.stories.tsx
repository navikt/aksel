import React from "react";
import { HashRouter, Link } from "react-router-dom";
import { LinkPanel, LinkPanelTitle } from "../index";
import { Illustration } from "./illustration";

export default {
  title: "ds-react/linkPanel",
  component: LinkPanel,
};

export const All = () => {
  return (
    <>
      <h1>Link</h1>
      <LinkPanel href="#">Dette er en tekstlenke</LinkPanel>

      <h1>No border</h1>
      <LinkPanel href="#" border={false}>
        Dette er en tekstlenke
      </LinkPanel>

      <h1>Custom styling</h1>
      <LinkPanel href="#" style={{ textDecoration: "none" }}>
        <div
          style={{
            padding: "1rem",
            display: "grid",
            gridAutoFlow: "column",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {Illustration}
          <div>
            <LinkPanelTitle>Dagpenger</LinkPanelTitle>
            <p>
              Du kan få dagpenger når du er arbeidsledig og har mistet inntekten
              din.
            </p>
          </div>
        </div>
      </LinkPanel>

      <HashRouter>
        <LinkPanel override>
          <Link to="sup">overridden link</Link>
        </LinkPanel>
      </HashRouter>
    </>
  );
};
