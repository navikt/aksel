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
    <>
      <Heading level="1" size="xlarge">
        Dropdown menu
      </Heading>
      <Router>
        <span ref={(el) => setAnchorEl(el)} />
        <DropdownMenu open onClose={() => {}} anchorEl={anchorEl}>
          <DropdownMenu.DescriptionList>
            <DropdownMenu.Heading>
              Systemer og oppslagsverk
            </DropdownMenu.Heading>
            <DropdownMenu.DescriptionListItem>
              Gosys
            </DropdownMenu.DescriptionListItem>
          </DropdownMenu.DescriptionList>
          <Divider />
          <DropdownMenu.List>
            <DropdownMenu.Item>Gosys</DropdownMenu.Item>
            <DropdownMenu.Item>Psys</DropdownMenu.Item>
          </DropdownMenu.List>
        </DropdownMenu>
      </Router>
    </>
  );
};
