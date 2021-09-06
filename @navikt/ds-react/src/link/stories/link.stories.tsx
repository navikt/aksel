import React from "react";
import { Alert } from "../..";
import { Link } from "..";
import { Add } from "@navikt/ds-icons";
export default {
  title: "ds-react/link",
  component: Link,
};

export const All = () => {
  return (
    <>
      <h1>Link</h1>
      <Link href="#">Dette er en tekstlenke</Link>
      <h1>Icon after</h1>
      <Link href="#">
        <span>Dette er en tekstlenke</span>
        <Add />
      </Link>
      <h1>Icon before</h1>
      <Link href="#">
        <Add />
        <span>Dette er en tekstlenke </span>
      </Link>
      <Alert variant="error">
        Her er en <Link href="#about">lenke</Link> på farget bakgrunn
      </Alert>
      <Alert variant="info">
        Her er en <Link href="#about">lenke</Link> på farget bakgrunn
      </Alert>
      <Alert variant="success">
        Her er en <Link href="#about">lenke</Link> på farget bakgrunn
      </Alert>
      <Alert variant="warning">
        Her er en <Link href="#about">lenke</Link> på farget bakgrunn
      </Alert>
    </>
  );
};
