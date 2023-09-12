import React from "react";
import { Checkbox, CheckboxGroup } from "../../form";
import { BodyLong, Heading } from "../../typography";
import { Box } from "../box";
import { VStack } from "../stack";

export function FilterCard() {
  return (
    <Box
      background="bg-default"
      padding="6"
      borderWidth="5"
      borderColor="border-action"
    >
      <VStack gap="6">
        <Heading size="large">Fortell oss om situasjonen din</Heading>
        <BodyLong>
          Fortell oss litt om situasjonen din, så viser vi bare den
          informasjonen som er relevant for deg.
        </BodyLong>
        <CheckboxGroup legend="Hva er situasjonen din?" size="small">
          <Checkbox>Jeg er arbeidsledig</Checkbox>
          <Checkbox>Jeg er permittert</Checkbox>
        </CheckboxGroup>
      </VStack>
    </Box>
  );
}
