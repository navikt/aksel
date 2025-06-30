"use client";

import { VStack } from "@navikt/ds-react";
import FilterGroup from "./FilterGroup";

interface Props {
  years: string[];
  selectedYear: string | null;
  categories: string[];
  selectedCategory: string | null;
}

export default function FilterChips({
  years,
  selectedYear,
  categories,
  selectedCategory,
}: Props) {
  return (
    <VStack gap="space-24">
      <FilterGroup
        type="period"
        options={years}
        selectedOption={selectedYear}
        label="År"
      />
      <FilterGroup
        type="category"
        options={categories}
        selectedOption={selectedCategory}
        label="Kategori"
      />
    </VStack>
  );
}
