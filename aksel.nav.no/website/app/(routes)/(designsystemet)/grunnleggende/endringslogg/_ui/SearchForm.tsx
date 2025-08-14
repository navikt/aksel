"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { VStack } from "@navikt/ds-react";
import FilterChips from "./FilterChips";
import SearchField from "./SearchField";

export const SearchForm = ({
  params,
}: {
  params: {
    years: string[];
    paramYear: string;
    categories: string[];
    paramCategory: string;
  };
}) => {
  const semverState = useState<boolean>(false);
  const [semverSearch, setSemverSearch] = semverState;
  const searchParams = useSearchParams();

  const { years, paramYear, categories, paramCategory } = params;

  useEffect(() => {
    setSemverSearch(!!searchParams?.get("semver") || false);
  }, [searchParams, setSemverSearch]);

  return (
    <VStack gap="space-24" paddingBlock="space-12 space-0">
      <SearchField semverSearchState={semverState} />
      {!semverSearch && (
        <FilterChips
          years={years}
          selectedYear={paramYear}
          categories={categories}
          selectedCategory={paramCategory}
        />
      )}
    </VStack>
  );
};
