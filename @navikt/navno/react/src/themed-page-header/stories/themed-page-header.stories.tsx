import React from "react";
import { ThemedPageHeader } from "..";
import { SocialAid, Money, Bandage } from "@navikt/ds-icons";

export default {
  title: "ds-react-navno/themed-page-header",
};

export const ThemedPageHeaderStory = () => {
  return (
    <>
      <h1>Themed Page Header</h1>
      <h2>Situation</h2>
      <ThemedPageHeader
        title="Er helt eller delvis alene med barn"
        subTitle="DETTE KAN DU HA RETT TIL"
        illustration={
          <SocialAid className="themed-page-header__illustration" /> //change
        }
        pageType="situation"
        modifiedTime="Oppdatert 15. desember 2021"
      />
      <h2>Product</h2>
      <ThemedPageHeader
        title="Arbeidsavklaringspenger (AAP)"
        subTitle="PENGESTØTTE OG OPPFØLGING"
        illustration={
          <Money className="themed-page-header__illustration" /> //change
        }
        pageType="product"
        modifiedTime="Oppdatert 20. januar 2022"
      />
      <h2>Guide</h2>
      <ThemedPageHeader
        title="Meld yrkesskade eller yrkessykdom"
        subTitle="SLIK GJØR DU"
        illustration={
          <Bandage className="themed-page-header__illustration" /> //change
        }
        pageType="guide"
        modifiedTime="Oppdatert 23. januar 2022"
      />
    </>
  );
};
