import React from "react";
import { LargeCard, MicroCard } from "..";

export default {
  title: "ds-react-navno/product-card",
};

export const All = () => {
  return (
    <>
      <h2>Micro card</h2>
      <MicroCard href="#">Sit laborum aliqua.</MicroCard>
      <h2>Product card</h2>
      <LargeCard>tekst</LargeCard>
    </>
  );
};

export const MicroCardStory = () => {
  return (
    <>
      <MicroCard href="#">Sit laborum aliqua.</MicroCard>
    </>
  );
};

export const LargeCardStory = () => {
  return (
    <>
      <LargeCard href="#">Sit laborum aliqua.</LargeCard>
    </>
  );
};
