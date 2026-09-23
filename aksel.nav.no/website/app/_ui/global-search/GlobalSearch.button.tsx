"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Events } from "@navikt/analytics-types";
import { Bleed, Button, Detail, Dialog, HStack, Show } from "@navikt/ds-react";
import { Kbd, ModKbd } from "@/app/_ui/kbd/Kbd";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import styles from "./GlobalSearch.module.css";
import { preloadSearchIndex } from "./server/GlobalSearch.actions";

function GlobalSearchButton() {
  return (
    <Dialog.Trigger>
      <SearchButton />
    </Dialog.Trigger>
  );
}

const SearchButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, ...rest }, forwardedRef) => {
  return (
    <Button
      {...rest}
      ref={forwardedRef}
      variant="secondary-neutral"
      aria-keyshortcuts="Meta+K Control+K"
      onClick={(e) => {
        umamiTrack(Events.MODAL_APNET, { tittel: "Søk" });
        void preloadSearchIndex();
        onClick?.(e);
      }}
    >
      <Bleed asChild marginInline={{ xs: "space-8", md: "space-8 space-0" }}>
        <HStack gap="space-6" align="center" as="span">
          <MagnifyingGlassIcon
            className={styles.searchButtonIcon}
            aria-label="Åpne søk"
            fontSize="1.5rem"
          />
          <Show above="md" asChild>
            <HStack gap="space-8" as="span" aria-hidden>
              Søk
              <HStack gap="space-2" asChild>
                <Detail as="span">
                  <ModKbd />
                  <Kbd>k</Kbd>
                </Detail>
              </HStack>
            </HStack>
          </Show>
        </HStack>
      </Bleed>
    </Button>
  );
});

export { GlobalSearchButton };
