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
        <Item href="#justo" aria-current="page">
          Justo
        </Item>
        <Item href="#pariatur" active aria-current="page">
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
      <Item override>
        <NavLink to="/1" activeClassName="navds-accordion-menu-item--active">
          Nivå 2 innrykk 2 rems
        </NavLink>
      </Item>
      <Item override>
        <NavLink to="/2" activeClassName="navds-accordion-menu-item--active">
          Subtitle 3
        </NavLink>
      </Item>
    </Collapsable>
    <Collapsable title="Skjema og søknad">
      <Collapsable title="Satser">
        <Item override>
          <NavLink to="/3" activeClassName="navds-accordion-menu-item--active">
            Nivå 3 – 3 rems innrykk Har du rett til dagpenger når du mottar
            annen økonomisk støtte fra NAV?
          </NavLink>
        </Item>
      </Collapsable>
      <Item override>
        <NavLink to="/4" activeClassName="navds-accordion-menu-item--active">
          Subtitle 2
        </NavLink>
      </Item>
      <Item override>
        <NavLink to="/5" activeClassName="navds-accordion-menu-item--active">
          Subtitle 3
        </NavLink>
      </Item>
    </Collapsable>
    <Collapsable title="Sakbehandlingstider">
      <Collapsable title="Subtitle 4 Lang tittel på andre nivå lorem ipsum">
        <Item override>
          <NavLink to="/6" activeClassName="navds-accordion-menu-item--active">
            Subtitle 5
          </NavLink>
        </Item>
      </Collapsable>
    </Collapsable>
    <Item override>
      <NavLink to="/7" activeClassName="navds-accordion-menu-item--active">
        Internasjonalt
      </NavLink>
    </Item>
    <Collapsable title="Meld fra om endringer lang tittel på første nivå">
      <Item override>
        <NavLink to="/8" activeClassName="navds-accordion-menu-item--active">
          Subtitle 6
        </NavLink>
      </Item>
    </Collapsable>
    <Item override>
      <NavLink to="/9" activeClassName="navds-accordion-menu-item--active">
        Nivå 1
      </NavLink>
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
