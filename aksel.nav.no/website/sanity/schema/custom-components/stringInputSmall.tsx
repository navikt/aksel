import { Stack, Text, TextInput } from "@sanity/ui";
import { useCallback } from "react";
import { set, StringInputProps, unset } from "sanity";

export function StringInputSmall(props: StringInputProps) {
  const { onChange, value = "", elementProps } = props;

  console.log(elementProps);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(
        event.currentTarget.value ? set(event.currentTarget.value) : unset()
      ),
    [onChange]
  );
  return (
    <Stack space={3}>
      <TextInput {...elementProps} onChange={handleChange} value={value} />
      <Text size={1}>{value?.length || 0} av 60 tegn brukt</Text>
    </Stack>
  );
}
