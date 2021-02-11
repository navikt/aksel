import * as React from "react";
import Lenke from "nav-frontend-lenker";
import { Button } from "../../../../lib";

export const Left = () => (
  <ul className={"menu"}>
    <li>
      <Lenke href={"#"}>Iusto odio dignissimos</Lenke>
    </li>
    <li>
      <Lenke href={"#"}>Nam libero tempore</Lenke>
    </li>
    <li>
      <Lenke href={"#"}>Reiciendis voluptatibus</Lenke>
    </li>
    <li>
      <Lenke href={"#"}>Earum rerum</Lenke>
    </li>
    <li>
      <Button>Søk ...</Button>
    </li>
  </ul>
);
