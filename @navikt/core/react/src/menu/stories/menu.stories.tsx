import * as React from "react";
import cl from "classnames";
import { Menu } from "../index";
import { NavLink, HashRouter as Router } from "react-router-dom";
import { Button } from "../..";
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
      <Button>Test</Button>
    </Menu>

    <h2>With Drawers</h2>
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
          <Menu.Drawer title="Proin">
            <Menu.Item href="#nulla" active>
              Nulla
            </Menu.Item>
            <Menu.Item href="#luctus">Luctus</Menu.Item>
          </Menu.Drawer>
          <Menu.Item href="#luctus">Luctus</Menu.Item>
        </Menu.Drawer>
      </Menu.Drawer>
      <Menu.Item href="#justo" active>
        Justo
      </Menu.Item>
      <Menu.Item href="#pariatur">Pariatur</Menu.Item>
    </Menu>
    <h2>With links</h2>
    <Menu>
      <Menu.Link href="#leo">Leo</Menu.Link>

      <Menu.Link href="#justo">Justo</Menu.Link>
      <Menu.Link href="#pariatur">Pariatur</Menu.Link>
      <Menu.Link href="#nulla">Nulla</Menu.Link>
      <Menu.Link href="#luctus">Luctus</Menu.Link>
      <Menu.Link href="#justo">Justo</Menu.Link>
      <Menu.Link href="#pariatur">Pariatur</Menu.Link>
      <Button>Test</Button>
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
      <Menu.Drawer title="Nivå 1 - 3 rems høy">
        <MenuItemLink to="/1">Nivå 2 innrykk 2 rems</MenuItemLink>
        <MenuItemLink to="/2">Subtitle 3</MenuItemLink>
      </Menu.Drawer>
      <Menu.Drawer title="Skjema og søknad">
        <Menu.Drawer title="Satser">
          <MenuItemLink to="/3">
            Nivå 3 - 3 rems innrykk Har du rett til dagpenger når du mottar
            annen økonomisk støtte fra NAV?
          </MenuItemLink>
        </Menu.Drawer>
        <MenuItemLink to="/4">Subtitle 2</MenuItemLink>
        <MenuItemLink to="/5">Subtitle 3</MenuItemLink>
      </Menu.Drawer>
      <Menu.Drawer title="Sakbehandlingstider">
        <Menu.Drawer title="Subtitle 4 Lang tittel på andre nivå lorem ipsum">
          <MenuItemLink to="/6">Subtitle 5</MenuItemLink>
        </Menu.Drawer>
      </Menu.Drawer>
      <MenuItemLink to="/7">Internasjonalt</MenuItemLink>
      <Menu.Drawer title="Meld fra om endringer lang tittel på første nivå">
        <MenuItemLink to="/8">Subtitle 6</MenuItemLink>
      </Menu.Drawer>
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
