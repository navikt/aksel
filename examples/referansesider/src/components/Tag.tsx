import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/dist/darkside/tokens";

const bgMap = {
  info: tokens.BgInfo,
  warning: tokens.BgWarning,
  success: tokens.BgSuccess,
  neutral: tokens.BgNeutral,
  ["info-moderate"]: tokens.BgInfoModerate,
  ["warning-moderate"]: tokens.BgWarningModerate,
  ["success-moderate"]: tokens.BgSuccessModerate,
  ["neutral-moderate"]: tokens.BgNeutralModerate,
  ["info-strong"]: tokens.BgInfoStrong,
  ["warning-strong"]: tokens.BgWarningStrong,
  ["success-strong"]: tokens.BgSuccessStrong,
  ["neutral-strong"]: tokens.BgNeutralStrong,
};

const fgMap = {
  info: tokens.TextDefault,
  warning: tokens.TextDefault,
  success: tokens.TextDefault,
  neutral: tokens.TextDefault,
  ["info-moderate"]: tokens.TextDefault,
  ["warning-moderate"]: tokens.TextDefault,
  ["success-moderate"]: tokens.TextDefault,
  ["neutral-moderate"]: tokens.TextDefault,
  ["info-strong"]: tokens.ContrastNeutral,
  ["warning-strong"]: tokens.ContrastNeutral,
  ["success-strong"]: tokens.ContrastNeutral,
  ["neutral-strong"]: tokens.ContrastNeutral,
};

const borderMap = {
  info: tokens.BorderInfo,
  warning: tokens.BorderWarning,
  success: tokens.BorderSuccess,
  neutral: tokens.BorderNeutral,
};

export const Tag = styled.span<{
  $variant:
    | "info"
    | "warning"
    | "success"
    | "neutral"
    | "info-moderate"
    | "warning-moderate"
    | "success-moderate"
    | "neutral-moderate"
    | "info-strong"
    | "warning-strong"
    | "success-strong"
    | "neutral-strong";
}>`
  display: block;
  width: fit-content;
  background-color: ${(prop) => bgMap[prop.$variant]};
  color: ${(prop) => fgMap[prop.$variant]};
  ${(prop) => {
    // @ts-expect-error getting undefined is fine here (just means we use "transparent")
    return `border: 1px solid ${borderMap[prop.$variant] ?? "transparent"};`;
  }}
  padding-inline: 6px;
  border-radius: 2px;
  font-size: 16px;
`;
