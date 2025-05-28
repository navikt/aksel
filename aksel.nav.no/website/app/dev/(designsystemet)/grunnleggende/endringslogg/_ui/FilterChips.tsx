"use client";

import { Chips, Label, VStack } from "@navikt/ds-react";

export default function FilterChips({
  years,
  selectedYear,
  categories,
  selectedCategory,
}: {
  years: number[];
  selectedYear: number;
  categories: string[];
  selectedCategory: string;
}) {
  return (
    <VStack gap="space-24">
      <VStack gap="space-8">
        <Label>År</Label>
        <Chips aria-label="Filtrer på år">
          {years.map((year) => (
            <Chips.Toggle
              key={year}
              selected={selectedYear === year}
              checkmark={false}
              variant="neutral"
              onClick={() => {
                // TODO: [endringslogg] Set up proper routing
                if (selectedYear === year) {
                  location.href = `endringslogg?arstall=ingen&kategori=${selectedCategory}`;
                } else {
                  location.href = `endringslogg?arstall=${year}&kategori=${selectedCategory}`;
                }
              }}
            >
              {`${year}`}
            </Chips.Toggle>
          ))}
        </Chips>
      </VStack>
      <VStack gap="space-8">
        <Label>Kategori</Label>
        <Chips aria-label="Filtrer på kategori">
          {categories.map((category) => (
            <Chips.Toggle
              key={category}
              selected={category === selectedCategory}
              checkmark={false}
              variant="neutral"
              onClick={() => {
                // TODO: [endringslogg] Set up proper routing
                if (category === selectedCategory) {
                  location.href = `endringslogg?kategori=ingen&arstall=${selectedYear}`;
                } else {
                  location.href = `endringslogg?kategori=${category}&arstall=${selectedYear}`;
                }
              }}
            >
              {category}
            </Chips.Toggle>
          ))}
        </Chips>
      </VStack>
    </VStack>
  );
}
