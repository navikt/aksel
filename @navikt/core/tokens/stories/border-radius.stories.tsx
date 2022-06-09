import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import * as tokens from "../dist/tokens.js";

export default {
  title: "ds-tokens/Border-radius",
} as Meta;

export const BorderRadius = () => {
  const allRadius: { [key: string]: string } = Object.entries(tokens).reduce(
    (old, [key, val]) =>
      key.startsWith("NavdsBorderRadius") ? { ...old, [key]: val } : { ...old },
    {}
  );

  const sortObject = Object.fromEntries(
    Object.entries(allRadius).sort(
      (a, b) => Number(a[1].replace("px", "")) - Number(b[1].replace("px", ""))
    )
  );

  return (
    <div className="colgap">
      {Object.entries(sortObject).map(([key, val]) => (
        <div
          key={key}
          style={{
            width: 600,
            height: 40,
            backgroundColor: "thistle",
            borderRadius: val,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {key}
        </div>
      ))}
    </div>
  );
};
