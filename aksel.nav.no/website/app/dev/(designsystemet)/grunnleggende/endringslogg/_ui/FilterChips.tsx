"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useOptimistic } from "react";
import { Chips, Label, VStack } from "@navikt/ds-react";
import { capitalize } from "@/utils";

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
  const { push, prefetch } = useRouter();

  const [optYear, expectYear] = useOptimistic(
    selectedYear,
    (_, optimisticYear: string | null) => optimisticYear,
  );
  const [optCategory, expectCategory] = useOptimistic(
    selectedCategory,
    (_, optimisticCategory: string | null) => optimisticCategory,
  );
  const pathname = usePathname();
  const searchParams = useSearchParams()?.toString();
  function getHref(option: string, type: "category" | "period") {
    const params = new URLSearchParams(searchParams?.toString());
    if (type === "period") {
      params.set("periode", `${option === optYear ? "alle" : option}`);
    } else if (type === "category") {
      if (option === optCategory) {
        params.delete("kategori");
      } else {
        params.set("kategori", option);
      }
    }
    return `${pathname}?${params.toString()}`;
  }

  const FilterGroup = ({
    type,
    options,
    selectedOption,
    label,
  }: {
    type: "category" | "period";
    options: string[];
    selectedOption: string | number | null;
    label: string;
  }) => (
    <VStack gap="space-8">
      <Label as="div">{label}</Label>
      <Chips>
        {options.map((option) => {
          const href = getHref(option, type);
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
                  startTransition(() => expectYear(option));
                } else {
                  startTransition(() => expectCategory(option));
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
      <FilterGroup
        type="period"
        options={years}
        selectedOption={optYear}
        label="År"
      />
      <FilterGroup
        type="category"
        options={categories}
        selectedOption={optCategory}
        label="Kategori"
      />
    </VStack>
  );
}
