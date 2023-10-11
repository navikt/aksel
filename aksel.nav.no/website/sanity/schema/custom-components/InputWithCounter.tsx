import { Textarea } from "@navikt/ds-react";
import React, { useCallback } from "react";
import { set, StringInputProps, TextInputProps, unset } from "sanity";

export function InputWithCounter(
  props: (StringInputProps | TextInputProps) & {
    size?: "medium" | "large";
  }
) {
  const { onChange, value = "", elementProps, schemaType } = props;

  //@ts-ignore
  const maxLength = schemaType?.options?.maxLength
    ? //@ts-ignore
      schemaType?.options?.maxLength
    : 60;

  const handleChange = useCallback(
    (event: React.ChangeEvent<any>) =>
      onChange(
        event.currentTarget.value ? set(event.currentTarget.value) : unset()
      ),
    [onChange]
  );

  const hasError =
    props.validationError && props.validation.find((x) => x.level === "error");

  return (
    <Textarea
      {...elementProps}
      size="small"
      label={schemaType.title}
      description={schemaType?.description}
      maxLength={maxLength}
      onChange={handleChange}
      value={value}
      error={hasError && props.validationError}
      rows={!props.size || props.size === "medium" ? 2 : 1}
    />
  );
}
