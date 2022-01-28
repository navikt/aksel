import * as React from "react";
import cl from "classnames";
import { Menu } from "../index";
import { NavLink, HashRouter as Router } from "react-router-dom";
import { MenuItemProps } from "../MenuItem";

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
    <h2>Only Menu.Items</h2>
    <Menu>
      <Menu.Item href="#leo">Leo</Menu.Item>

      <Menu.Item href="#justo">Justo</Menu.Item>
      <Menu.Item href="#pariatur" active aria-current="page">
        Pariatur
      </Menu.Item>
      <Menu.Item href="#nulla">Nulla</Menu.Item>
      <Menu.Item href="#luctus">Luctus</Menu.Item>
      <Menu.Item href="#justo">Justo</Menu.Item>
      <Menu.Item href="#pariatur">Pariatur</Menu.Item>
    </Menu>

    <h2>With Collapse</h2>
    <Menu>
      <Menu.Item href="#leo">Leo</Menu.Item>
      <Menu.Collapse title="Proin">
        <Menu.Item href="#nulla" active>
          Nulla
        </Menu.Item>
        <Menu.Item href="#luctus">Luctus</Menu.Item>
      </Menu.Collapse>
      <Menu.Collapse title="Accumsan">
        <Menu.Item href="#justo" aria-current="page">
          Justo
        </Menu.Item>
        <Menu.Item href="#pariatur" active aria-current="page">
          Pariatur
        </Menu.Item>
        <Menu.Collapse title="Proin">
          <Menu.Item href="#nulla" active>
            Nulla
          </Menu.Item>
          <Menu.Collapse title="Proin">
            <Menu.Item href="#nulla" active>
              Nulla
            </Menu.Item>
            <Menu.Item href="#luctus">Luctus</Menu.Item>
          </Menu.Collapse>
          <Menu.Item href="#luctus">Luctus</Menu.Item>
        </Menu.Collapse>
      </Menu.Collapse>
      <Menu.Item href="#justo" active>
        Justo
      </Menu.Item>
      <Menu.Item href="#pariatur">Pariatur</Menu.Item>
    </Menu>
  </div>
);

export const ReactRouter = () => {
  const MenuItemLink = (props: MenuItemProps & { to: string }) => {
    const { to } = props;

    const CustomLink = React.useMemo(
      () => (props: MenuItemProps) => (
        <NavLink
          {...props}
          to={to}
          className={({ isActive }) =>
            cl(props.className, {
              "navds-menu-item--active": isActive,
            })
          }
        />
      ),
      [to]
    );

    return (
      <Menu.Item {...props} as={CustomLink}>
        Nivå 2 innrykk 2 rems
      </Menu.Item>
    );
  };

  return (
    <Menu>
      <Menu.Collapse title="Nivå 1 - 3 rems høy">
        <MenuItemLink to="/1">Nivå 2 innrykk 2 rems</MenuItemLink>
        <MenuItemLink to="/2">Subtitle 3</MenuItemLink>
      </Menu.Collapse>
      <Menu.Collapse title="Skjema og søknad">
        <Menu.Collapse title="Satser">
          <MenuItemLink to="/3">
            Nivå 3 - 3 rems innrykk Har du rett til dagpenger når du mottar
            annen økonomisk støtte fra NAV?
          </MenuItemLink>
        </Menu.Collapse>
        <MenuItemLink to="/4">Subtitle 2</MenuItemLink>
        <MenuItemLink to="/5">Subtitle 3</MenuItemLink>
      </Menu.Collapse>
      <Menu.Collapse title="Sakbehandlingstider">
        <Menu.Collapse title="Subtitle 4 Lang tittel på andre nivå lorem ipsum">
          <MenuItemLink to="/6">Subtitle 5</MenuItemLink>
        </Menu.Collapse>
      </Menu.Collapse>
      <MenuItemLink to="/7">Internasjonalt</MenuItemLink>
      <Menu.Collapse title="Meld fra om endringer lang tittel på første nivå">
        <MenuItemLink to="/8">Subtitle 6</MenuItemLink>
      </Menu.Collapse>
      <MenuItemLink to="/9">Nivå 1</MenuItemLink>
    </Menu>
  );
};

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
