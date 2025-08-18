"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import {
  BodyLong,
  Checkbox,
  HStack,
  HelpText,
  Link,
  Search,
  VStack,
} from "@navikt/ds-react";
import { Code } from "@/app/_ui/typography/Code";
import styles from "./SearchField.module.css";

export default function SearchField({
  semverSearchState,
  categorySelectedState,
  yearSelectedState,
}: {
  semverSearchState: [boolean, Dispatch<SetStateAction<boolean>>]; // no ReturnType<typeof useState<boolean>>; ?
  categorySelectedState: [string, Dispatch<SetStateAction<string>>];
  yearSelectedState: [string, Dispatch<SetStateAction<string>>];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  const semverRef = useRef<HTMLInputElement>(null);
  const [semverSearch, setSemverSearch] = semverSearchState;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categorySelected, setCategorySelected] = categorySelectedState;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [yearSelected, setYearSelected] = yearSelectedState;

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

    if (semverSearch) {
      params.set("semver", "true");
    } else {
      params.delete("semver");
    }

    if (yearSelected) {
      params.set("periode", yearSelected);
    } else {
      params.delete("periode");
    }

    if (categorySelected) {
      params.set("kategori", categorySelected);
    } else {
      params.delete("kategori");
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
      <VStack gap="space-12">
        <HStack align="center" gap="space-24">
          <Search
            ref={searchRef}
            label="Søk i endringsloggen"
            defaultValue={searchParams?.get("fritekst") || ""}
            name="fritekst"
            hideLabel
            variant="secondary"
            htmlSize="20"
            autoComplete="off"
            // onClear={() => handleSearch("")} // TODO: do we want smarter behaviour?
            // onChange={(v) => v === "" && handleSearch("")} // TODO: do we want smarter behaviour?
            data-color="neutral"
            className={styles.searchField}
          />
          <HStack align="center" gap="space-4">
            <Checkbox
              ref={semverRef}
              value="semver"
              onClick={() => {
                setSemverSearch(!semverSearch);
              }}
              defaultChecked={!!searchParams?.get("semver")}
              checked={semverSearch}
            >
              semver søk
            </Checkbox>
            <HelpText title="Søke-syntaks" placement="bottom">
              <VStack maxWidth="50ch">
                <BodyLong>
                  For søking i releases etter{" "}
                  <Link href="https://semver.org">semver</Link>. Da vil søket
                  ignorere alle andre filtre som <Code>År</Code> og{" "}
                  <Code>Kategori</Code>.
                </BodyLong>
                <BodyLong className={styles.spaced}>For eksempel:</BodyLong>
                <Code className={styles.code}>7.3</Code>
                <BodyLong>eller:</BodyLong>
                <Code className={styles.code}>^2.2 || &gt;=3.2.1 &lt;4</Code>
                <BodyLong className={styles.spaced}>
                  Semver-søk støtter{" "}
                  <Link href="https://github.com/npm/node-semver?tab=readme-ov-file#ranges">
                    range syntax
                  </Link>
                  .
                </BodyLong>
              </VStack>
            </HelpText>
          </HStack>
        </HStack>
      </VStack>
    </form>
  );
}
