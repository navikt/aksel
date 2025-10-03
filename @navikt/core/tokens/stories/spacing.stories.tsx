import { Meta } from "@storybook/react-vite";
import React from "react";
import { Tooltip } from "@navikt/ds-react";
import * as tokens from "../dist/tokens.js";

export default {
  title: "ds-tokens/Spacing",
} satisfies Meta;

export const Spacing = () => {
  const allSpacing: { [key: string]: string } = Object.entries(tokens).reduce(
    (old, [key, val]) => {
      if (key.startsWith("ASpacing")) {
        old[key] = val;
      }
      return old;
    },
    {},
  );

  const sorted = Object.entries(allSpacing).sort(
    (a, b) => Number(a[1].replace("rem", "")) - Number(b[1].replace("rem", "")),
  );

  const fontSize = 16;

  return (
    <div className="colgap">
      {sorted.map(([key, val]) => (
        <div
          key={key}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            alignItems: "center",
          }}
        >
          <span style={{ gridColumn: "1 / 2" }}>{key}</span>
          <div
            key={key}
            style={{
              gridColumn: "2 / 3",
              width: val,
              height: 40,
              backgroundColor: "var(--a-lightblue-200)",
              display: "flex",
              alignItems: "center",
            }}
          />
          <span style={{ gridColumn: "3 / 3", margin: "0 var(--a-spacing-2)" }}>
            <b>{`${parseFloat(val.replace("rem", "")) * fontSize}px`}</b>
            <span> = </span>
            <Tooltip content={val}>
              <u>{`${val.replace("rem", "")}`}</u>
            </Tooltip>
            <span> x </span>
            <Tooltip content="font-size">
              <u>{`${fontSize}`}</u>
            </Tooltip>
          </span>
        </div>
      ))}
    </div>
  );
};
