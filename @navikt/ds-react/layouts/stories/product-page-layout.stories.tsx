import * as React from "react";
import { useEffect } from "react";
import { ProductPageLayout } from "../../index";
import { Left } from "./components/sections/Left";
import { Main } from "./components/sections/Main";
import { Right } from "./components/sections/Right";
import "./components/styles.css";

export default {
  title: "@navikt/layouts/ProductPage",
  component: { ProductPageLayout },
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

const title = "Nunc et lorem";
export const ThreeColumns = () => (
  <ProductPageLayout title={title}>
    <ProductPageLayout.Section left sticky>
      <Left />
    </ProductPageLayout.Section>
    <ProductPageLayout.Section>
      <Main />
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
