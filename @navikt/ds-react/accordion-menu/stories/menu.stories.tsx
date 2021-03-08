import * as React from "react";
import Menu from "../src/index";
import { useEffect } from "react";
import { ProductPageLayout } from "../../index";
import { Right } from "../../layouts/stories/components/sections/Right";
import { LightBulb, Telephone } from "@navikt/ds-icons";
import { MainOne } from "../../layouts/stories/components/sections/Main";
import { MainTwo } from "../../layouts/stories/components/sections/Main";
import { MainThree } from "../../layouts/stories/components/sections/Main";
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
    backgrounds: {
      default: "NAV gray",
      values: [
        {
          name: "NAV gray",
          value: "#f1f1f1",
        },
        {
          name: "white",
          value: "#ffffff",
        },
      ],
    },
  },
};

export const All = () => (
  <ProductPageLayout title={"TEST"}>
    <ProductPageLayout.Section left sticky>
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
