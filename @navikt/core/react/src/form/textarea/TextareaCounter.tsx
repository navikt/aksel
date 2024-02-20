import cl from "clsx";
import React, { useEffect, useState } from "react";
import { BodyShort } from "../../typography";
import debounce from "../../util/debounce";
import type { TextareaProps } from "./Textarea";

interface Props {
  maxLength: number;
  currentLength: number;
  size: TextareaProps["size"];
  i18n: TextareaProps["i18n"];
}

const TextareaCounter = ({ maxLength, currentLength, size, i18n }: Props) => {
  const difference = maxLength - currentLength;

  const [debouncedDiff, setDebouncedDiff] = useState(difference);

  useEffect(() => {
    const debounceFunc = debounce(() => {
      setDebouncedDiff(difference);
    }, 2000);
    debounceFunc();

    return () => {
      debounceFunc.clear();
    };
  }, [difference]);

  return (
    <>
      {difference < 20 && (
        <span
          role="status"
          className="navds-textarea__sr-counter navds-sr-only"
        >
          {getCounterText(debouncedDiff, i18n)}
        </span>
      )}

      <BodyShort
        className={cl("navds-textarea__counter", {
          "navds-textarea__counter--error": difference < 0,
        })}
        size={size}
      >
        {getCounterText(difference, i18n)}
      </BodyShort>
    </>
  );
};

const getCounterText = (difference: number, i18n: TextareaProps["i18n"]) =>
  difference < 0
    ? `${Math.abs(difference)} ${i18n?.counterTooMuch ?? "tegn for mye"}`
    : `${difference} ${i18n?.counterLeft ?? "tegn igjen"}`;

export default TextareaCounter;
