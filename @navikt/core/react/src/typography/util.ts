import { cl } from "../util/className";
import { TypoProps } from "./types";

export const typoClassNames = (props: TypoProps & { uppercase?: boolean }) => {
  /* Renaming to aksel-* prefix is done in components themselves */
  return cl({
    "aksel-typo--spacing": props.spacing,
    "aksel-typo--truncate": props.truncate,
    "aksel-typo--semibold": props.weight === "semibold",
    [`aksel-typo--align-${props.align}`]: props.align,
    [`aksel-typo--color-${props.textColor}`]: props.textColor,
    "aksel-typo--visually-hidden": props.visuallyHidden,
    "aksel-typo--uppercase": props.uppercase,
  });
};
