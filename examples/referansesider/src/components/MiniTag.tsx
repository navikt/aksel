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
  info: tokens.TextInfo,
  warning: tokens.TextWarning,
  success: tokens.TextSuccess,
  neutral: tokens.TextNeutral,
  ["info-moderate"]: tokens.TextInfoStrong,
  ["warning-moderate"]: tokens.TextWarningStrong,
  ["success-moderate"]: tokens.TextSuccessStrong,
  ["neutral-moderate"]: tokens.TextNeutralStrong,
  ["info-strong"]: tokens.TextInfoStrong,
  ["warning-strong"]: tokens.TextWarningStrong,
  ["success-strong"]: tokens.TextSuccessStrong,
  ["neutral-strong"]: tokens.TextNeutralStrong,
};

const borderMap = {
  info: tokens.BorderInfo,
  warning: tokens.BorderWarning,
  success: tokens.BorderSuccess,
  neutral: tokens.BorderNeutral,
};

export const MiniTag = styled.span<{
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
  font-variant-caps: all-small-caps;
  display: inline-block;
  width: fit-content;
  height: fit-content;
  background-color: ${(prop) => bgMap[prop.$variant]};
  color: ${(prop) => fgMap[prop.$variant]};
  ${(prop) => {
    // @ts-expect-error getting undefined is fine here (just means we use "transparent")
    return `border: 1px solid ${borderMap[prop.$variant] ?? "transparent"};`;
  }}
  padding-inline: 3px;
  padding-block: 0px;
  line-height: 16px;
  font-size: 16px;
  border-radius: 3px;
  margin: 3px;
`;
