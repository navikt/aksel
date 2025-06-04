import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { useRef, useState, version } from "react";
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
import styles from "./Changelog.module.css";

interface Props {
  logEntry: ENDRINGSLOGG_QUERYResult[number];
  index: number;
  isLastEntry: boolean;
}

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
  const ChevronIcon = expanded ? ChevronUpIcon : ChevronDownIcon;
  const toggleExpansion = () => {
    setExpanded((prev) => !prev);
    if (expanded) {
      setTimeout(() => {
        if (logEntryContainer.current) {
          logEntryContainer.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }, 1);
    }
  };

  return (
    <li key={"log-entry-" + index}>
      <VStack width="48px" height="var(--ax-space-32)" align="center">
        <Box.New height="1rem" flexGrow="1" className={styles.timeline} />
      </VStack>
      <HStack className={styles.nowrap}>
        {/* Dot + vertical line */}
        <VStack width="16px" align="center" marginInline="space-16 space-0">
          <Box.New height="0.1rem" className={styles.timeline} />
          {/* TODO: [endringslogg] Animate bullet on `fremhevet` items */}
          <Box.New
            className={`${styles.bullet}${
              fremhevet ? ` ${styles.bulletFremhevet}` : ""
            }`}
          />
          {!isLastEntry && <Box.New flexGrow="1" className={styles.timeline} />}
        </VStack>
        {/* Log entry */}
        <VStack
          paddingInline="space-16"
          flexGrow="1"
          position="relative"
          ref={logEntryContainer}
          style={{
            scrollMarginTop:
              // header + monthSpacer + monthBubble + logEntrySpacer ^
              "calc(var(--website-header-height) + var(--ax-space-12) + 48px + var(--ax-space-32))",
          }}
        >
          <HStack justify="start" align="baseline" gap="space-16">
            <HStack gap="space-4">
              <BodyShort
                size="small"
                spacing
                className={
                  fremhevet ? styles.kategoriFremhevet : styles.kategoriInList
                }
              >
                {endringstype} •
              </BodyShort>
              <BodyShort
                size="small"
                spacing
                className={fremhevet ? styles.dateFremhevet : styles.date}
              >
                {format(new Date(endringsdato || 0), "d. MMMM yyy", {
                  locale: nb,
                })}
              </BodyShort>
            </HStack>
            {fremhevet && (
              <Tag
                size="xsmall"
                variant="neutral-filled"
                className={styles.tag}
              >
                Fremhevet
              </Tag>
            )}
          </HStack>
          {/* TODO: [endringslogg] Ensure proper wrapping on mobile */}
          {/* TODO: [endringslogg] Ensure slimmer margins on mobile */}
          {/* TODO: [endringslogg] Fix 'Vis mer' when fremhevet */}
          {/* TODO: [endringslogg] Fix 'Vis mer' when short content wo/expansion */}
          <VStack
            marginBlock={fremhevet ? "space-0 space-32" : "space-0 space-64"}
            padding={fremhevet ? "space-16" : "space-0"}
            className={fremhevet ? styles.innholdFremhevet : ""}
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
                style={{
                  "--button-height": "2rem",
                  position: "absolute",
                  zIndex: 1,
                  backgroundColor: "var(--ax-bg-default)",
                  left: fremhevet ? "2rem" : "1rem",
                  ...(fremhevet
                    ? {
                        bottom:
                          "calc(var(--button-height) + var(--ax-space-16))",
                        color: "var(--aksel-brand-pink-1000)",
                        "--ax-border-neutral": "var(--aksel-brand-pink-600)",
                      }
                    : {
                        bottom: "var(--ax-space-32)",
                      }),
                }}
                onClick={toggleExpansion}
              >
                {expanded ? "Vis mindre" : "Vis mer"}
              </Button>
            )}
            <div
              style={
                visMer
                  ? {
                      overflow: "hidden",
                      maxHeight: expanded ? "unset" : "10rem",
                      maskImage: expanded
                        ? "unset"
                        : "linear-gradient(rgba(0 0 0 / 1), rgba(0 0 0 / 0) calc(100% - 0.5rem))",
                      marginBottom: expanded ? "calc(3rem" : "0",
                      padding: "1px",
                    }
                  : {}
              }
              inert={visMer && !expanded ? inertValue : false}
            >
              {fremhevet && herobilde?.asset && (
                <Image
                  key={"hero-" + index}
                  data-block-margin="space-28"
                  className={styles.herobilde}
                  // style={{
                  //   backgroundColor:
                  //     fremhevet && herobilde?.bakgrunnsfarge
                  //       ? herobilde.bakgrunnsfarge
                  //       : "",
                  //   "--herobilde-bg-color-first":
                  //     herobilde.bakgrunnsfarge ||
                  //     "var(--aksel-brand-pink-400)",
                  //   "--herobilde-bg-color-last":
                  //     herobilde.bakgrunnsfarge ||
                  //     "var(--aksel-brand-pink-700)",
                  //   "--herobilde-bg-degrees": "130deg",
                  // }}
                  aria-hidden={herobilde.dekorativt}
                  alt={herobilde.alt || ""}
                  loading="lazy"
                  decoding="async"
                  // @ts-expect-error - TODO FIX!
                  src={urlForImage(herobilde)?.auto("format").url() || ""}
                  width={1200}
                  height={630}
                />
              )}
              {/* TODO: [endringslogg] Fix space between headline and content in log entry */}
              {/* TODO: [endringslogg] Add transition animation on collapse */}
              {/* TODO: [endringslogg] See if we can avoid `as` here */}
              <CustomPortableText
                className="[&_h3]:!mt-0"
                value={innhold as PortableTextBlock[]}
              />
            </div>
          </VStack>
          {/* TODO: [endringslogg] Add transition animation on collapse */}
        </VStack>
      </HStack>
    </li>
  );
}
