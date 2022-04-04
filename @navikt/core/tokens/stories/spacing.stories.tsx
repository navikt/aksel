import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import * as tokens from "../dist/tokens.js";

export default {
  title: "ds-tokens/spacing",
} as Meta;

export const BorderRadius = () => {
  const allSpacing: { [key: string]: string } = Object.entries(tokens).reduce(
    (old, [key, val]) =>
      key.startsWith("NavdsSpacing") ? { ...old, [key]: val } : { ...old },
    {}
  );

  const sortObject = Object.fromEntries(
    Object.entries(allSpacing).sort(
      (a, b) =>
        Number(a[0].replace("NavdsSpacing", "")) -
        Number(b[0].replace("NavdsSpacing", ""))
    )
  );

  return (
    <div className="colgap">
      {Object.entries(sortObject).map(([key, val]) => (
        <div>
          {key}
          <div
            key={key}
            style={{
              width: val,
              height: 40,
              backgroundColor: "thistle",
              display: "flex",
              alignItems: "center",
            }}
          />
        </div>
      ))}
    </div>
  );
};
