import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import * as tokens from "../dist/tokens.js";

export default {
  title: "ds-tokens/Shadows",
} as Meta;

export const Shadows = () => {
  const allShadows: { [key: string]: string } = Object.entries(tokens).reduce(
    (old, [key, val]) =>
      key.startsWith("NavdsShadow") ? { ...old, [key]: val } : { ...old },
    {}
  );

  return (
    <div className="colgap" style={{ gap: "4rem" }}>
      {Object.entries(allShadows).map(([key, val]) => (
        <div
          key={key}
          style={{
            height: 40,
            width: 600,
            boxShadow: val,
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
