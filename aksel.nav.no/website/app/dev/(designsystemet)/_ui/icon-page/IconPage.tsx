"use client";

import NextLink from "next/link";
import * as Icons from "@navikt/aksel-icons";
import { BrailleIcon, DownloadIcon } from "@navikt/aksel-icons";
import meta from "@navikt/aksel-icons/metadata";
import {
  BodyLong,
  Button,
  HGrid,
  HStack,
  Heading,
  Link,
  VStack,
} from "@navikt/ds-react";
import { EmptyStateCard } from "@/app/_ui/empty-state/EmptyState";
import { FigmaIcon } from "@/assets/Icons";
import pagestyles from "../Designsystemet.module.css";
import { DesignsystemetPageLayout } from "../DesignsystemetPage";
import { IconPageButton } from "./IconPage.button";
import { IconDetails, IntroInformation } from "./IconPage.details";
import { IconPageForm } from "./IconPage.form";
import styles from "./IconPage.module.css";
import { IconPageProvider } from "./IconPage.provider";
import { IconPageSidebar } from "./IconPage.sidebar";
import { categorizeIcons, searchIcons } from "./IconPage.utils";

function IconPage({
  iconName,
  iconQuery,
  iconToggle,
  iconSvg,
}: {
  iconName?: keyof typeof meta;
  iconQuery?: string;
  iconToggle: "stroke" | "fill";
  iconSvg?: string;
}) {
  const iconsWithCategories = categorizeIcons(
    searchIcons({ query: iconQuery ?? "", toggle: iconToggle ?? "stroke" }),
  );

  return (
    <DesignsystemetPageLayout>
      <div>
        <Heading
          level="1"
          size="xlarge"
          className={pagestyles.pageHeaderHeading}
        >
          Ikoner
        </Heading>
        <BodyLong size="large">
          {Object.keys(meta).length} open source-ikoner designet og utviklet for
          Nav
        </BodyLong>
        <HStack as="ul" gap="space-16" marginBlock="space-16 0">
          <li className={styles.iconPageLinkLi}>
            <NextLink
              href="https://www.figma.com/community/file/1214869602572392330"
              passHref
              legacyBehavior
            >
              <Link
                variant="subtle"
                data-umami-event="navigere"
                data-umami-event-kilde="ikonside"
              >
                <FigmaIcon /> <span>Figma</span>
              </Link>
            </NextLink>
          </li>

          <li className={styles.iconPageLinkLi}>
            <NextLink
              href="/god-praksis/artikler/tilgjengelig-ikonbruk"
              passHref
              legacyBehavior
            >
              <Link
                variant="subtle"
                data-umami-event="navigere"
                data-umami-event-kilde="ikonside"
              >
                <BrailleIcon aria-hidden fontSize="1.5rem" />{" "}
                <span>Tilgjengelighet</span>
              </Link>
            </NextLink>
          </li>
          <li className={styles.iconPageLinkLi}>
            <Link
              variant="subtle"
              href="https://cdn.nav.no/aksel/icons/zip/aksel-icons.zip"
              download="Ikonpakke"
              data-umami-event="last ned"
              data-umami-event-tema="ikon"
              data-umami-event-type="zip"
              data-umami-event-tittel="ikonpakke"
            >
              <DownloadIcon fontSize="1.5rem" aria-hidden /> Last ned ikonpakke
            </Link>
          </li>
        </HStack>
      </div>

      <IconPageProvider>
        <div>
          <IconPageForm iconQuery={iconQuery} iconToggle={iconToggle} />
          <HGrid
            columns={{ xs: 1, xl: "3fr minmax(300px, 2fr)" }}
            gap="space-40"
            marginBlock="space-24 0"
          >
            <VStack as="section" aria-label="Ikonliste" gap="space-40">
              {iconsWithCategories.length === 0 && (
                <EmptyStateCard
                  variant="questionmark"
                  actionComponent={
                    <Button
                      as="a"
                      href="https://github.com/navikt/aksel/issues/new?labels=nytt+✨%2Cikoner+🖼%2Cforespørsel+🥰&template&template=new-icon.yaml&title=%5BNytt+ikon%5D%3A+"
                      variant="secondary-neutral"
                    >
                      Send innspill
                    </Button>
                  }
                />
              )}
              {iconsWithCategories.map((section) => {
                return (
                  <div key={section.category}>
                    <Heading
                      level="2"
                      size="large"
                      spacing
                      className={pagestyles.pageHeaderHeading}
                    >
                      {section.category}
                    </Heading>

                    <HStack gap="space-8">
                      {section.icons.map((icon) => {
                        const T = Icons[`${icon.id}Icon`]; // eslint-disable-line import/namespace
                        if (T === undefined) {
                          return null;
                        }
                        return (
                          <IconPageButton
                            key={icon.id}
                            iconName={icon.id}
                            activeIconName={iconName}
                            icon={<T fontSize="1.5rem" title={icon.name} />}
                          />
                        );
                      })}
                    </HStack>
                  </div>
                );
              })}
            </VStack>
            <IconPageSidebar iconName={iconName}>
              {iconName ? (
                <IconDetails iconName={iconName} iconSvg={iconSvg} />
              ) : (
                <IntroInformation />
              )}
            </IconPageSidebar>
          </HGrid>
        </div>
      </IconPageProvider>
    </DesignsystemetPageLayout>
  );
}

export { IconPage };
