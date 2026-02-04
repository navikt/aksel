"use client";

import {
  type ButtonHTMLAttributes,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import {
  Bleed,
  Button,
  Detail,
  Dialog,
  HStack,
  Loader,
  Show,
} from "@navikt/ds-react";
import { Kbd } from "@/app/_ui/kbd/Kbd";
import styles from "./GlobalSearch.module.css";

/**
 * Trigger is optional to allow for use in Suspense fallback
 */
function GlobalSearchButton({ trigger = true }: { trigger?: boolean }) {
  if (trigger) {
    return (
      <Dialog.Trigger>
        <SearchButton />
      </Dialog.Trigger>
    );
  }

  return <SearchButton />;
}

const SearchButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, forwardedRef) => {
  const [isMac, setIsMac] = useState<boolean | null>(null);

  useEffect(() => {
    const userAgent = globalThis.navigator.userAgent.toLowerCase();
    setIsMac(/mac|iphone|ipad|ipod/.test(userAgent));
  }, []);

  const keys = useMemo(() => {
    if (isMac === null) {
      return (
        <Kbd>
          <Loader size="small" title="Loading" />
        </Kbd>
      );
    }
    return isMac ? <Kbd>⌘</Kbd> : <Kbd>Ctrl</Kbd>;
  }, [isMac]);

  return (
    <Button
      {...props}
      ref={forwardedRef}
      variant="secondary-neutral"
      aria-keyshortcuts="Control+k"
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
                  {keys}
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
