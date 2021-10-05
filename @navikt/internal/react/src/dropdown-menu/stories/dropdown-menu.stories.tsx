import { Heading } from "@navikt/ds-react";
import React, { useState } from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import { ExternalLink } from "@navikt/ds-icons";
import { DropdownMenu } from "..";
import { Divider } from "../..";

export default {
  title: "ds-react-internal/dropdown-menu",
  component: DropdownMenu,
};

export const All = () => {
  const [anchorEl, setAnchorEl] = useState<Element>();

  return (
    <Router>
      <span ref={(el) => setAnchorEl(el)} />
      <DropdownMenu open onClose={() => {}} anchorEl={anchorEl}>
        <Heading level="2" size="xsmall">
          Systemer og oppslagsverk
        </Heading>
        <DropdownMenu.Item as={Link} to="/settings">
          Innstillinger
        </DropdownMenu.Item>
        <DropdownMenu.Item as="a" href="https://example.org" target="_blank">
          <span>Gosys</span>
          <ExternalLink style={{ fontSize: "0.875rem" }} />
        </DropdownMenu.Item>
        <Divider />
        <DropdownMenu.Item onClick={() => {}}>Logg ut</DropdownMenu.Item>
      </DropdownMenu>
    </Router>
  );
};
