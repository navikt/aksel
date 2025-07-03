"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Search } from "@navikt/ds-react";

export default function SearchField() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem(
      "fritekst",
    ) as HTMLInputElement | null;
    handleSearch(input?.value ?? "");
  }

  function handleSearch(query: string) {
    const params = new URLSearchParams(searchParams?.toString());
    if (query) {
      params.set("fritekst", query);
    } else {
      params.delete("fritekst");
    }
    replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  }

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.value = searchParams?.get("fritekst") || "";
    }
  }, [searchParams]);

  return (
    <form role="search" onSubmit={handleSubmit}>
      <Search
        ref={searchRef}
        label="Søk i endringsloggen"
        defaultValue={searchParams?.get("fritekst") || ""}
        name="fritekst"
        hideLabel
        variant="secondary"
        htmlSize="20"
        autoComplete="off"
        onClear={() => handleSearch("")}
        onChange={(v) => v === "" && handleSearch("")}
        data-color="neutral"
      />
    </form>
  );
}
