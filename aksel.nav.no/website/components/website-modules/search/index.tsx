import { DocSearchModal, useDocSearchKeyboardEvents } from "@docsearch/react";
import { DocSearchHit } from "@docsearch/react/dist/esm/types";
import { Search as SearchIcon } from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";
import cl from "classnames";
import React from "react";
import { createPortal } from "react-dom";

function Search({
  variant = "ds",
  full,
}: {
  variant?: "ds" | "aksel-inverted" | "aksel";
  full?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const searchButtonRef = React.useRef(null);

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  const cleanUrl = (url: string) => {
    const newUrl = new URL(url);
    newUrl.search = "";
    return newUrl.toString();
  };

  const sortItems = (i: DocSearchHit[]): DocSearchHit[] => {
    const cleaned = i.map((x) => ({ ...x, url: cleanUrl(x.url) }));

    const uniqueHits = Array.from(new Set(cleaned.map((a) => a.url))).map(
      (url) => {
        return cleaned.find((a) => a.url === url);
      }
    );

    return [uniqueHits[0]];
  };

  return (
    <>
      {full ? (
        <BodyShort
          ref={searchButtonRef}
          onClick={onOpen}
          as="button"
          className="border-border-default hover:border-border-action focus-visible:shadow-focus group relative w-full max-w-[28rem] rounded border bg-white py-4 pr-4 pl-16 text-left focus:outline-none"
        >
          <SearchIcon
            aria-hidden
            className="absolute left-6 top-1/2 -translate-y-1/2 text-[1.5rem]"
          />
          <span aria-hidden>Åpne søk</span>
        </BodyShort>
      ) : (
        <button
          ref={searchButtonRef}
          onClick={onOpen}
          className={cl(
            "w-header z-[1050] ml-auto flex shrink-0 items-center justify-center focus:outline-none",
            {
              "text-text-on-inverted focus-visible:shadow-focus-inverted-inset hover:bg-gray-100/10":
                variant === "aksel-inverted",
              "focus-visible:shadow-focus-inset hover:bg-gray-800/10":
                variant === "aksel",
              "text-text-on-inverted hover:bg-gray-800 focus-visible:shadow-[inset_0_0_0_1px_var(--a-gray-900),inset_0_0_0_3px_var(--a-border-focus-on-inverted)]":
                variant === "ds",
            }
          )}
        >
          <span className="navds-sr-only">Åpne søk</span>
          <SearchIcon className="ml-[3px] h-6 w-6" aria-hidden />
        </button>
      )}

      {isOpen &&
        createPortal(
          <DocSearchModal
            transformItems={sortItems}
            translations={{
              searchBox: {
                resetButtonTitle: "Slett søketekst",
                resetButtonAriaLabel: "Slett søketekst",
                cancelButtonText: "avbryt",
                cancelButtonAriaLabel: "avbryt",
              },
              startScreen: {
                recentSearchesTitle: "Nylige",
                noRecentSearchesText: "Ingen nylige søk",
                saveRecentSearchButtonTitle: "Lagre søk",
                removeRecentSearchButtonTitle: "Fjern søket fra historien",
                favoriteSearchesTitle: "Favoritter",
                removeFavoriteSearchButtonTitle: "Fjern søket fra favoritter",
              },
              errorScreen: {
                titleText: "Klarer ikke hente resultater..",
                helpText: "Det kan hende du ikke er koblet til internett.",
              },
              footer: {
                selectText: "Velg",
                navigateText: "Navigere søk",
                closeText: "Lukk søk",
                searchByText: "Søk fra",
              },
              noResultsScreen: {
                noResultsText: "Ingen resultater for",
                suggestedQueryText: "Prøv disse søkene",
                openIssueText: "Bør søket gi et resultat?",
                openIssueLinkText: "Send oss en melding, så fikser vi",
              },
            }}
            appId="J64I2SIG7K"
            indexName="aksel_docsearch"
            apiKey="92d2ac76eba4eba628a34baa11743fc1"
            onClose={onClose}
            initialScrollY={window.scrollY}
            placeholder="Søk i dokumentasjon"
            searchParameters={{ typoTolerance: false, distinct: true }}
          />,
          document.body
        )}
    </>
  );
}

export default Search;
