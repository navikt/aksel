import * as React from "react";
import {
  AccordionAnchorMenu as Menu,
  AccordionAnchorMenuCollapsable as Collapsable,
  AccordionAnchorMenuItem as Item,
} from "../index";
import { useEffect } from "react";
import {
  ProductPageLayout as Layout,
  ProductPageSection as Section,
  ProductPagePanel as Panel,
} from "../../index";
import { Right } from "../../layouts/stories/components/sections/Right";
import { LightBulb, Telephone } from "@navikt/ds-icons";
import { MainOne } from "../../layouts/stories/components/sections/Main";
import { MainTwo } from "../../layouts/stories/components/sections/Main";
import { MainThree } from "../../layouts/stories/components/sections/Main";
import { Link, HashRouter as Router } from "react-router-dom";

export default {
  title: "ds-react/accordion-anchor-menu",
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
  <Layout title={"Nunc et lorem"}>
    <Section left sticky withPadding={false}>
      <Menu title={"Minima"} smoothScrollBehavior>
        <Item href={"#leo-quis"}>Leo quis</Item>
        <Collapsable title={"Proin accumsan"}>
          <Item href={"#nulla-pariatur"}>Nulla pariatur</Item>
          <Item href={"#luctus-justo"}>Luctus justo</Item>
        </Collapsable>
        <Item href={"#maecenas-in-pretium"}>Maecenas in pretium</Item>
      </Menu>
    </Section>
    <Section whiteBackground={false} withPadding={false}>
      <Panel
        title={"Leo quis"}
        anchor={"leo-quis"}
        highlight={true}
        icon={<LightBulb />}
      >
        <MainOne title={false} />
      </Panel>
      <Panel title={"Proin accumsan"} anchor={"proin-accumsan"}>
        <MainTwo title={false} />
      </Panel>
      <Panel
        title={"Maecenas in pretium"}
        anchor={"maecenas-in-pretium"}
        icon={<Telephone />}
      >
        <MainThree title={false} />
      </Panel>
    </Section>
    <Section right sticky>
      <Right />
    </Section>
  </Layout>
);

export const ReactRouter = () => (
  <Layout title={"Nunc et lorem"}>
    <Section left sticky withPadding={false}>
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
    </Section>
    <Section whiteBackground={false} withPadding={false}>
      <Panel
        title={"Leo quis"}
        anchor={"leo-quis"}
        highlight={true}
        icon={<LightBulb />}
      >
        <MainOne title={false} />
      </Panel>
      <Panel title={"Proin accumsan"} anchor={"proin-accumsan"}>
        <MainTwo title={false} />
      </Panel>
      <Panel
        title={"Maecenas in pretium"}
        anchor={"maecenas-in-pretium"}
        icon={<Telephone />}
      >
        <MainThree title={false} />
      </Panel>
    </Section>
    <Section right sticky>
      <Right />
    </Section>
  </Layout>
);

ReactRouter.decorators = [
  (Story) => (
    <Router>
      <Story />
    </Router>
  ),
];
