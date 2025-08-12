"use client";

import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button, Detail, HStack, Hide, Show } from "@navikt/ds-react";
import { Kbd } from "@/app/_ui/kbd/Kbd";
import styles from "./GlobalSearch.module.css";
import { useGlobalSearch } from "./GlobalSearch.provider";

function GlobalSearchButton() {
  const { openSearch } = useGlobalSearch();

  const renderButton = (showChildContent: boolean) => (
    <Button
      variant="secondary-neutral"
      aria-keyshortcuts="Control+k"
      icon={
        <MagnifyingGlassIcon
          className={styles.searchButtonIcon}
          aria-label="Åpne søk"
          aria-hidden
        />
      }
      iconPosition="left"
      onClick={openSearch}
    >
      {showChildContent && (
        <HStack gap="space-8" as="span">
          Søk
          <HStack gap="space-2" asChild aria-hidden>
            <Detail as="span">
              <Kbd>Ctrl</Kbd>
              <Kbd>k</Kbd>
            </Detail>
          </HStack>
        </HStack>
      )}
    </Button>
  );

  return (
    <>
      <Show above="md" asChild>
        {renderButton(true)}
      </Show>
      <Hide above="md" asChild>
        {renderButton(false)}
      </Hide>
    </>
  );
}

export { GlobalSearchButton };
