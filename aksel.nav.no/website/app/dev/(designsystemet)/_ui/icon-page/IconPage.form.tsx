"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, ToggleGroup } from "@navikt/ds-react";

function IconPageForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (query: string) => {
    /* TODO: fix types */
    const params = new URLSearchParams(searchParams ?? undefined);
    if (query) {
      params.set("iconQuery", query);
    } else {
      params.delete("iconQuery");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleToggle = (query: string) => {
    /* TODO: fix types */
    const params = new URLSearchParams(searchParams ?? undefined);
    if (query) {
      params.set("iconToggle", query);
    } else {
      params.delete("iconToggle");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-fit items-center gap-6 sm:flex-nowrap"
    >
      <Search
        variant="simple"
        label="Ikonsøk"
        placeholder="Søk"
        autoComplete="off"
        onChange={handleSearch}
        clearButton={false}
        defaultValue={searchParams?.get("iconQuery")?.toString()}
        onKeyDown={(e) => {
          /* Avoids closing icon-sidebar when clearing Search */
          /* TODO: Check if still needed */
          if (e.key === "Escape") {
            if (e.currentTarget.value) {
              e.stopPropagation();
            }
          }
        }}
      />
      <ToggleGroup
        defaultValue={searchParams?.get("iconToggle")?.toString() ?? "stroke"}
        onChange={handleToggle}
        variant="neutral"
        aria-label="Velg ikonvariant"
        className="shrink-0"
      >
        <ToggleGroup.Item value="stroke" label="Stroke" />
        <ToggleGroup.Item value="fill" label="Fill" />
      </ToggleGroup>
    </form>
  );
}

export { IconPageForm };
