"use client";

// TODO: I feel we should probably replace SearchForm and SearchField logic with
// a third party form library, since this has grown sufficiently complex.
// I think that would cut down on this complexity, if you're reading this
// in the future, and parsing this is hard, it's probably time for a complete
// overhaul of this form.
// The form has:
// - dependent form fields (state depends on other form fields)
// - live updating form fields (but only for a subset of the form elements) triggering:
//    - url sync of all form state (also those that don't trigger a sync)
//    - form submission
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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

  // Use a ref to track if we're handling a semver toggle to prevent race conditions
  const isSemverToggling = useRef(false);

  const updateUrlParams = useCallback(
    (options: { includeSearchInput?: boolean; clearSearch?: boolean } = {}) => {
      const { includeSearchInput = false, clearSearch = false } = options;
      const params_url = new URLSearchParams(searchParams?.toString());

      // Handle search input based on flags
      if (clearSearch) {
        params_url.delete("fritekst");
      } else if (includeSearchInput) {
        if (searchInput) {
          params_url.set("fritekst", searchInput);
        } else {
          params_url.delete("fritekst");
        }
      }
      // If not including search input and not clearing, preserve existing fritekst param

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
    updateUrlParams({ includeSearchInput: true });
  }, [updateUrlParams]);

  const handleSemverToggle = useCallback(() => {
    isSemverToggling.current = true;
    setSemverSearch((prev) => {
      const newState = !prev;

      // Update URL immediately with the new state
      const params_url = new URLSearchParams(searchParams?.toString());
      params_url.delete("fritekst"); // Always clear search when toggling semver

      if (newState) {
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

      // Reset flag after a short delay
      setTimeout(() => {
        isSemverToggling.current = false;
      }, 0);

      return newState;
    });
  }, [
    setSemverSearch,
    searchParams,
    yearSelected,
    categorySelected,
    pathname,
    replace,
  ]);

  const { years, categories } = params;

  // Sync semver state from URL only if we're not in the middle of toggling
  useEffect(() => {
    if (!isSemverToggling.current) {
      setSemverSearch(!!searchParams?.get("semver"));
    }
  }, [searchParams, setSemverSearch]);

  // Update URL when filters change (but not search input or semver)
  useEffect(() => {
    if (!isSemverToggling.current) {
      updateUrlParams();
    }
  }, [updateUrlParams, categorySelected, yearSelected]);

  return (
    <VStack gap="space-24" paddingBlock="space-12 space-0">
      <SearchField
        semverSearchState={semverState}
        searchInputState={searchInputState}
        onSearch={handleTextSearch}
        onSemverToggle={handleSemverToggle}
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
