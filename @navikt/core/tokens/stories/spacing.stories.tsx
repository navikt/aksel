import React from "react";
import { Meta } from "@storybook/react";
import * as tokens from "../dist/tokens.js";

export default {
  title: "ds-tokens/Spacing",
} as Meta;

export const Spacing = () => {
  const allSpacing: { [key: string]: string } = Object.entries(tokens).reduce(
    (old, [key, val]) =>
      key.startsWith("ASpacing") ? { ...old, [key]: val } : { ...old },
    {}
  );

  const sortObject = Object.fromEntries(
    Object.entries(allSpacing).sort(
      (a, b) =>
        Number(a[0].replace("ASpacing", "")) -
        Number(b[0].replace("ASpacing", ""))
    )
  );

  return (
    <div className="colgap">
      {Object.entries(sortObject).map(([key, val]) => (
        <div>
          <div
            key={key}
            style={{
              width: val,
              height: 40,
              backgroundColor: "var(--a-lightblue-200)",
              display: "flex",
              alignItems: "center",
            }}
          />
        </div>
      ))}
    </div>
  );
};
