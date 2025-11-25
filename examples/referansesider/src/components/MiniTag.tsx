import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/js";

const bgMap = {
  info: tokens.BgInfoSoft,
  warning: tokens.BgWarningSoft,
  success: tokens.BgSuccessSoft,
  neutral: tokens.BgNeutralModerate,
  ["info-moderate"]: tokens.BgInfoModerate,
  ["warning-moderate"]: tokens.BgWarningModerate,
  ["success-moderate"]: tokens.BgSuccessModerate,
  ["neutral-moderate"]: tokens.BgDefault,
  ["info-strong"]: tokens.BgInfoStrong,
  ["warning-strong"]: tokens.BgWarningStrong,
  ["success-strong"]: tokens.BgSuccessStrong,
  ["neutral-strong"]: tokens.BgNeutralModeratePressed,
};

const fgMap = {
  info: tokens.TextInfoSubtle,
  warning: tokens.TextWarningSubtle,
  success: tokens.TextSuccessSubtle,
  neutral: tokens.BgNeutralModerate,
  ["info-moderate"]: tokens.TextInfo,
  ["warning-moderate"]: tokens.TextWarning,
  ["success-moderate"]: tokens.TextSuccess,
  ["neutral-moderate"]: tokens.BgDefault,
  ["info-strong"]: tokens.TextInfo,
  ["warning-strong"]: tokens.TextWarning,
  ["success-strong"]: tokens.TextSuccess,
  ["neutral-strong"]: tokens.BgNeutralModeratePressed,
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
  width: 1.5em;
  height: fit-content;
  background-color: ${(prop) => bgMap[prop.$variant]};
  color: ${(prop) => fgMap[prop.$variant]};
  ${(prop) => {
    // @ts-expect-error getting undefined is fine here (just means we use "transparent")
    return `border: 1px solid ${borderMap[prop.$variant] ?? "transparent"};`;
  }}
  padding-inline: 3px;
  padding-block: 0px;
  line-height: 18px;
  font-size: 16px;
  border-radius: 3px;
  margin: 3px;
  text-align: center;
`;
