/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Stack, Text, TextInput } from "@sanity/ui";
import { useCallback } from "react";
import { set, StringInputProps, unset } from "sanity";

export function StringInputSmall(props: StringInputProps) {
  const { onChange, value = "", elementProps, schemaType } = props;

  //@ts-ignore
  const maxLength = schemaType?.options?.maxLength
    ? //@ts-ignore
      schemaType?.options?.maxLength
    : 60;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(
        event.currentTarget.value ? set(event.currentTarget.value) : unset()
      ),
    [onChange]
  );
  return (
    <Stack space={3}>
      <TextInput
        {...elementProps}
        onChange={handleChange}
        value={value}
        maxLength={maxLength}
        size={1}
      />
      <Text size={1}>
        {value?.length || 0} av {maxLength} tegn brukt
      </Text>
    </Stack>
  );
}
