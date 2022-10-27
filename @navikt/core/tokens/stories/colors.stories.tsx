import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import * as tokens from "../dist/tokens.js";

export default {
  title: "ds-tokens/Colors",
} as Meta;

const globalColor = (
  color:
    | "gray"
    | "blue"
    | "red"
    | "orange"
    | "limegreen"
    | "deepblue"
    | "green"
    | "lightblue"
    | "purple"
): { [key: string]: string } => {
  return Object.entries(tokens).reduce(
    (old, [key, val]) =>
      key.includes("GlobalColor") && key.toLowerCase().includes(`color${color}`)
        ? { ...old, [key]: val }
        : { ...old },
    {}
  );
};

const RenderGlobal = ({ color }) => (
  <div>
    {Object.entries(globalColor(color))
      .sort((a, b) => (a[0].endsWith("50") ? -1 : 1))
      .map(([key, val]) => (
        <div
          style={{
            background: val,
            width: "50rem",
            height: "5rem",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              background: "rgba(39,39,39,0.4)",
              width: "fit-content",
              color: "white",
              padding: 2,
              fontSize: 14,
            }}
          >
            {`${key}: ${val}`}
          </div>
        </div>
      ))}
  </div>
);
export const GlobalGray = () => <RenderGlobal color="gray" />;
export const GlobalBlue = () => <RenderGlobal color="blue" />;
export const GlobalDeepBlue = () => <RenderGlobal color="deepblue" />;
export const GlobalLightBlue = () => <RenderGlobal color="lightblue" />;
export const GlobalRed = () => <RenderGlobal color="red" />;
export const GlobalOrange = () => <RenderGlobal color="orange" />;
export const GlobalGreen = () => <RenderGlobal color="green" />;
export const GlobalLimeGreen = () => <RenderGlobal color="limegreen" />;
export const GlobalPurple = () => <RenderGlobal color="purple" />;

export const Semantic = () => {
  const semanticColors: { [key: string]: string } = Object.entries(
    tokens
  ).reduce(
    (old, [key, val]) =>
      key.includes("SemanticColor") ? { ...old, [key]: val } : { ...old },
    {}
  );

  return (
    <div className="colgap">
      <p>
        Semantiske tokens vil oppdateres på sikt. Vi anbefaler å holde seg til
        globale tokens for nå.
      </p>
      {Object.entries(semanticColors).map(([key, val]) => (
        <div
          style={{
            background: val,
            width: "50rem",
            height: "5rem",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              background: "rgba(39,39,39,0.4)",
              width: "fit-content",
              color: "white",
              padding: 2,
              fontSize: 14,
            }}
          >
            {`${key}: ${val}`}
          </div>
        </div>
      ))}
    </div>
  );
};
