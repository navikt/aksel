import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import { InternalHeader } from "../index";

export default {
  title: "ds-react/internal-header",
  component: InternalHeader,
};

export const All = () => (
  <div>
    <InternalHeader>
      <InternalHeader.Title>NAV Sykepenger</InternalHeader.Title>
      <InternalHeader.User name="Ola Normann" ident="D123456" />
    </InternalHeader>

    <h1>Uten innhold</h1>
    <InternalHeader />

    <h1>Title</h1>
    <InternalHeader>
      <InternalHeader.Title>Tittel</InternalHeader.Title>
    </InternalHeader>

    <h1>Title but not heading</h1>
    <InternalHeader>
      <InternalHeader.Title as="span">Tittel</InternalHeader.Title>
    </InternalHeader>

    <h1>Title with link</h1>
    <InternalHeader>
      <InternalHeader.Title>
        <a href="#123">Tittel med lenke</a>
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
      <InternalHeader.User name="Ola Normann" ident="D123456" />
    </InternalHeader>
  </div>
);
