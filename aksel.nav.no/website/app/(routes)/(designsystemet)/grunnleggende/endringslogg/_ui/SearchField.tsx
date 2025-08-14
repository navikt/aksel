"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  BodyLong,
  Button,
  HStack,
  Link,
  Popover,
  Search,
  VStack,
} from "@navikt/ds-react";
import { PopoverContent } from "@navikt/ds-react/Popover";
import { Code } from "@/app/_ui/typography/Code";
import styles from "./SearchField.module.css";

export default function SearchField() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  const settingsButtonRef = useRef(null);
  const [openState, setOpenState] = useState(false);

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
      <HStack>
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
        <Button
          ref={settingsButtonRef}
          variant="tertiary"
          type="button"
          onClick={() => setOpenState(!openState)}
          aria-expanded={openState}
        >
          Søkeinstillinger
        </Button>
        <Popover
          open={openState}
          onClose={() => setOpenState(false)}
          anchorEl={settingsButtonRef.current}
        >
          <PopoverContent>
            <VStack maxWidth="50ch">
              <BodyLong>
                Dette er et <em>smart</em> søkefelt, og vanlig opprørsel er at
                om du søker tall som <em>ser ut som</em> en{" "}
                <Link href="https://semver.org">semver</Link> versjon, så får du{" "}
                <em>bare</em> treff på releases som matcher gitt semver range.
                Semver-søk støtter{" "}
                <Link href="https://github.com/npm/node-semver?tab=readme-ov-file#ranges">
                  range syntax
                </Link>
                .
              </BodyLong>
              <BodyLong className={styles.spaced}>for eksempel:</BodyLong>
              <Code>7.3</Code>
              <BodyLong>eller</BodyLong>
              <Code>^2.2 || &gt;=3.2.1 &lt;4</Code>
              <BodyLong className={styles.spaced}>
                For å skru av <em>smarte</em> features og heller gjøre et
                &quot;dumt&quot; text-only søk så kan du starte søket med{" "}
                <Code>! </Code>, som dette:
              </BodyLong>
              <Code>! 27</Code>
            </VStack>
          </PopoverContent>
        </Popover>
      </HStack>
    </form>
  );
}
