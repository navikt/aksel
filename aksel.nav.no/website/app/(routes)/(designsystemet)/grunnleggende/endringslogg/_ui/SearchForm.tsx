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
import { startTransition, useEffect, useOptimistic, useState } from "react";
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
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(searchParams?.toString());

  const [searchInput, setSearchInput] = useState(
    urlParams.get("fritekst") || "",
  );
  const [semverSearch, setSemverSearch] = useOptimistic(
    urlParams.has("semver"),
    (_, optimisticValue: boolean) => optimisticValue,
  );
  const [category, setCategory] = useOptimistic(
    urlParams.get("kategori") || "",
    (_, optimisticValue: string) => optimisticValue,
  );
  const [year, setYear] = useOptimistic(
    urlParams.get("periode") || "",
    (_, optimisticValue: string) => optimisticValue,
  );

  const pathname = usePathname();
  const { replace } = useRouter();

  const updateSearchParam = (param: string, newValue: string) => {
    const newParams = new URLSearchParams();

    if (param !== "semver") {
      if (searchInput) {
        newParams.set("fritekst", searchInput);
      }
      if (semverSearch) {
        newParams.set("semver", "true");
      }
      if (year) {
        newParams.set("periode", year);
      }
      if (category) {
        newParams.set("kategori", category);
      }
    }

    if (newValue) {
      newParams.set(param, newValue);
    } else {
      newParams.delete(param);
    }

    replace(
      `${pathname}${newParams.toString() ? `?${newParams.toString()}` : ""}`,
    );
  };

  const handleTextSearch = () => {
    updateSearchParam("fritekst", searchInput);
  };

  const handleSemverToggle = () => {
    updateSearchParam("semver", semverSearch ? "" : "true");
    startTransition(() => setSemverSearch(!semverSearch));
  };

  const handleYearSelection = (newYear: string) => {
    updateSearchParam("periode", newYear || "alle");
    startTransition(() => setYear(newYear || "alle"));
  };

  const handleCategorySelection = (newCategory: string) => {
    updateSearchParam("kategori", newCategory);
    startTransition(() => setCategory(newCategory));
  };

  const { years, categories } = params;

  // biome-ignore lint/correctness/useExhaustiveDependencies: We only want to run this when urlParams changes
  useEffect(() => {
    if (!urlParams.has("fritekst")) {
      // In case you clear the URL params by clicking on "Endringslogg" again in the menu
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchInput("");
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <VStack gap="space-24" paddingBlock="space-12 space-0">
      <SearchField
        semverSearch={semverSearch}
        searchInputState={[searchInput, setSearchInput]}
        onSearch={handleTextSearch}
        onSemverToggle={handleSemverToggle}
      />
      {!semverSearch && (
        <FilterChips
          years={years}
          categories={categories}
          yearSelectedState={[year || years[0], handleYearSelection]}
          categorySelectedState={[category, handleCategorySelection]}
        />
      )}
    </VStack>
  );
};
