"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { HGrid, Search, ToggleGroup, debounce } from "@navikt/ds-react";

function IconPageForm({
  iconToggle,
  iconQuery,
}: {
  iconQuery?: string;
  iconToggle: "stroke" | "fill";
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        const params = new URLSearchParams(searchParams?.toString());
        if (query && query.length > 2) {
          params.set("iconQuery", query);
        } else {
          params.delete("iconQuery");
        }
        replace(`${pathname}?${params.toString()}`);
      }),
    [pathname, replace, searchParams],
  );

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
      marginBlock="space-40 space-0"
    >
      <Search
        variant="simple"
        label="Ikonsøk"
        placeholder="Søk"
        autoComplete="off"
        onChange={debouncedSearch}
        clearButton={false}
        defaultValue={iconQuery}
      />
      <ToggleGroup
        defaultValue={iconToggle}
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
