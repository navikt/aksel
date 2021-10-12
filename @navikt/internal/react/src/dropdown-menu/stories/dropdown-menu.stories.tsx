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
          <DropdownMenu.GroupedList>
            <DropdownMenu.GroupedList.Heading>
              Systemer og oppslagsverk
            </DropdownMenu.GroupedList.Heading>
            <DropdownMenu.GroupedList.Item>Gosys</DropdownMenu.GroupedList.Item>
          </DropdownMenu.GroupedList>
          <Divider />
          <DropdownMenu.List>
            <DropdownMenu.List.Item>Gosys</DropdownMenu.List.Item>
            <DropdownMenu.List.Item>Psys</DropdownMenu.List.Item>
          </DropdownMenu.List>
        </DropdownMenu>
      </Router>
    </>
  );
};
