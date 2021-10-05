import { Heading } from "@navikt/ds-react";
import React, { useState } from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import { DropdownMenu } from "..";

export default {
  title: "ds-react-internal/dropdown-menu",
  component: DropdownMenu,
};

export const All = () => {
  const [anchorEl, setAnchorEl] = useState<Element>();

  return (
    <>
      <span ref={(el) => setAnchorEl(el)} />
      <DropdownMenu open onClose={() => {}} anchorEl={anchorEl}>
        <Heading level="2" size="xsmall">
          asdf
        </Heading>
        <Divider />
        <DropdownMenu.Item>Logg ut</DropdownMenu.Item>
      </DropdownMenu>
    </>
  );
};
