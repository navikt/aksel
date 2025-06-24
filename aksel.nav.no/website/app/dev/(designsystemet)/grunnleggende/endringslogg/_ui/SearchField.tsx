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
      params.set("fritekst", query);
    } else {
      params.delete("fritekst");
    }
    replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form role="search" onSubmit={onSubmit}>
      <Search
        label="Søk i endringsloggen"
        defaultValue={searchParams?.get("fritekst") || ""}
        onChange={handleSearch}
        name="changelogSearch"
        hideLabel
        variant="simple"
        htmlSize="20"
        autoComplete="off"
      />
    </form>
  );
}
