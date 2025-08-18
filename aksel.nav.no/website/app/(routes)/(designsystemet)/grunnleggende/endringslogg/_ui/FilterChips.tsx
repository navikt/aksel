"use client";

import { Dispatch, SetStateAction } from "react";
import { VStack } from "@navikt/ds-react";
import FilterGroup from "./FilterGroup";

interface Props {
  years: string[];
  selectedYear: string | null;
  categories: string[];
  selectedCategory: string | null;
  categorySelectedState: [string, Dispatch<SetStateAction<string>>];
  yearSelectedState: [string, Dispatch<SetStateAction<string>>];
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
