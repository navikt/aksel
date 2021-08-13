import * as React from "react";
import { AccordionMenu, AccordionMenuItem } from "../index";
import { Link, HashRouter as Router, LinkProps } from "react-router-dom";

export default {
  title: "ds-react/test",
  component: { AccordionMenu },
};

export const ReactRouter = () => (
  <Router>
    <AccordionMenu>
      <AccordionMenuItem href="yes">Nivå 1</AccordionMenuItem>
      <AccordionMenuItem as="span">Nivå 1</AccordionMenuItem>
      <AccordionMenuItem as={Link}>Nivå 1</AccordionMenuItem>
    </AccordionMenu>
  </Router>
);
