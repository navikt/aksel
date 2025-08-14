"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  BodyLong,
  HStack,
  HelpText,
  Link,
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
        <HelpText title="Søke-syntaks">
          <VStack maxWidth="50ch">
            <BodyLong>
              Dette søkefeltet støtter <em>smart søke-syntaks</em> for søking i
              blant annet releases etter{" "}
              <Link href="https://semver.org">semver</Link>.
            </BodyLong>
            <BodyLong className={styles.spaced}>
              For å bruke denne funksjonen så må du starte søket ditt med{" "}
              <Code>semver</Code> slik som dette:
            </BodyLong>
            <Code>semver 7.3</Code>
            <BodyLong>eller</BodyLong>
            <Code>semver ^2.2 || &gt;=3.2.1 &lt;4</Code>
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
    </form>
  );
}
