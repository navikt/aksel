import React from "react";
import Lenke from "nav-frontend-lenker";
import { Button } from "../../../lib";
import { styles } from "./styles";

export const LeftContent = () => (
  <ul style={styles.ul}>
    <li style={styles.li}>
      <Lenke href={"#"}>Iusto odio dignissimos</Lenke>
    </li>
    <li style={styles.li}>
      <Lenke href={"#"}>Nam libero tempore</Lenke>
    </li>
    <li style={styles.li}>
      <Lenke href={"#"}>Reiciendis voluptatibus</Lenke>
    </li>
    <li style={styles.li}>
      <Lenke href={"#"}>Earum rerum</Lenke>
    </li>
    <li style={styles.li}>
      <Button>Søk ...</Button>
    </li>
  </ul>
);
