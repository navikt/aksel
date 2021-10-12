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
      <Dropdown>
        <Dropdown.Toggle>Toggle</Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Heading>
              Systemer og oppslagsverk
            </Dropdown.Menu.GroupedList.Heading>
            <Dropdown.Menu.GroupedList.Item>
              Gosys
            </Dropdown.Menu.GroupedList.Item>
          </Dropdown.Menu.GroupedList>
          <Divider />
          <Dropdown.Menu.List>
            <Dropdown.Menu.List.Item>Gosys</Dropdown.Menu.List.Item>
            <Dropdown.Menu.List.Item>Psys</Dropdown.Menu.List.Item>
          </Dropdown.Menu.List>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
