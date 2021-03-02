import * as React from "react";
import { Button, Link } from "../../../../index";

export const Left = () => (
  <ul className={"menu"}>
    <li>
      <Link href={"#"}>Iusto odio dignissimos</Link>
    </li>
    <li>
      <Link href={"#"}>Nam libero tempore</Link>
    </li>
    <li>
      <Link href={"#"}>Reiciendis voluptatibus</Link>
    </li>
    <li>
      <Link href={"#"}>Earum rerum</Link>
    </li>
    <li>
      <Button>Søk ...</Button>
    </li>
  </ul>
);
