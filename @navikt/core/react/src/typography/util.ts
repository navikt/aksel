import cl from "clsx";
import { TypoProps } from "./types";

export const typoClassNames = (props: Partial<TypoProps>) => {
  return cl({
    "navds-typo--spacing": !!props.spacing,
    "navds-typo--underline": !!props.underline,
    "navds-typo--truncate": !!props.truncate,
    "navds-typo--semibold": props.weight === "semibold",
    "navds-typo--align-start": props.align === "start",
    "navds-typo--align-center": props.align === "center",
    "navds-typo--align-end": props.align === "end",
    "navds-typo--visually-hidden": !!props.visuallyHidden,
  });
};
