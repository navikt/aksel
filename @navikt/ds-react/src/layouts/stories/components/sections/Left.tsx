import * as React from "react";
import { Button, Link } from "../../../..";

export const Left = () => (
  <ul className={"navds-story-menu"}>
    <li>
      <Link href={"#leo-quis"}>Leo quis</Link>
    </li>
    <li>
      <Link href={"#proin-accumsan"}>Proin accumsan</Link>
    </li>
    <li>
      <Link href={"#nulla-pariatur"}>Nulla pariatur?</Link>
    </li>
    <li>
      <Link href={"#maecenas-in-pretium"}>Maecenas in pretium</Link>
    </li>
    <li>
      <Button>Søk ...</Button>
    </li>
  </ul>
);
