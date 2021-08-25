import * as React from "react";
import { AccordionMenu } from "../index";
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
      <AccordionMenu.Item href="#leo">Leo</AccordionMenu.Item>
      <AccordionMenu.Collapsable title="Proin">
        <AccordionMenu.Item href="#nulla" active>
          Nulla
        </AccordionMenu.Item>
        <AccordionMenu.Item href="#luctus">Luctus</AccordionMenu.Item>
      </AccordionMenu.Collapsable>
      <AccordionMenu.Collapsable title="Accumsan">
        <AccordionMenu.Item href="#justo" aria-current="page">
          Justo
        </AccordionMenu.Item>
        <AccordionMenu.Item href="#pariatur" active aria-current="page">
          Pariatur
        </AccordionMenu.Item>
        <AccordionMenu.Collapsable title="Proin">
          <AccordionMenu.Item href="#nulla" active>
            Nulla
          </AccordionMenu.Item>
          <AccordionMenu.Item href="#luctus">Luctus</AccordionMenu.Item>
        </AccordionMenu.Collapsable>
      </AccordionMenu.Collapsable>
      <AccordionMenu.Item href="#justo" active>
        Justo
      </AccordionMenu.Item>
      <AccordionMenu.Item href="#pariatur">Pariatur</AccordionMenu.Item>
    </AccordionMenu>
  </div>
);

export const ReactRouter = () => (
  <AccordionMenu>
    <AccordionMenu.Collapsable title="Nivå 1 – 3 rems høy">
      <AccordionMenu.Item
        as={NavLink}
        activeClassName="navds-accordion-menu-item--active"
        to="/1"
      >
        Nivå 2 innrykk 2 rems
      </AccordionMenu.Item>
      <AccordionMenu.Item
        as={NavLink}
        activeClassName="navds-accordion-menu-item--active"
        to="/2"
      >
        Subtitle 3
      </AccordionMenu.Item>
    </AccordionMenu.Collapsable>
    <AccordionMenu.Collapsable title="Skjema og søknad">
      <AccordionMenu.Collapsable title="Satser">
        <AccordionMenu.Item
          as={NavLink}
          activeClassName="navds-accordion-menu-item--active"
          to="/3"
        >
          Nivå 3 – 3 rems innrykk Har du rett til dagpenger når du mottar annen
          økonomisk støtte fra NAV?
        </AccordionMenu.Item>
      </AccordionMenu.Collapsable>
      <AccordionMenu.Item
        as={NavLink}
        activeClassName="navds-accordion-menu-item--active"
        to="/4"
      >
        Subtitle 2
      </AccordionMenu.Item>
      <AccordionMenu.Item
        as={NavLink}
        activeClassName="navds-accordion-menu-item--active"
        to="/5"
      >
        Subtitle 3
      </AccordionMenu.Item>
    </AccordionMenu.Collapsable>
    <AccordionMenu.Collapsable title="Sakbehandlingstider">
      <AccordionMenu.Collapsable title="Subtitle 4 Lang tittel på andre nivå lorem ipsum">
        <AccordionMenu.Item
          as={NavLink}
          activeClassName="navds-accordion-menu-item--active"
          to="/6"
        >
          Subtitle 5
        </AccordionMenu.Item>
      </AccordionMenu.Collapsable>
    </AccordionMenu.Collapsable>
    <AccordionMenu.Item
      as={NavLink}
      activeClassName="navds-accordion-menu-item--active"
      to="/7"
    >
      Internasjonalt
    </AccordionMenu.Item>
    <AccordionMenu.Collapsable title="Meld fra om endringer lang tittel på første nivå">
      <AccordionMenu.Item
        as={NavLink}
        activeClassName="navds-accordion-menu-item--active"
        to="/8"
      >
        Subtitle 6
      </AccordionMenu.Item>
    </AccordionMenu.Collapsable>
    <AccordionMenu.Item
      as={NavLink}
      activeClassName="navds-accordion-menu-item--active"
      to="/9"
    >
      Nivå 1
    </AccordionMenu.Item>
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
