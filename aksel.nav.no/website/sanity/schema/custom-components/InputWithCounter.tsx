import { Box, Detail, VStack } from "@navikt/ds-react";
import cl from "clsx";
import { StringInputProps, TextInputProps } from "sanity";

export function InputWithCounter(
  props: (StringInputProps | TextInputProps) & {
    size?: "medium" | "large";
  },
) {
  const { value, schemaType } = props;

  return (
    <VStack gap="1">
      {props.renderDefault(props)}
      <Counter
        // @ts-ignore
        maxLength={schemaType?.options?.maxLength}
        currentLength={value?.length ?? 0}
      />
    </VStack>
  );
}

function Counter({
  maxLength,
  currentLength,
}: {
  maxLength: number;
  currentLength: number;
}) {
  const difference = maxLength - currentLength;

  return (
    <Box paddingInline="3">
      <Detail
        role={difference < 20 ? "status" : undefined}
        className={cl({ "text-text-danger dark:text-red-300": difference < 0 })}
      >
        {difference < 0
          ? `${Math.abs(difference)} tegn for mye`
          : `${difference} tegn igjen`}
      </Detail>
    </Box>
  );
}
