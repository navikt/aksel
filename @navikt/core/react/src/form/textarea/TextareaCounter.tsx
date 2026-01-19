import React, { useEffect, useState } from "react";
import { BodyShort } from "../../typography";
import debounce from "../../util/debounce";
import { useI18n } from "../../util/i18n/i18n.hooks";
import { cl } from "../../utils/helpers";
import type { TextareaProps } from "./Textarea";

interface Props {
  maxLengthId: string;
  maxLength: number;
  currentLength: number;
  size: TextareaProps["size"];
  i18n: TextareaProps["i18n"];
}

const TextareaCounter = ({
  maxLengthId,
  maxLength,
  currentLength,
  size,
  i18n,
}: Props) => {
  const translate = useI18n("Textarea", {
    charsLeft: i18n?.counterLeft ? `{chars} ${i18n.counterLeft}` : undefined,
    charsTooMany: i18n?.counterTooMuch
      ? `{chars} ${i18n.counterTooMuch}`
      : undefined,
  });

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
      <span id={maxLengthId} className="aksel-sr-only">
        {translate("maxLength", { maxLength })}
      </span>

      {difference < 20 && (
        <span
          role="status"
          className="aksel-textarea__sr-counter aksel-sr-only"
        >
          {getCounterText(debouncedDiff, translate)}
        </span>
      )}

      <BodyShort
        className={cl("aksel-textarea__counter", {
          "aksel-textarea__counter--error": difference < 0,
        })}
        size={size}
      >
        {getCounterText(difference, translate)}
      </BodyShort>
    </>
  );
};

const getCounterText = (
  difference: number,
  translate: (
    key: "charsTooMany" | "charsLeft",
    replacements?: { chars: number },
  ) => string,
) =>
  difference < 0
    ? translate("charsTooMany", { chars: Math.abs(difference) })
    : translate("charsLeft", { chars: difference });

export default TextareaCounter;
