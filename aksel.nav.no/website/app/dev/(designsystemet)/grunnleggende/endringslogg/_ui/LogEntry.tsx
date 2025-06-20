"use client";

import cl from "clsx";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { MutableRefObject, useRef } from "react";
import type { Image as SanityImage } from "sanity";
import {
  BodyShort,
  Box,
  Button,
  HStack,
  Heading,
  Link,
  Tag,
  VStack,
} from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { ENDRINGSLOGG_QUERYResult } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { capitalize } from "@/utils";
import styles from "./Changelog.module.css";
import ShowMore from "./ShowMore";

interface Props {
  logEntry: ENDRINGSLOGG_QUERYResult[number];
  index: number;
  isLastEntry: boolean;
}

const Hero = ({
  herobilde,
  index,
}: {
  herobilde: ENDRINGSLOGG_QUERYResult[number]["herobilde"];
  index: number;
}) => (
  <Image
    key={"hero-" + index}
    className={styles.herobilde}
    aria-hidden={herobilde?.dekorativt}
    alt={herobilde?.alt || ""}
    loading="lazy"
    decoding="async"
    src={
      urlForImage(herobilde as SanityImage)
        ?.auto("format")
        .url() || ""
    }
    width={1200}
    height={630}
  />
);

export default function LogEntry({
  logEntry: {
    heading,
    slug,
    endringsdato,
    endringstype,
    fremhevet,
    herobilde,
    innhold,
    visMer,
  },
  index,
  isLastEntry = false,
}: Props) {
  const logEntryContainer = useRef<HTMLDivElement>(null);

  return (
    <li>
      {/* Log entry spacer.
          MonthHeader (potentially immediately above) should have elements scroll immediately underneath itself, so we add a vertical timeline segment for appropriate spacing here */}
      <VStack width="48px" height="var(--ax-space-32)" align="center">
        <Box.New flexGrow="1" className={styles.timeline} />
      </VStack>
      {/* TODO: [endringslogg] Remove timeline and add divider on mobile */}
      <HStack wrap={false}>
        {/* Dot + vertical line */}
        <VStack width="16px" align="center" marginInline="space-16 space-0">
          {/* <Box.New height="0.1rem" className={styles.timeline} /> */}
          <Box.New
            marginBlock="space-2 space-0"
            className={cl(styles.bullet, fremhevet && styles.bulletFremhevet)}
          />
          {!isLastEntry && <Box.New flexGrow="1" className={styles.timeline} />}
        </VStack>
        {/* Log entry */}
        <VStack
          gap="space-8"
          paddingInline="space-16"
          flexGrow="1"
          position="relative"
          ref={logEntryContainer}
          className={styles.logEntry}
        >
          <HStack
            justify="start"
            align="baseline"
            gap={{ xs: "space-4", sm: "space-16" }}
          >
            <HStack asChild gap="space-4">
              <BodyShort
                size="small"
                weight="semibold"
                textColor="subtle"
                className={
                  fremhevet
                    ? styles.entryEyebrowFremhevet
                    : styles.entryEyebrowNotFremhevet
                }
              >
                {capitalize(endringstype || "")}
                <span className="sr-only">.&nbsp;</span>
                <span aria-hidden>•</span>
                <span>
                  {format(new Date(endringsdato || 0), "d. MMMM yyy", {
                    locale: nb,
                  })}
                </span>
              </BodyShort>
            </HStack>
            {fremhevet && (
              <Tag
                size="xsmall"
                variant="neutral-filled"
                // TODO: [endringslogg] Verify color shade
                className={styles.tag}
                // data-color="aksel-brand-pink"
              >
                Fremhevet
              </Tag>
            )}
          </HStack>
          <VStack
            marginBlock={fremhevet ? "space-0 space-32" : "space-0 space-64"}
            padding={fremhevet ? "space-16" : "space-0"}
            className={cl(styles.innhold, fremhevet && styles.innholdFremhevet)}
            data-color={fremhevet ? "aksel-brand-pink" : ""}
          >
            {visMer ? (
              <ShowMore
                scrollTargetRef={
                  logEntryContainer as MutableRefObject<HTMLElement>
                }
                style={{
                  scrollMarginTop:
                    "calc(var(--website-header-height) + var(--ax-space-12) + 48px + var(--ax-space-32))",
                }}
                // scrollBackOnCollapse={false}
              >
                <ShowMore.Heading>
                  <Heading size="large" level="2" spacing>
                    <Link
                      href={`./endringslogg/${slug?.current}`}
                      data-aksel-heading-color
                    >
                      {heading}
                    </Link>
                  </Heading>
                </ShowMore.Heading>
                <ShowMore.Content
                  collapsedHeight={fremhevet ? "16rem" : "10rem"}
                >
                  {fremhevet && herobilde?.asset && (
                    <Hero herobilde={herobilde} index={index} />
                  )}
                  <CustomPortableText
                    className={styles.portableTextFirstHeading}
                    value={innhold as PortableTextBlock[]}
                  />
                </ShowMore.Content>
                <ShowMore.Button>
                  <Button
                    size="small"
                    variant="secondary-neutral"
                    className={cl(fremhevet && styles.showMoreButtonFremhevet)}
                  />
                </ShowMore.Button>
              </ShowMore>
            ) : (
              <>
                <Heading size="large" level="2" spacing>
                  <Link
                    href={`./endringslogg/${slug?.current}`}
                    data-aksel-heading-color
                  >
                    {heading}
                  </Link>
                </Heading>
                {fremhevet && herobilde?.asset && (
                  <Hero herobilde={herobilde} index={index} />
                )}
                <CustomPortableText
                  className={styles.portableTextFirstHeading}
                  value={innhold as PortableTextBlock[]}
                />
              </>
            )}
          </VStack>
        </VStack>
      </HStack>
    </li>
  );
}
