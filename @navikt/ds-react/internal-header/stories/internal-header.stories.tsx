import React from "react";
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
      <InternalHeaderTitle>
        <a href="/#">Tittel med lenke</a>
      </InternalHeaderTitle>
    </InternalHeader>

    <h1>Title + User</h1>
    <InternalHeader>
      <InternalHeaderTitle>NAV Sykepenger</InternalHeaderTitle>
      <InternalHeaderUser name="Kong Harald" ident="D123456" />
    </InternalHeader>
  </div>
);
