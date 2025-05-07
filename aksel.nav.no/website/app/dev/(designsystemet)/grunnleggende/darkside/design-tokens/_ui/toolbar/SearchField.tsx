"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "@navikt/ds-react";

const SearchField = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(query: string) {
    const params = new URLSearchParams(searchParams?.toString());
    if (query) {
      params.set("tokenQuery", query);
    } else {
      params.delete("tokenQuery");
    }
    replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Search performed onChange, so just prevent
  }

  return (
    <form role="search" onSubmit={onSubmit}>
      <Search
        label="Søk etter token"
        defaultValue={searchParams?.get("tokenQuery") || ""}
        onChange={handleSearch}
        name="tokenSearch"
        hideLabel
        variant="simple"
        htmlSize="26"
        autoComplete="off"
      />
    </form>
  );
};

export default SearchField;
