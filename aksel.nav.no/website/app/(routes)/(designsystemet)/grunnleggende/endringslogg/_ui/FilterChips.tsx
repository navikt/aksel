"use client";

import { VStack } from "@navikt/ds-react";
import FilterGroup from "./FilterGroup";

interface Props {
  years: string[];
  categories: string[];
  categorySelectedState: [string, (newValue: string) => void];
  yearSelectedState: [string, (newValue: string) => void];
}

export default function FilterChips({
  years,
  categories,
  yearSelectedState,
  categorySelectedState,
}: Props) {
  return (
    <VStack gap="space-24">
      <FilterGroup
        options={years}
        selectedState={yearSelectedState}
        label="År"
      />
      <FilterGroup
        options={categories}
        selectedState={categorySelectedState}
        label="Kategori"
      />
    </VStack>
  );
}
