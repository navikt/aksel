"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Search } from "@navikt/ds-react";

const SearchField = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set("query", query);
      return params.toString();
    },
    [searchParams],
  );

  return (
    <form
      role="search"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <Search
        label="Søk etter token"
        onChange={(value: string) => {
          router.push(pathname + "?" + createQueryString(value));
        }}
        hideLabel
      />
    </form>
  );
};

export default SearchField;
