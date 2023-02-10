import React from "react";
import { Meta } from "@storybook/react";
import * as tokens from "../dist/tokens.js";

export default {
  title: "ds-tokens/Colors",
} as Meta;

const globalColor = (
  color:
    | "gray"
    | "grayalpha"
    | "blue"
    | "red"
    | "orange"
    | "limegreen"
    | "deepblue"
    | "green"
    | "lightblue"
    | "purple"
): { [key: string]: string } => {
  return Object.entries(tokens).reduce((old, [key, val]) => {
    if (color === "gray" && key.toLowerCase().includes("alpha")) {
      return { ...old };
    }
    return key.toLowerCase().startsWith(`a${color}`)
      ? { ...old, [key]: val }
      : { ...old };
  }, {});
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
export const GlobalGrayAlpha = () => <RenderGlobal color="grayalpha" />;
export const GlobalBlue = () => <RenderGlobal color="blue" />;
export const GlobalDeepBlue = () => <RenderGlobal color="deepblue" />;
export const GlobalLightBlue = () => <RenderGlobal color="lightblue" />;
export const GlobalRed = () => <RenderGlobal color="red" />;
export const GlobalOrange = () => <RenderGlobal color="orange" />;
export const GlobalGreen = () => <RenderGlobal color="green" />;
export const GlobalLimeGreen = () => <RenderGlobal color="limegreen" />;
export const GlobalPurple = () => <RenderGlobal color="purple" />;

const semanticTokens = [
  "--a-icon-on-warning",
  "--a-icon-on-info",
  "--a-icon-on-danger",
  "--a-icon-on-success",
  "--a-icon-on-action",
  "--a-icon-on-inverted",
  "--a-icon-on-neutral",
  "--a-icon-alt-1",
  "--a-icon-info",
  "--a-icon-warning",
  "--a-icon-danger",
  "--a-icon-success",
  "--a-icon-action-selected",
  "--a-icon-subtle",
  "--a-icon-default",
  "--a-surface-alt-3",
  "--a-surface-alt-3-strong",
  "--a-surface-alt-3-subtle",
  "--a-surface-alt-2",
  "--a-surface-alt-2-subtle",
  "--a-surface-alt-1",
  "--a-surface-alt-1-subtle",
  "--a-surface-info",
  "--a-surface-info-subtle",
  "--a-surface-info-subtle-hover",
  "--a-surface-warning",
  "--a-surface-warning-subtle",
  "--a-surface-warning-subtle-hover",
  "--a-surface-danger",
  "--a-surface-danger-active",
  "--a-surface-danger-hover",
  "--a-surface-danger-subtle",
  "--a-surface-danger-subtle-hover",
  "--a-surface-success",
  "--a-surface-success-subtle",
  "--a-surface-success-subtle-hover",
  "--a-surface-neutral",
  "--a-surface-neutral-selected",
  "--a-surface-neutral-selected-hover",
  "--a-surface-neutral-active",
  "--a-surface-neutral-hover",
  "--a-surface-neutral-subtle",
  "--a-surface-neutral-subtle-hover",
  "--a-surface-action",
  "--a-surface-action-selected",
  "--a-surface-action-selected-hover",
  "--a-surface-action-active",
  "--a-surface-action-hover",
  "--a-surface-action-subtle",
  "--a-surface-action-subtle-hover",
  "--a-surface-inverted",
  "--a-surface-inverted-active",
  "--a-surface-inverted-hover",
  "--a-surface-transparent",
  "--a-surface-subtle",
  "--a-surface-selected",
  "--a-surface-active",
  "--a-surface-hover",
  "--a-surface-default",
  "--a-bg-subtle",
  "--a-bg-default",
  "--a-text-on-info",
  "--a-text-on-warning",
  "--a-text-on-danger",
  "--a-text-on-success",
  "--a-text-on-action",
  "--a-text-on-neutral",
  "--a-text-on-inverted",
  "--a-text-action",
  "--a-text-action-selected",
  "--a-text-danger",
  "--a-text-visited",
  "--a-text-subtle",
  "--a-text-default",
  "--a-border-on-inverted",
  "--a-border-focus",
  "--a-border-focus-on-inverted",
  "--a-border-info",
  "--a-border-warning",
  "--a-border-danger",
  "--a-border-success",
  "--a-border-selected-selected",
  "--a-border-action",
  "--a-border-subtle",
  "--a-border-divider",
  "--a-border-strong",
  "--a-border-default",
];

export const Semantic = () => {
  return (
    <div className="colgap">
      {semanticTokens.map((key) => (
        <div
          style={{
            background: `var(${key})`,
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
            {key}
          </div>
        </div>
      ))}
    </div>
  );
};
