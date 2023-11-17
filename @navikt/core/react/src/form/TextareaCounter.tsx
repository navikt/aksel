import cl from "clsx";
import React from "react";
import { BodyShort } from "../typography";
import { TextareaProps } from "./Textarea";

interface Props {
  maxLength: number;
  currentLength: number;
  size: TextareaProps["size"];
  i18n: TextareaProps["i18n"];
}

const TextareaCounter = ({ maxLength, currentLength, size, i18n }: Props) => {
  const difference = maxLength - currentLength;

  return (
    <BodyShort
      className={cl("navds-textarea__counter", {
        "navds-textarea__counter--error": difference < 0,
      })}
      role={difference < 20 ? "status" : undefined}
      size={size}
    >
      {difference < 0
        ? `${Math.abs(difference)} ${i18n?.counterTooMuch ?? "tegn for mye"}`
        : `${difference} ${i18n?.counterLeft ?? "tegn igjen"}`}
    </BodyShort>
  );
};

export default TextareaCounter;
