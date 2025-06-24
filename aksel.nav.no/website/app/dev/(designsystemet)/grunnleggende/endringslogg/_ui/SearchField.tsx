"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Search } from "@navikt/ds-react";

export default function SearchField() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.value = searchParams?.get("fritekst") || "";
    }
  }, [searchParams]);

  return (
    <form role="search" onSubmit={onSubmit}>
      <Search
        ref={searchRef}
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
