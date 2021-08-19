import * as React from "react";
import {
  AccordionAnchorMenu as Menu,
  AccordionAnchorMenuCollapsable as Collapsable,
  AccordionAnchorMenuItem as Item,
} from "../index";
import { Link, HashRouter as Router } from "react-router-dom";

export default {
  title: "ds-react/accordion-anchor-menu",
  component: { Menu },
  parameters: {
    layout: "fullscreen",
  },
};

export const All = () => (
  <Menu title={"Minima"}>
    <Item href={"#leo-quis"}>Leo quis</Item>
    <Collapsable title={"Proin accumsan"}>
      <Item href={"#nulla-pariatur"}>Nulla pariatur</Item>
      <Item href={"#luctus-justo"}>Luctus justo</Item>
    </Collapsable>
    <Item href={"#maecenas-in-pretium"}>Maecenas in pretium</Item>
  </Menu>
);

export const ReactRouter = () => (
  <Menu>
    <Item component={Link} to="/link1">
      Leo quis
    </Item>
    <Collapsable title={"Proin accumsan"}>
      <Item component={Link} to="/link2">
        Nulla pariatur
      </Item>
      <Item component={Link} to="/link3">
        Luctus justo
      </Item>
    </Collapsable>
    <Collapsable title={"Sint cupidatat"}>
      <Item component={Link} to="/link4">
        Nulla pariatur
      </Item>
      <Item component={Link} to="/link5">
        Luctus justo
      </Item>
    </Collapsable>
    <Item component={Link} to="/link6">
      Maecenas in pretium
    </Item>
  </Menu>
);

ReactRouter.decorators = [
  (Story) => (
    <Router>
      <Story />
    </Router>
  ),
];
