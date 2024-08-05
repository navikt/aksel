import cl from "clsx";
import Fuse from "fuse.js";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import * as Icons from "@navikt/aksel-icons";
import meta from "@navikt/aksel-icons/metadata";
import { HGrid, Heading, Modal, Search, ToggleGroup } from "@navikt/ds-react";
import { useMedia } from "@/hooks/useMedia";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { SEO } from "@/web/seo/SEO";
import { SuggestionBlock } from "@/web/suggestionblock/SuggestionBlock";
import { IconSidebar } from "./Sidebar";
import { TitleLinks } from "./TitleLinks";
import { categorizeIcons, getFillIcon } from "./utils";

const fuseStroke = new Fuse(
  Object.values(meta).filter((x) => x.variant.toLowerCase() === "stroke"),
  {
    threshold: 0.2,
    keys: [
      { name: "name", weight: 3 },
      { name: "category", weight: 2 },
      { name: "sub_category", weight: 2 },
      { name: "keywords", weight: 3 },
      { name: "variant", weight: 1 },
    ],
    shouldSort: false,
  },
);

const fuseFill = new Fuse(getFillIcon(Object.values(meta)), {
  threshold: 0.2,
  keys: [
    { name: "name", weight: 3 },
    { name: "category", weight: 2 },
    { name: "sub_category", weight: 2 },
    { name: "keywords", weight: 3 },
    { name: "variant", weight: 1 },
  ],
  shouldSort: false,
});

export const IconPage = ({ name }: { name: string }) => {
  const [query, setQuery] = useState("");
  const [toggle, setToggle] = useState<"stroke" | "fill">("stroke");
  const focusRef = useRef<HTMLAnchorElement | null>(null);

  const [strokeIcons] = useState(
    Object.values(meta).filter((x) => x.variant.toLowerCase() === "stroke"),
  );

  const [fillIcons] = useState(getFillIcon(Object.values(meta)));

  const hideModal = useMedia("screen and (min-width: 1024px)");

  const categories = useMemo(() => {
    if (toggle === "fill") {
      return categorizeIcons(
        query
          ? fuseFill.search(query).map((result) => result.item as any)
          : fillIcons,
      );
    }
    return categorizeIcons(
      query
        ? fuseStroke.search(query).map((result) => result.item as any)
        : strokeIcons,
    );
  }, [toggle, query, strokeIcons, fillIcons]);

  const subCategoryWordLength = useMemo(
    () =>
      Math.max(
        ...categorizeIcons(strokeIcons).map((cat) =>
          Math.max(...cat.sub_categories.map((sub) => sub.sub_category.length)),
        ),
      ),
    [strokeIcons],
  );

  return (
    <>
      <SEO
        title={name.length > 0 ? `${name}Icon` : "Ikoner"}
        description="800+ open source-ikoner designet og utviklet for NAV"
        fallbackImage="https://aksel.nav.no/images/og/ikoner/og-ikoner.png"
        canonical="https://aksel.nav.no/ikoner"
      />

      <div className="bg-surface-subtle">
        <Header variant="transparent" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] focus:outline-none"
        >
          <div className="mx-auto grid w-full max-w-screen-2xl px-4 pb-40 pt-20 sm:px-6">
            <div>
              <div>
                <h1 className="my-0 w-fit text-5xl font-bold text-deepblue-700">
                  Aksel ikoner
                </h1>
                <div className="override-text-no-max mt-4 text-xl">
                  <p>{`${
                    Object.values(meta).length
                  } open source-ikoner designet og utviklet for NAV`}</p>
                </div>
              </div>
              <TitleLinks />
            </div>

            <div className="z-10 mb-8 mt-16 h-full w-full rounded-2xl bg-surface-default shadow-large">
              <div className="sticky top-0 z-20 grid items-center rounded-t-2xl border-b border-b-border-subtle bg-surface-default p-1">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex w-full flex-wrap-reverse items-center gap-4 px-4 py-2 sm:flex-nowrap"
                >
                  <ToggleGroup
                    value={toggle}
                    onChange={(v) => setToggle(v as any)}
                    variant="neutral"
                    aria-label="Velg ikonvariant"
                    className="shrink-0"
                  >
                    <ToggleGroup.Item value="stroke" label="Stroke" />
                    <ToggleGroup.Item value="fill" label="Fill" />
                  </ToggleGroup>
                  <Search
                    variant="simple"
                    label="Ikonsøk"
                    className="border-none"
                    placeholder="Søk"
                    autoComplete="off"
                    onChange={setQuery}
                    value={query}
                    clearButton={false}
                    onKeyDown={(e) => {
                      /* Avoids closing icon-sidebar when clearing Search */
                      if (e.key === "Escape") {
                        if (e.currentTarget.value) {
                          e.stopPropagation();
                        }
                      }
                    }}
                  />
                </form>
              </div>
              <div className="flex">
                <div
                  className={cl(
                    "grid w-full animate-fadeIn place-content-start justify-stretch gap-8 px-6 py-8",
                    {
                      "border-r border-r-border-subtle": !!name,
                      "basis-2/3": name,
                    },
                  )}
                >
                  {categories.length === 0 && (
                    <div>
                      <SuggestionBlock variant="ikon-not-found" />
                    </div>
                  )}
                  {categories.map((cat) => {
                    return (
                      <div key={cat.category}>
                        <Heading
                          level="2"
                          size="small"
                          className="text-text-default"
                          spacing
                        >
                          {cat.category}
                        </Heading>
                        <div className="grid w-full">
                          {cat.sub_categories.map((sub) => {
                            return (
                              <div
                                key={sub.sub_category}
                                className="border-t border-t-border-subtle py-2"
                              >
                                <HGrid
                                  columns={{
                                    xs: "1fr",
                                    md: `${subCategoryWordLength}ch 1fr`,
                                  }}
                                  gap={{ xs: "0", md: "2" }}
                                >
                                  <Heading
                                    level="3"
                                    size="xsmall"
                                    className="leading-[44px] text-text-subtle"
                                  >
                                    {sub.sub_category}
                                  </Heading>

                                  <div className="flex flex-wrap gap-05">
                                    {sub.icons.map((i) => {
                                      const T = Icons[`${i.id}Icon`]; // eslint-disable-line import/namespace
                                      if (T === undefined) {
                                        return null;
                                      }
                                      return (
                                        <Link
                                          href={`/ikoner/${i.id}`}
                                          scroll={false}
                                          key={i.id}
                                          prefetch={false}
                                          id={i.id}
                                          tabIndex={0}
                                          ref={(el) => {
                                            if (name === i.id) {
                                              focusRef.current = el;
                                            }
                                          }}
                                          className={cl(
                                            "group relative grid aspect-square w-11 shrink-0 place-items-center rounded bg-surface-subtle hover:bg-surface-neutral-subtle-hover focus:outline-none focus:ring-blue-800 focus-visible:ring-2 active:bg-surface-neutral-subtle-hover",
                                            {
                                              "z-10 bg-surface-selected bg-gradient-to-br from-surface-selected to-teal-50 ring-1 ring-border-alt-3":
                                                i.id === name,
                                            },
                                          )}
                                        >
                                          <span className="navds-sr-only">
                                            {i.name}
                                          </span>
                                          <T
                                            className="text-3xl"
                                            aria-hidden
                                            alt=""
                                          />
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </HGrid>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {name && hideModal && (
                  <IconSidebar name={name} focusRef={focusRef} />
                )}

                {!hideModal && (
                  <Modal
                    open={!!name}
                    aria-label={`${name} ikon`}
                    className="rounded px-6 py-6"
                    onClose={() => null}
                  >
                    {name && <IconSidebar name={name} focusRef={focusRef} />}
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};
