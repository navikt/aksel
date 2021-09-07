import React from "react";
import { Link } from "..";
import { Add } from "@navikt/ds-icons";
import { HashRouter, Link as RRLink } from "react-router-dom";
export default {
  title: "ds-react/link",
  component: Link,
};

export const All = () => (
  <>
    <h1>Link</h1>
    <Link href="#">Dette er en tekstlenke</Link>
    <h2>Icon after</h2>
    <Link href="#">
      Dette er en tekstlenke
      <Add />
    </Link>
    <h2>Icon before</h2>
    <Link href="#">
      <Add />
      Dette er en tekstlenke
    </Link>
    <h2>As react-router link</h2>
    <HashRouter>
      <Link as={RRLink} to="/about">
        react-router link
      </Link>
    </HashRouter>
  </>
);
