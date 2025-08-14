"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  BodyLong,
  Checkbox,
  HStack,
  Heading,
  Link,
  ReadMore,
  Search,
  VStack,
} from "@navikt/ds-react";
import { Code } from "@/app/_ui/typography/Code";
import styles from "./SearchField.module.css";

export default function SearchField() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  const semverRef = useRef<HTMLInputElement>(null);
  const [semverSearch, setSemverSearch] = useState<boolean>();

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

    replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  }

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.value = searchParams?.get("fritekst") || "";
    }
  }, [searchParams]);

  useEffect(() => {
    if (semverRef.current) {
      semverRef.current.checked = !!searchParams?.get("semver") || false;
    }
  }, [searchParams]);

  return (
    <form role="search" onSubmit={handleSubmit}>
      <VStack gap="space-12">
        <HStack align="center" gap="space-12">
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
            className={styles.searchField}
          />

          <Checkbox
            ref={semverRef}
            value="semver"
            onClick={() => {
              setSemverSearch(!semverSearch);
            }}
            checked={semverSearch}
          >
            semver søk
          </Checkbox>
        </HStack>
        <ReadMore header="Søke-syntaks">
          <VStack maxWidth="50ch">
            <Heading size="small" level="2">
              Semver søk
            </Heading>
            <BodyLong>
              For søking i releases etter{" "}
              <Link href="https://semver.org">semver</Link>. Da vil søket
              ignorere alle andre filtre som <Code>År</Code> og{" "}
              <Code>Kategori</Code>
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
        </ReadMore>
      </VStack>
    </form>
  );
}
