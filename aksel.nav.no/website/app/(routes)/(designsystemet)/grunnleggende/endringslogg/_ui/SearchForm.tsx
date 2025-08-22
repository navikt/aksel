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

  const updateUrlParams = useCallback(
    (includeSearchInput: boolean = false) => {
      const params_url = new URLSearchParams(searchParams?.toString());

      // Handle search input based on flag
      if (includeSearchInput) {
        if (searchInput) {
          params_url.set("fritekst", searchInput);
        } else {
          params_url.delete("fritekst");
        }
      }
      // If not including search input, preserve existing fritekst param
      // (it's already in the URLSearchParams from toString())

      // Always update filter params
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
        `${pathname}${
          params_url.toString() ? `?${params_url.toString()}` : ""
        }`,
      );
    },
    [
      replace,
      pathname,
      searchInput,
      semverSearch,
      yearSelected,
      categorySelected,
      searchParams,
    ],
  );

  const handleTextSearch = useCallback(() => {
    updateUrlParams(true);
  }, [updateUrlParams]);

  const { years, categories } = params;

  useEffect(() => {
    setSemverSearch(!!searchParams?.get("semver") || false);
  }, [searchParams, setSemverSearch]);

  // Update URL when filters change (but not search input)
  useEffect(() => {
    updateUrlParams(false);
  }, [updateUrlParams, semverSearch, categorySelected, yearSelected]);

  return (
    <VStack gap="space-24" paddingBlock="space-12 space-0">
      <SearchField
        semverSearchState={semverState}
        yearSelectedState={yearSelectedState}
        categorySelectedState={categorySelectedState}
        searchInputState={searchInputState}
        onSearch={handleTextSearch}
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
