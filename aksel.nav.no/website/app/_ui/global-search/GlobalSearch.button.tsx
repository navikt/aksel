"use client";

import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { BodyShort, Button, Hide, Show } from "@navikt/ds-react";
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
        <>
          Søk{" "}
          <BodyShort size="small" as="span">
            (ctrl + k)
          </BodyShort>
        </>
      )}
    </Button>
  );

  return (
    <>
      <Show above="lg" asChild>
        {renderButton(true)}
      </Show>
      <Hide above="lg" asChild>
        {renderButton(false)}
      </Hide>
    </>
  );
}

export { GlobalSearchButton };
