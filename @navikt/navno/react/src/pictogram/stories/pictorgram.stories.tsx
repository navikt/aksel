import React from "react";
import { Pictogram } from "..";

import * as Gjenlevendepensjon from "../gjenlevendepensjon";

export default {
  title: "ds-react-navno/pictogram",
  argTypes: {
    isActive: {
      name: "isActive",
      type: { name: "boolean", required: false },
      defaultValue: false,
    },
  },
};

export const All = (props) => {
  const { isActive } = props;
  return (
    <>
      <h1>Pictograms</h1>
      <h2>Gjenlevendepensjon</h2>
      <Pictogram
        front={Gjenlevendepensjon.Front}
        back={Gjenlevendepensjon.Back}
        isActive={isActive}
        className={`${isActive ? "activeInvert" : ""}`}
      />
    </>
  );
};
