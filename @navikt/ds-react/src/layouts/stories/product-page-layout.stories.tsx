import * as React from "react";
import { useEffect } from "react";
import {
  ProductPageLayout as Layout,
  ProductPageSection as Section,
  ProductPagePanel as Panel,
} from "../../index";
import { Left } from "./components/sections/Left";
import { Main, MainOne, MainTwo, MainThree } from "./components/sections/Main";
import { Right } from "./components/sections/Right";
import { LightBulb, Telephone } from "@navikt/ds-icons";
import "./components/styles.css";

export default {
  title: "ds-react/layouts/ProductPage",
  component: Layout,
  parameters: {
    layout: "fullscreen",
  },
};

const title = "Nunc et lorem";
export const ThreeColumns = () => (
  <Layout title={title}>
    <Section left sticky>
      <Left />
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

export const TwoColumnsLeft = () => (
  <Layout title={title}>
    <Section left sticky>
      <Left />
      <Left />
    </Section>
    <Section>
      <Panel
        title={"Leo quis"}
        anchor={"leo-quis"}
        highlight={true}
        icon={<LightBulb />}
      >
        <MainOne title={false} />
      </Panel>
      <Main />
    </Section>
  </Layout>
);

export const TwoColumnsRight = () => (
  <Layout title={title}>
    <Section>
      <Main />
    </Section>
    <Section right sticky>
      <Right />
    </Section>
  </Layout>
);

export const OneColumn = () => (
  <Layout title={title}>
    <Section>
      <Main />
    </Section>
  </Layout>
);
