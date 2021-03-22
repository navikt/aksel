import * as React from "react";
import Menu from "../index";
import { useEffect } from "react";
import { ProductPageLayout } from "../../index";
import { Right } from "../../layouts/stories/components/sections/Right";
import { LightBulb, Telephone } from "@navikt/ds-icons";
import { MainOne } from "../../layouts/stories/components/sections/Main";
import { MainTwo } from "../../layouts/stories/components/sections/Main";
import { MainThree } from "../../layouts/stories/components/sections/Main";
import { Link, HashRouter as Router } from "react-router-dom";

import "./components/styles.css";

export default {
  title: "ds-react/accordion-menu",
  component: { Menu },
  decorators: [
    (Story) => {
      useEffect(() => {
        document.getElementById("decorator-header").style.display = "block";
        document.getElementById("decorator-footer").style.display = "block";
        return () => {
          document.getElementById("decorator-header").style.display = "none";
          document.getElementById("decorator-footer").style.display = "none";
        };
      }, []);
      return <Story />;
    },
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export const All = () => (
  <ProductPageLayout title={"Nunc et lorem"}>
    <ProductPageLayout.Section left sticky withPadding={false}>
      <Menu title={"Minima"}>
        <Menu.Item href={"#leo-quis"}>Leo quis</Menu.Item>
        <Menu.Collapsable title={"Proin accumsan"}>
          <Menu.Item href={"#nulla-pariatur"}>Nulla pariatur</Menu.Item>
          <Menu.Item href={"#luctus-justo"}>Luctus justo</Menu.Item>
        </Menu.Collapsable>
        <Menu.Item href={"#maecenas-in-pretium"}>Maecenas in pretium</Menu.Item>
      </Menu>
    </ProductPageLayout.Section>
    <ProductPageLayout.Section whiteBackground={false} withPadding={false}>
      <ProductPageLayout.Panel
        title={"Leo quis"}
        anchor={"leo-quis"}
        highlight={true}
        icon={<LightBulb />}
      >
        <MainOne title={false} />
      </ProductPageLayout.Panel>
      <ProductPageLayout.Panel
        title={"Proin accumsan"}
        anchor={"proin-accumsan"}
      >
        <MainTwo title={false} />
      </ProductPageLayout.Panel>
      <ProductPageLayout.Panel
        title={"Maecenas in pretium"}
        anchor={"maecenas-in-pretium"}
        icon={<Telephone />}
      >
        <MainThree title={false} />
      </ProductPageLayout.Panel>
    </ProductPageLayout.Section>
    <ProductPageLayout.Section right sticky>
      <Right />
    </ProductPageLayout.Section>
  </ProductPageLayout>
);

export const ReactRouter = () => (
  <ProductPageLayout title={"Nunc et lorem"}>
    <ProductPageLayout.Section left sticky withPadding={false}>
      <Menu>
        <Menu.Item component={Link} to="/link1">
          Leo quis
        </Menu.Item>
        <Menu.Collapsable title={"Proin accumsan"}>
          <Menu.Item component={Link} to="/link2">
            Nulla pariatur
          </Menu.Item>
          <Menu.Item component={Link} to="/link3">
            Luctus justo
          </Menu.Item>
        </Menu.Collapsable>
        <Menu.Collapsable title={"Sint cupidatat"}>
          <Menu.Item component={Link} to="/link4">
            Nulla pariatur
          </Menu.Item>
          <Menu.Item component={Link} to="/link5">
            Luctus justo
          </Menu.Item>
        </Menu.Collapsable>
        <Menu.Item component={Link} to="/link6">
          Maecenas in pretium
        </Menu.Item>
      </Menu>
    </ProductPageLayout.Section>
    <ProductPageLayout.Section whiteBackground={false} withPadding={false}>
      <ProductPageLayout.Panel
        title={"Leo quis"}
        anchor={"leo-quis"}
        highlight={true}
        icon={<LightBulb />}
      >
        <MainOne title={false} />
      </ProductPageLayout.Panel>
      <ProductPageLayout.Panel
        title={"Proin accumsan"}
        anchor={"proin-accumsan"}
      >
        <MainTwo title={false} />
      </ProductPageLayout.Panel>
      <ProductPageLayout.Panel
        title={"Maecenas in pretium"}
        anchor={"maecenas-in-pretium"}
        icon={<Telephone />}
      >
        <MainThree title={false} />
      </ProductPageLayout.Panel>
    </ProductPageLayout.Section>
    <ProductPageLayout.Section right sticky>
      <Right />
    </ProductPageLayout.Section>
  </ProductPageLayout>
);

ReactRouter.decorators = [
  (Story) => (
    <Router>
      <Story />
    </Router>
  ),
];
