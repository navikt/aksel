"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "@navikt/ds-react";

const SearchField = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (query) {
      params.set("tokenQuery", query);
    } else {
      params.delete("tokenQuery");
    }
    replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };
  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }}
    >
      <Search
        label="Søk etter token"
        defaultValue={searchParams?.get("tokenQuery") || ""}
        onChange={handleSearch}
        hideLabel
      />
    </form>
  );
};

export default SearchField;
