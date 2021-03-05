import React from "react";
import Snakkeboble from "../src/snakkeboble";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Snakkeboble",
  component: Snakkeboble,
} as Meta;

export const All = () => {
  return (
    <div style={{ display: "grid", gridAutoRows: "8rem", rowGap: "2rem" }}>
      <Snakkeboble topp="14.07.2017 kl. 10:12">
        Hei! Jeg lurer på en ting...
      </Snakkeboble>
      <Snakkeboble topp="14.07.2017 kl. 10:12" pilHoyre={true}>
        Hei! Jeg lurer på en ting...
      </Snakkeboble>
    </div>
  );
};
