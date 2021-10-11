import { Heading } from "@navikt/ds-react";
import React, { useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import { DropdownMenu } from "..";
import { Divider } from "../..";

export default {
  title: "ds-react-internal/dropdown-menu",
  component: DropdownMenu,
};

export const All = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  return (
    <>
      <Heading level="1" size="xlarge">
        Dropdown menu
      </Heading>
      <Router>
        <span ref={(el) => setAnchorEl(el)} />
        <DropdownMenu open onClose={() => {}} anchorEl={anchorEl}>
          <DropdownMenu.DescriptionList>
            <DropdownMenu.DescriptionTerm>
              Systemer og oppslagsverk
            </DropdownMenu.DescriptionTerm>
            <DropdownMenu.DescriptionDetail>
              Gosys
            </DropdownMenu.DescriptionDetail>
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
