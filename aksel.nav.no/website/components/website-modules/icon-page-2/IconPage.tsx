import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import * as Icons from "@navikt/aksel-icons";
import { HGrid, HStack, Heading } from "@navikt/ds-react";
import { IconPageDetails } from "./IconPage.details";
import { IconPageForm } from "./IconPage.form";
import styles from "./IconPage.module.css";
import { categorizeIcons, searchIcons } from "./IconPage.utils";

function IconPage({ iconName }: { iconName?: string }) {
  const { push } = useRouter();

  const [searchState, setSearchState] = useState<{
    query: string;
    toggle: "stroke" | "fill";
  }>({
    query: "",
    toggle: "stroke",
  });

  const categories = useMemo(
    () => categorizeIcons(searchIcons(searchState)),
    [searchState],
  );

  return (
    <div>
      <IconPageForm searchState={searchState} setSearchState={setSearchState} />
      <HGrid
        columns={{ xs: 1, lg: "3fr minmax(300px, 2fr)" }}
        gap="space-40"
        marginBlock="space-24 0"
      >
        <section aria-label="Ikonliste" className="flex flex-col gap-10">
          {categories.map((section) => {
            return (
              <div key={section.category}>
                <Heading level="2" size="large" spacing>
                  {section.category}
                </Heading>

                <HStack gap="space-8">
                  {section.icons.map((icon) => {
                    const T = Icons[`${icon.id}Icon`]; // eslint-disable-line import/namespace
                    if (T === undefined) {
                      return null;
                    }
                    return (
                      <button
                        onClick={() => {
                          const href =
                            iconName !== icon.id
                              ? `/icons/${icon.id}`
                              : "/icons";
                          push(href, undefined, {
                            scroll: false,
                          });
                        }}
                        key={icon.id}
                        id={icon.id}
                        className={styles.iconButton}
                        data-state={
                          icon.id === iconName ? "active" : "inactive"
                        }
                        aria-pressed={iconName === icon.id}
                      >
                        <T fontSize="1.5rem" aria-hidden title={icon.name} />
                      </button>
                    );
                  })}
                </HStack>
              </div>
            );
          })}
        </section>
        <section
          aria-label={iconName ? `Ikon ${iconName}` : "Kom i gang med ikoner"}
        >
          <IconPageDetails iconName={iconName} />
        </section>
      </HGrid>
    </div>
  );
}

export { IconPage };
