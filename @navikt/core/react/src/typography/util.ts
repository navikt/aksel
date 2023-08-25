import cl from "clsx";
import { TypoProps, typoColors } from "./types";

export const typoClassNames = (
  props: Partial<TypoProps> & Partial<{ uppercase: boolean }>
) => {
  return cl({
    "navds-typo--spacing": !!props.spacing,
    "navds-typo--truncate": !!props.truncate,
    "navds-typo--semibold": props.weight === "semibold",
    [`navds-typo--align-${props.align}`]: !!props.align,
    [`navds-typo--color-${props.color}`]:
      !!props.color && typoColors.includes(props.color),
    "navds-typo--visually-hidden": !!props.visuallyHidden,
    "navds-typo--uppercase": !!props.uppercase,
  });
};
