"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Chips, Label, VStack } from "@navikt/ds-react";

export default function FilterChips({
  years,
  selectedYear,
  categories,
  selectedCategory,
}: {
  years: number[];
  selectedYear: number | null;
  categories: string[];
  selectedCategory: string | null;
}) {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());
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
                if (selectedYear === year) {
                  params.set("arstall", "ingen");
                } else {
                  params.set("arstall", `${year}`);
                }
                push(`${pathname}?${params.toString()}`, { scroll: false });
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
                if (selectedCategory === category) {
                  params.delete("kategori");
                } else {
                  params.set("kategori", `${category}`);
                }
                push(`${pathname}?${params.toString()}`, { scroll: false });
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
