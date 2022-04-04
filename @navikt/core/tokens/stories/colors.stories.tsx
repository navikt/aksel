import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import * as tokens from "../dist/tokens.js";

export default {
  title: "ds-tokens/Colors",
} as Meta;

export const Global = () => {
  const globalColors: { [key: string]: string } = Object.entries(tokens).reduce(
    (old, [key, val]) =>
      key.includes("GlobalColor") ? { ...old, [key]: val } : { ...old },
    {}
  );

  return (
    <div className="colgap">
      {Object.entries(globalColors).map(([key, val]) => (
        <div key={key}>
          <span>{key}</span>
          <div style={{ background: val, width: 600, height: 40 }} />
        </div>
      ))}
    </div>
  );
};

export const Semantic = () => {
  const globalColors: { [key: string]: string } = Object.entries(tokens).reduce(
    (old, [key, val]) =>
      key.includes("SemanticColor") ? { ...old, [key]: val } : { ...old },
    {}
  );

  return (
    <div className="colgap">
      {Object.entries(globalColors).map(([key, val]) => (
        <div key={key}>
          <span>{key}</span>
          <div style={{ background: val, width: 600, height: 40 }} />
        </div>
      ))}
    </div>
  );
};
