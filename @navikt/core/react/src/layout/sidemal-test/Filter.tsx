import React, { useState } from "react";
import { Checkbox, CheckboxGroup } from "../../form";
import { BodyLong, Detail, Heading } from "../../typography";
import { Box } from "../box";
import { HStack, VStack } from "../stack";
import { InformationSquareIcon } from "@navikt/aksel-icons";

export function FilterCard() {
  const [filter, setFilter] = useState<any[]>([]);

  return (
    <Box
      background="bg-default"
      padding={{ xs: "4", md: "5" }}
      borderWidth="5"
      borderColor="border-alt-3"
      borderRadius="medium"
    >
      <VStack gap="6">
        <Heading size="large">Fortell oss om situasjonen din</Heading>
        <BodyLong>
          Fortell oss litt om situasjonen din, så viser vi bare den
          informasjonen som er relevant for deg.
        </BodyLong>
        <div>
          <CheckboxGroup
            legend="Hva er situasjonen din?"
            size="small"
            onChange={setFilter}
          >
            <Checkbox value="box1">Jeg er arbeidsledig</Checkbox>
            <Checkbox value="box2">Jeg er permittert</Checkbox>
          </CheckboxGroup>
          {!filter.length && (
            <Box paddingBlock="2 0">
              <HStack gap="2" align="center">
                <InformationSquareIcon aria-hidden />
                <Detail>Ingen filtre er valgt, så alt innhold vises.</Detail>
              </HStack>
            </Box>
          )}
        </div>
      </VStack>
    </Box>
  );
}
