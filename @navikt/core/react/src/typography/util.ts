import cl from "clsx";
import { TypoProps } from "./types";

export const typoClassNames = (props: Partial<TypoProps>) => {
  return cl({
    "navds-typo--spacing": !!props.spacing,
    "navds-typo--underline": !!props.underline,
    "navds-typo--truncate": !!props.truncate,
    "navds-typo--semibold": props.weight === "semibold",
    [`navds-typo--align-${props.align}`]: !!props.align,
    [`navds-typo--color-${props.color}`]: !!props.color,
    "navds-typo--visually-hidden": !!props.visuallyHidden,
  });
};
