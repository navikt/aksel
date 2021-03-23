import * as React from "react";
import {
  AccordionMenu,
  AccordionMenuItem as Item,
  AccordionMenuCollapsable as Collapsable,
} from "../index";
import { NavLink, HashRouter as Router } from "react-router-dom";

export default {
  title: "ds-react/accordion-menu",
  component: { AccordionMenu },
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#F1F1F1",
        },
        {
          name: "white",
          value: "#fff",
        },
      ],
    },
  },
};

export const All = () => (
  <div
    style={{
      background: "white",
      maxWidth: 288,
    }}
  >
    <AccordionMenu>
      <Item href="#leo">Leo</Item>
      <Collapsable title="Proin">
        <Item href="#nulla" active>
          Nulla
        </Item>
        <Item href="#luctus">Luctus</Item>
      </Collapsable>
      <Collapsable title="Accumsan">
        <Item href="#justo">Justo</Item>
        <Item href="#pariatur" active>
          Pariatur
        </Item>
        <Collapsable title="Proin">
          <Item href="#nulla" active>
            Nulla
          </Item>
          <Item href="#luctus">Luctus</Item>
        </Collapsable>
      </Collapsable>
      <Item href="#justo" active>
        Justo
      </Item>
      <Item href="#pariatur">Pariatur</Item>
    </AccordionMenu>
  </div>
);

export const ReactRouter = () => (
  <AccordionMenu>
    <Collapsable title="Nivå 1 – 3 rems høy">
      <Item
        component={NavLink}
        activeClassName="navds-accordion-menu-item--active"
        to="/1"
      >
        Nivå 2 innrykk 2 rems
      </Item>
      <Item
        component={NavLink}
        activeClassName="navds-accordion-menu-item--active"
        to="/2"
      >
        Subtitle 3
      </Item>
    </Collapsable>
    <Collapsable title="Skjema og søknad">
      <Collapsable title="Satser">
        <Item
          component={NavLink}
          activeClassName="navds-accordion-menu-item--active"
          to="/3"
        >
          Nivå 3 – 3 rems innrykk Har du rett til dagpenger når du mottar annen
          økonomisk støtte fra NAV?
        </Item>
      </Collapsable>
      <Item
        component={NavLink}
        activeClassName="navds-accordion-menu-item--active"
        to="/4"
      >
        Subtitle 2
      </Item>
      <Item
        component={NavLink}
        activeClassName="navds-accordion-menu-item--active"
        to="/5"
      >
        Subtitle 3
      </Item>
    </Collapsable>
    <Collapsable title="Sakbehandlingstider">
      <Collapsable title="Subtitle 4 Lang tittel på andre nivå lorem ipsum">
        <Item
          component={NavLink}
          activeClassName="navds-accordion-menu-item--active"
          to="/6"
        >
          Subtitle 5
        </Item>
      </Collapsable>
    </Collapsable>
    <Item
      component={NavLink}
      activeClassName="navds-accordion-menu-item--active"
      to="/7"
    >
      Internasjonalt
    </Item>
    <Collapsable title="Meld fra om endringer lang tittel på første nivå">
      <Item
        component={NavLink}
        activeClassName="navds-accordion-menu-item--active"
        to="/8"
      >
        Subtitle 6
      </Item>
    </Collapsable>
    <Item
      component={NavLink}
      activeClassName="navds-accordion-menu-item--active"
      to="/9"
    >
      Nivå 1
    </Item>
  </AccordionMenu>
);

ReactRouter.decorators = [
  (Story) => (
    <Router>
      <div
        style={{
          background: "white",
          maxWidth: 288,
        }}
      >
        <Story />
      </div>
    </Router>
  ),
];
