"use client";

import { useSearchParams } from "next/navigation";
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
  searchInputState,
  onSearch,
}: {
  semverSearchState: [boolean, Dispatch<SetStateAction<boolean>>];
  searchInputState: [string, Dispatch<SetStateAction<string>>];
  onSearch: CallableFunction;
}) {
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);
  const semverRef = useRef<HTMLInputElement>(null);

  const [semverSearch, setSemverSearch] = semverSearchState;
  const [searchInput, setSearchInput] = searchInputState;

  // Only get initial value from URL params
  const fritekstParam = searchParams?.get("fritekst") || "";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  // Only sync URL to input on initial load/page refresh
  useEffect(() => {
    if (searchRef.current && !searchInput && fritekstParam) {
      searchRef.current.value = fritekstParam;
      setSearchInput(fritekstParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form role="search" onSubmit={handleSubmit}>
      <VStack gap="space-12">
        <HStack align="center" gap="space-24">
          <Search
            ref={searchRef}
            label="Søk i endringsloggen"
            value={searchInput}
            name="fritekst"
            hideLabel
            variant="secondary"
            htmlSize="20"
            autoComplete="off"
            onChange={(value) => {
              setSearchInput(value);
            }}
            onClear={() => {
              setSearchInput("");
            }}
            data-color="neutral"
            className={styles.searchField}
          />
          <HStack align="center" gap="space-4">
            <Checkbox
              ref={semverRef}
              value="semver"
              onClick={() => {
                setSearchInput("");
                setSemverSearch(!semverSearch);
              }}
              defaultChecked={!!searchParams?.get("semver")}
              checked={semverSearch}
            >
              Semver-søk
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
