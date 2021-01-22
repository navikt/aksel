import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import {
  InternalHeader,
  InternalHeaderTitle,
  InternalHeaderUser,
} from "../src/index";

export default {
  title: "@navikt/internal-header",
  component: InternalHeader,
};

export const All = () => (
  <div>
    <InternalHeader>
      <InternalHeaderTitle>NAV Sykepenger</InternalHeaderTitle>
      <InternalHeaderUser name="Kong Harald" ident="D123456" />
    </InternalHeader>

    <h1>Uten innhold</h1>
    <InternalHeader />

    <h1>Title</h1>
    <InternalHeader>
      <InternalHeaderTitle>Tittel</InternalHeaderTitle>
    </InternalHeader>

    <h1>Title with link</h1>
    <InternalHeader>
      <InternalHeaderTitle href="/#">Tittel med lenke</InternalHeaderTitle>
    </InternalHeader>

    <h1>Title with react-router link</h1>
    <Router>
      <InternalHeader>
        <InternalHeaderTitle element={Link} to="/">
          <span style={{ display: "flex", gap: 4 }}>
            <img src="https://www.nav.no/dekoratoren/media/nav-logo-red.svg" />
            <h1>Tittel med lenke</h1>
          </span>
        </InternalHeaderTitle>
      </InternalHeader>
    </Router>

    <h1>Title + User</h1>
    <InternalHeader>
      <InternalHeaderTitle>NAV Sykepenger</InternalHeaderTitle>
      <InternalHeaderUser name="Kong Harald" ident="D123456" />
    </InternalHeader>
  </div>
);
