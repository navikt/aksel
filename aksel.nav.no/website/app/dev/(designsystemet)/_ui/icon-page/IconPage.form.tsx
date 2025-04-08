"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HGrid, Search, ToggleGroup } from "@navikt/ds-react";

function IconPageForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (query) {
      params.set("iconQuery", query);
    } else {
      params.delete("iconQuery");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleToggle = (query: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (query) {
      params.set("iconToggle", query);
    } else {
      params.delete("iconToggle");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <HGrid
      onSubmit={(e) => e.preventDefault()}
      as="form"
      width="fit-content"
      align="center"
      gap="space-24"
      columns={{ xs: 1, sm: "1fr auto" }}
      marginBlock="space-40 0"
    >
      <Search
        variant="simple"
        label="Ikonsøk"
        placeholder="Søk"
        autoComplete="off"
        onChange={handleSearch}
        clearButton={false}
        defaultValue={searchParams?.get("iconQuery")?.toString()}
      />
      <ToggleGroup
        defaultValue={searchParams?.get("iconToggle")?.toString() ?? "stroke"}
        onChange={handleToggle}
        variant="neutral"
        aria-label="Velg ikonvariant"
      >
        <ToggleGroup.Item value="stroke" label="Stroke" />
        <ToggleGroup.Item value="fill" label="Fill" />
      </ToggleGroup>
    </HGrid>
  );
}

export { IconPageForm };
