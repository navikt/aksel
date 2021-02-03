import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import { InternalHeader } from "../src/index";

export default {
  title: "@navikt/internal-header",
  component: InternalHeader,
};

export const All = () => (
  <div>
    <InternalHeader>
      <InternalHeader.Title>NAV Sykepenger</InternalHeader.Title>
      <InternalHeader.User name="Kong Harald" ident="D123456" />
    </InternalHeader>

    <h1>Uten innhold</h1>
    <InternalHeader />

    <h1>Title</h1>
    <InternalHeader>
      <InternalHeader.Title>Tittel</InternalHeader.Title>
    </InternalHeader>

    <h1>Title but not heading</h1>
    <InternalHeader>
      <InternalHeader.Title element="span">Tittel</InternalHeader.Title>
    </InternalHeader>

    <h1>Title with link</h1>
    <InternalHeader>
      <InternalHeader.Title>
        <a href="/#">Tittel med lenke</a>
      </InternalHeader.Title>
    </InternalHeader>

    <h1>Title with react-router link</h1>
    <Router>
      <InternalHeader>
        <InternalHeader.Title>
          <Link to="/">Tittel med lenke</Link>
        </InternalHeader.Title>
      </InternalHeader>
    </Router>

    <h1>Title + User</h1>
    <InternalHeader>
      <InternalHeader.Title>NAV Sykepenger</InternalHeader.Title>
      <InternalHeader.User name="Kong Harald" ident="D123456" />
    </InternalHeader>
  </div>
);
