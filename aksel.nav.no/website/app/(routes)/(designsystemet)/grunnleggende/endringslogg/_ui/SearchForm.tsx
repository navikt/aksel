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
    categories: string[];
  };
}) => {
  const semverState = useState<boolean>(false);
  const categorySelectedState = useState<string>("");
  const yearSelectedState = useState<string>("");

  const [semverSearch, setSemverSearch] = semverState;
  // const [categorySelected, setCategorySelected] = categorySelectedState;
  // const [yearSelected, setYearSelected] = yearSelectedState;

  // redirect to new URL based on state contents from here (parent controls) -> pass triggers to children (formInput only == KISS)

  const searchParams = useSearchParams();

  const { years, categories } = params;

  useEffect(() => {
    setSemverSearch(!!searchParams?.get("semver") || false);
  }, [searchParams, setSemverSearch]);

  return (
    <VStack gap="space-24" paddingBlock="space-12 space-0">
      <SearchField
        semverSearchState={semverState}
        yearSelectedState={yearSelectedState}
        categorySelectedState={categorySelectedState}
      />
      {!semverSearch && (
        <FilterChips
          years={years}
          categories={categories}
          yearSelectedState={yearSelectedState}
          categorySelectedState={categorySelectedState}
        />
      )}
    </VStack>
  );
};
