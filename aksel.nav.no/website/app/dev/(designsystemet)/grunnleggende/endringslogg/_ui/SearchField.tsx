"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "@navikt/ds-react";

export default function SearchField() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(query: string) {
    const params = new URLSearchParams(searchParams?.toString());
    if (query) {
      params.set("filter", query);
    } else {
      params.delete("filter");
    }
    replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Search performed onChange, so just prevent
  }

  return (
    <form role="search" onSubmit={onSubmit}>
      <Search
        label="Søk i endringsloggen"
        defaultValue={searchParams?.get("changelogQuery") || ""}
        onChange={handleSearch}
        name="changelogSearch"
        hideLabel
        variant="simple"
        htmlSize="26"
        autoComplete="off"
      />
    </form>
  );
}
