"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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
  const searchInputState = useState<string>("");
  const semverState = useState<boolean>(false);
  const categorySelectedState = useState<string>("");
  const yearSelectedState = useState<string>("");

  const [searchInput] = searchInputState;
  const [semverSearch, setSemverSearch] = semverState;
  const [categorySelected] = categorySelectedState;
  const [yearSelected] = yearSelectedState;

  const pathname = usePathname();
  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const handleSearch = useCallback(() => {
    const params_url = new URLSearchParams(searchParams?.toString());
    if (searchInput) {
      params_url.set("fritekst", searchInput);
    } else {
      params_url.delete("fritekst");
    }

    if (semverSearch) {
      params_url.set("semver", "true");
    } else {
      params_url.delete("semver");
    }

    if (yearSelected) {
      params_url.set("periode", yearSelected);
    } else {
      params_url.delete("periode");
    }

    if (categorySelected) {
      params_url.set("kategori", categorySelected);
    } else {
      params_url.delete("kategori");
    }

    replace(
      `${pathname}${params_url.toString() ? `?${params_url.toString()}` : ""}`,
    );
  }, [
    replace,
    pathname,
    searchInput,
    semverSearch,
    yearSelected,
    categorySelected,
    searchParams,
  ]);

  const { years, categories } = params;

  useEffect(() => {
    setSemverSearch(!!searchParams?.get("semver") || false);
  }, [searchParams, setSemverSearch]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch, searchInput, semverSearch, categorySelected, yearSelected]);

  return (
    <VStack gap="space-24" paddingBlock="space-12 space-0">
      <SearchField
        semverSearchState={semverState}
        yearSelectedState={yearSelectedState}
        categorySelectedState={categorySelectedState}
        searchInputState={searchInputState}
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
