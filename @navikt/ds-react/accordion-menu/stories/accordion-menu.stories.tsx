import * as React from "react";
import {
  AccordionMenu,
  AccordionMenuItem as Item,
  AccordionMenuCollapsable as Collapsable,
} from "../index";
import { Link, HashRouter as Router } from "react-router-dom";

export default {
  title: "ds-react/accordion-menu",
  component: { AccordionMenu },
};

export const All = () => (
  <AccordionMenu>
    <Item href="#leo">Leo</Item>
    <Collapsable title="Proin">
      <Item href="#nulla">Nulla</Item>
      <Item href="#luctus">Luctus</Item>
    </Collapsable>
    <Collapsable title="Accumsan">
      <Item href="#justo">Justo</Item>
      <Item href="#pariatur">Pariatur</Item>
      <Collapsable title="Proin">
        <Item href="#nulla">Nulla</Item>
        <Item href="#luctus">Luctus</Item>
      </Collapsable>
    </Collapsable>
    <Item href="#justo">Justo</Item>
    <Item href="#pariatur">Pariatur</Item>
  </AccordionMenu>
);

export const ReactRouter = () => (
  <AccordionMenu>
    <Item component={Link} to="#leo">
      Leo
    </Item>
    <Collapsable title="Proin">
      <Item component={Link} to="#nulla">
        Nulla
      </Item>
      <Item component={Link} to="#luctus">
        Luctus
      </Item>
    </Collapsable>
    <Collapsable title="Accumsan">
      <Item component={Link} to="#justo">
        Justo
      </Item>
      <Item component={Link} to="#pariatur">
        Pariatur
      </Item>
      <Collapsable title="Proin">
        <Item component={Link} to="#nulla">
          Nulla
        </Item>
        <Item component={Link} to="#luctus">
          Luctus
        </Item>
      </Collapsable>
    </Collapsable>
    <Item component={Link} to="#justo">
      Justo
    </Item>
    <Item component={Link} to="#pariatur">
      Pariatur
    </Item>
  </AccordionMenu>
);

ReactRouter.decorators = [
  (Story) => (
    <Router>
      <Story />
    </Router>
  ),
];
