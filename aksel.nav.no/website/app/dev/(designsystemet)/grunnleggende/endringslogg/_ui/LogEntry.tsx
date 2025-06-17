"use client";

import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { useRef, useState, version } from "react";
import type { Image as SanityImage } from "sanity";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
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

const inertValue = parseInt(version.split(".")[0]) > 18; // Support for inert was added in React 19

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

  const [expanded, setExpanded] = useState(false);
  const [shouldFlash, setShouldFlash] = useState(false);
  const ChevronIcon = expanded ? ChevronUpIcon : ChevronDownIcon;
  const toggleExpansion = () => {
    setExpanded((previous) => !previous);
    if (expanded) {
      setShouldFlash(true);
      // header + monthSpacer + monthBubble + logEntrySpacer
      // generating this value dynamically from css is a bit complex
      const scrollMarginTop = 64 + 12 + 48 + 32;
      if (
        logEntryContainer.current &&
        logEntryContainer.current.getBoundingClientRect().top < scrollMarginTop
      ) {
        setTimeout(() => {
          // setShouldFlash(true);
          logEntryContainer.current?.scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        }, 1);
      }
    } else {
      setShouldFlash(false);
    }
  };

  return (
    <li key={"log-entry-" + index}>
      {/* logEntrySpacer, since sticky MonthHeader cuts off immediately below */}
      <VStack width="48px" height="var(--ax-space-32)" align="center">
        <Box.New flexGrow="1" className={styles.timeline} />
      </VStack>
      <HStack wrap={false}>
        {/* TODO: [endringslogg] Remove timeline and add divider on mobile */}
        {/* Dot + vertical line */}
        <VStack width="16px" align="center" marginInline="space-16 space-0">
          {/* <Box.New height="0.1rem" className={styles.timeline} /> */}
          <Box.New
            marginBlock="space-2 space-0"
            className={`${styles.bullet}${
              fremhevet ? ` ${styles.bulletFremhevet}` : ""
            }`}
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
          className={`${styles.logEntry}`}
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
          {/* TODO: [endringslogg] Decide 'Vis mer' transition on collapse */}
          {/* TODO: [endringslogg] Test correct focus/screen reader flow after collapse of 'Vis mer' */}
          {/* TODO: [endringslogg] Move 'Vis mer' into standalone component */}
          <VStack
            marginBlock={fremhevet ? "space-0 space-32" : "space-0 space-64"}
            padding={fremhevet ? "space-16" : "space-0"}
            className={`${styles.innhold}${
              fremhevet ? ` ${styles.innholdFremhevet}` : ""
            } ${shouldFlash ? ` ${styles.logEntryHighlight}` : ""} `}
            data-color={fremhevet ? "aksel-brand-pink" : ""}
          >
            <Heading size="large" level="2" spacing>
              <Link
                href={`./endringslogg/${slug?.current}`}
                data-aksel-heading-color
              >
                {heading}
              </Link>
            </Heading>
            {visMer && (
              <Button
                size="small"
                variant="secondary-neutral"
                icon={<ChevronIcon />}
                className={`${styles.visMerButton}${
                  fremhevet ? ` ${styles.visMerButtonFremhevet}` : ""
                }`}
                onClick={toggleExpansion}
              >
                {expanded ? "Vis mindre" : "Vis mer"}
              </Button>
            )}

            {visMer ? (
              <div
                className={`${styles.visMerContainer} ${
                  expanded ? styles.visMerExpanded : styles.visMerCollapsed
                }${
                  !expanded && fremhevet
                    ? ` ${styles.visMerCollapsedFremhevet}`
                    : ""
                }`}
                inert={!expanded ? inertValue : false}
              >
                {fremhevet && herobilde?.asset && (
                  <Hero herobilde={herobilde} index={index} />
                )}
                <CustomPortableText
                  className={styles.portableTextFirstHeading}
                  value={innhold as PortableTextBlock[]}
                />
              </div>
            ) : (
              <>
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
