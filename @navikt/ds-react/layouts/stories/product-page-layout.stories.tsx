import * as React from "react";
import { useEffect } from "react";
import { ProductPageLayout } from "../../index";
import { Left } from "./components/sections/Left";
import { Main, MainOne, MainTwo, MainThree } from "./components/sections/Main";
import { Right } from "./components/sections/Right";
import { LightBulb, Telephone } from "@navikt/ds-icons";
import "./components/styles.css";

export default {
  title: "ds-react/layouts/ProductPage",
  component: ProductPageLayout,
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

const title = "Nunc et lorem";
export const ThreeColumns = () => (
  <ProductPageLayout title={title}>
    <ProductPageLayout.Section left sticky>
      <Left />
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

export const TwoColumnsLeft = () => (
  <ProductPageLayout title={title}>
    <ProductPageLayout.Section left sticky>
      <Left />
    </ProductPageLayout.Section>
    <ProductPageLayout.Section>
      <Main />
    </ProductPageLayout.Section>
  </ProductPageLayout>
);

export const TwoColumnsRight = () => (
  <ProductPageLayout title={title}>
    <ProductPageLayout.Section>
      <Main />
    </ProductPageLayout.Section>
    <ProductPageLayout.Section right sticky>
      <Right />
    </ProductPageLayout.Section>
  </ProductPageLayout>
);

export const OneColumn = () => (
  <ProductPageLayout title={title}>
    <ProductPageLayout.Section>
      <Main />
    </ProductPageLayout.Section>
  </ProductPageLayout>
);
