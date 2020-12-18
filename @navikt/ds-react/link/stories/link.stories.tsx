import React from "react";
import Link from "../src/index";
import { Add, Add1 } from "@navikt/ds-icons";
export default {
  title: "@navikt/link",
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
        <Add1 />
        <span>Dette er en tekstlenke </span>
      </Link>
    </>
  );
};
