"use client";

import NextLink from "next/link";
import * as Icons from "@navikt/aksel-icons";
import { BrailleIcon, DownloadIcon } from "@navikt/aksel-icons";
import meta from "@navikt/aksel-icons/metadata";
import {
  BodyLong,
  Box,
  Button,
  HGrid,
  HStack,
  Heading,
  Link,
  VStack,
} from "@navikt/ds-react";
import { DesignsystemetEyebrow } from "@/app/(routes)/(designsystemet)/_ui/Designsystemet.eyebrow";
import { EmptyStateCard } from "@/app/_ui/empty-state/EmptyState";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { FigmaIcon } from "@/assets/Icons";
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
        <DesignsystemetEyebrow type="komponent_artikkel" />
        <Heading level="1" size="xlarge" data-aksel-heading-color>
          Ikoner
        </Heading>
        <Box marginBlock="space-8 space-0" asChild>
          <BodyLong size="large">
            {Object.keys(meta).length} open source-ikoner designet og utviklet
            for Nav
          </BodyLong>
        </Box>
        <HStack as="ul" gap="space-16" marginBlock="space-24 0">
          <li className={styles.iconPageLinkLi}>
            <Link
              as={NextLink}
              href="https://www.figma.com/community/file/1214869602572392330"
              variant="subtle"
              onClick={() =>
                umamiTrack("navigere", {
                  kilde: "ikonside",
                  url: "https://www.figma.com/community/file/1214869602572392330",
                })
              }
            >
              <FigmaIcon /> <span>Figma</span>
            </Link>
          </li>

          <li className={styles.iconPageLinkLi}>
            <Link
              as={NextLink}
              href="/god-praksis/artikler/tilgjengelig-ikonbruk"
              variant="subtle"
              onClick={() =>
                umamiTrack("navigere", {
                  kilde: "ikonside",
                  url: "/god-praksis/artikler/tilgjengelig-ikonbruk",
                })
              }
            >
              <BrailleIcon aria-hidden fontSize="1.5rem" />{" "}
              <span>Tilgjengelighet</span>
            </Link>
          </li>
          <li className={styles.iconPageLinkLi}>
            <Link
              variant="subtle"
              href="https://cdn.nav.no/aksel/icons/zip/aksel-icons.zip"
              download="Ikonpakke"
              onClick={() =>
                umamiTrack("last ned", {
                  tema: "ikon",
                  type: "zip",
                  tittel: "ikonpakke",
                })
              }
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
                    <Heading level="2" size="large" data-aksel-heading-color>
                      {section.category}
                    </Heading>

                    <HStack gap="space-8" marginBlock="space-16 space-0">
                      {section.icons.map((icon) => {
                        // eslint-disable-next-line import/namespace
                        const T = Icons[`${icon.id}Icon`];
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
