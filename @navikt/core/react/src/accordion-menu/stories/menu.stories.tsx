import * as React from "react";
import { Menu } from "../index";
import { NavLink, HashRouter as Router } from "react-router-dom";

export default {
  title: "ds-react/menu",
  component: { Menu },
};

export const All = () => (
  <div
    style={{
      background: "white",
      maxWidth: 288,
    }}
  >
    <Menu>
      <Menu.Item href="#leo">Leo</Menu.Item>
      <Menu.Drawer title="Proin">
        <Menu.Item href="#nulla" active>
          Nulla
        </Menu.Item>
        <Menu.Item href="#luctus">Luctus</Menu.Item>
      </Menu.Drawer>
      <Menu.Drawer title="Accumsan">
        <Menu.Item href="#justo" aria-current="page">
          Justo
        </Menu.Item>
        <Menu.Item href="#pariatur" active aria-current="page">
          Pariatur
        </Menu.Item>
        <Menu.Drawer title="Proin">
          <Menu.Item href="#nulla" active>
            Nulla
          </Menu.Item>
          <Menu.Item href="#luctus">Luctus</Menu.Item>
        </Menu.Drawer>
      </Menu.Drawer>
      <Menu.Item href="#justo" active>
        Justo
      </Menu.Item>
      <Menu.Item href="#pariatur">Pariatur</Menu.Item>
    </Menu>
  </div>
);

export const ReactRouter = () => (
  <Menu>
    <Menu.Drawer title="Nivå 1 – 3 rems høy">
      <Menu.Item
        as={NavLink}
        activeClassName="navds-accordion-menu-item--active"
        to="/1"
      >
        Nivå 2 innrykk 2 rems
      </Menu.Item>
      <Menu.Item
        as={NavLink}
        activeClassName="navds-accordion-menu-item--active"
        to="/2"
      >
        Subtitle 3
      </Menu.Item>
    </Menu.Drawer>
    <Menu.Drawer title="Skjema og søknad">
      <Menu.Drawer title="Satser">
        <Menu.Item
          as={NavLink}
          activeClassName="navds-accordion-menu-item--active"
          to="/3"
        >
          Nivå 3 – 3 rems innrykk Har du rett til dagpenger når du mottar annen
          økonomisk støtte fra NAV?
        </Menu.Item>
      </Menu.Drawer>
      <Menu.Item
        as={NavLink}
        activeClassName="navds-accordion-menu-item--active"
        to="/4"
      >
        Subtitle 2
      </Menu.Item>
      <Menu.Item
        as={NavLink}
        activeClassName="navds-accordion-menu-item--active"
        to="/5"
      >
        Subtitle 3
      </Menu.Item>
    </Menu.Drawer>
    <Menu.Drawer title="Sakbehandlingstider">
      <Menu.Drawer title="Subtitle 4 Lang tittel på andre nivå lorem ipsum">
        <Menu.Item
          as={NavLink}
          activeClassName="navds-accordion-menu-item--active"
          to="/6"
        >
          Subtitle 5
        </Menu.Item>
      </Menu.Drawer>
    </Menu.Drawer>
    <Menu.Item
      as={NavLink}
      activeClassName="navds-accordion-menu-item--active"
      to="/7"
    >
      Internasjonalt
    </Menu.Item>
    <Menu.Drawer title="Meld fra om endringer lang tittel på første nivå">
      <Menu.Item
        as={NavLink}
        activeClassName="navds-accordion-menu-item--active"
        to="/8"
      >
        Subtitle 6
      </Menu.Item>
    </Menu.Drawer>
    <Menu.Item
      as={NavLink}
      activeClassName="navds-accordion-menu-item--active"
      to="/9"
    >
      Nivå 1
    </Menu.Item>
  </Menu>
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
