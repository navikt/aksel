import React from "react";
import { Meta } from "@storybook/react";
import * as tokens from "../dist/tokens.js";
import { Tooltip } from "@navikt/ds-react";

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
    Object.entries(allSpacing).sort((a, b) => {
      if (a[0].endsWith("05"))
        return 0.5 - Number(b[0].replace("ASpacing", ""));
      if (b[0].endsWith("05"))
        return Number(a[0].replace("ASpacing", "")) - 0.5;
      return (
        Number(a[0].replace("ASpacing", "")) -
        Number(b[0].replace("ASpacing", ""))
      );
    })
  );

  const fontSize = 16;

  return (
    <div className="colgap">
      {Object.entries(sortObject).map(([key, val]) => (
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
