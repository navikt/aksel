import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import { InternalHeader, InternalHeaderTitle, InternalHeaderUser } from "..";

export default {
  title: "ds-react/internal-header",
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

    <h1>Title but not heading</h1>
    <InternalHeader>
      <InternalHeaderTitle element="span">Tittel</InternalHeaderTitle>
    </InternalHeader>

    <h1>Title with link</h1>
    <InternalHeader>
      <InternalHeaderTitle>
        <a href="/#">Tittel med lenke</a>
      </InternalHeaderTitle>
    </InternalHeader>

    <h1>Title with react-router link</h1>
    <Router>
      <InternalHeader>
        <InternalHeaderTitle>
          <Link to="/">Tittel med lenke</Link>
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
