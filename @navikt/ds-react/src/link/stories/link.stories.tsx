import React from "react";
import { Alert } from "../..";
import { Link } from "..";
import { Add } from "@navikt/ds-icons";
import { ConfirmationPanel } from "../../form";
export default {
  title: "ds-react/link",
  component: Link,
};

export const All = () => {
  return (
    <>
      <h1>Link</h1>
      <Link href="#">Dette er en tekstlenke</Link>
      <h2>Icon after</h2>
      <Link href="#">
        <span>Dette er en tekstlenke</span>
        <Add />
      </Link>
      <h2>Icon before</h2>
      <Link href="#">
        <Add />
        <span>Dette er en tekstlenke </span>
      </Link>
      <h2>På farget bakgrunn</h2>
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
      <ConfirmationPanel label="Samtykke?" checked={false} error="feilmelding">
        Her er en <Link href="#about">lenke</Link> på farget bakgrunn
      </ConfirmationPanel>
      <ConfirmationPanel label="Samtykke?" checked error="feilmelding">
        Her er en <Link href="#about">lenke</Link> på farget bakgrunn
      </ConfirmationPanel>
      <ConfirmationPanel label="Samtykke?" checked={false}>
        Her er en <Link href="#about">lenke</Link> på farget bakgrunn
      </ConfirmationPanel>
      <ConfirmationPanel label="Samtykke?" checked>
        Her er en <Link href="#about">lenke</Link> på farget bakgrunn
      </ConfirmationPanel>
    </>
  );
};
