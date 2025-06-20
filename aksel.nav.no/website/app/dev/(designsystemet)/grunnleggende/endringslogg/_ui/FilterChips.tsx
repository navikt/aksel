"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useOptimistic } from "react";
import { Chips, Label, VStack } from "@navikt/ds-react";
import { capitalize } from "@/utils";

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
  const [optYear, expectYear] = useOptimistic(
    selectedYear,
    (_, optimisticValue: number | null) => optimisticValue,
  );
  const [optCategory, expectCategory] = useOptimistic(
    selectedCategory,
    (_, optimisticValue: string | null) => optimisticValue,
  );
  const { push, prefetch } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function getHref(option: string | number) {
    const params = new URLSearchParams(searchParams?.toString());
    if (typeof option === "number") {
      params.set("arstall", `${option === optYear ? "ingen" : option}`);
    } else if (typeof option === "string") {
      if (option === optCategory) {
        params.delete("kategori");
      } else {
        params.set("kategori", option);
      }
    }
    return `${pathname}?${params.toString()}`;
  }

  const FilterGroup = ({
    options,
    selectedOption,
    label,
  }: {
    options: (string | number)[];
    selectedOption: string | number | null;
    label: string;
  }) => (
    <VStack gap="space-8">
      <Label as="div">{label}</Label>
      {/* TODO: Revurder aria-label */}
      <Chips aria-label={`Filtrer på ${label.toLowerCase()}`}>
        {options.map((option) => {
          const href = getHref(option);
          return (
            <Chips.Toggle
              key={option}
              selected={selectedOption === option}
              checkmark={false}
              variant="neutral"
              onMouseEnter={() => {
                prefetch(href);
              }}
              onClick={() => {
                if (typeof option === "number") {
                  expectYear(option);
                } else {
                  expectCategory(option);
                }
                push(href);
              }}
            >
              {capitalize(option.toString())}
            </Chips.Toggle>
          );
        })}
      </Chips>
    </VStack>
  );

  return (
    <VStack gap="space-24">
      <FilterGroup options={years} selectedOption={optYear} label="År" />
      <FilterGroup
        options={categories}
        selectedOption={optCategory}
        label="Kategori"
      />
    </VStack>
  );
}
