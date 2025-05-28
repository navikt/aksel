import { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { useRef, useState } from "react";
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
import { urlForImage } from "@/app/_sanity/utils";
import styles from "./Changelog.module.css";

export default function LogEntry({ logEntry, index, isLastEntry = false }) {
  const [expanded, setExpanded] = useState(false);
  const logEntryContainer = useRef(null);
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
              logEntry.fremhevet ? ` ${styles.bulletFremhevet}` : ""
            }`}
          />
          {!isLastEntry && <Box.New flexGrow="1" className={styles.timeline} />}
        </VStack>
        {/* Log entry */}
        <VStack paddingInline="space-16" flexGrow="1">
          <HStack justify="start" align="baseline" gap="space-16">
            <HStack gap="space-4">
              <BodyShort
                size="small"
                spacing
                className={
                  logEntry.fremhevet
                    ? styles.kategoriFremhevet
                    : styles.kategoriInList
                }
              >
                {logEntry.endringstype} •
              </BodyShort>
              <BodyShort
                size="small"
                spacing
                className={
                  logEntry.fremhevet ? styles.dateFremhevet : styles.date
                }
              >
                {new Date(logEntry.endringsdato).toLocaleDateString("NO", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </BodyShort>
            </HStack>
            {logEntry.fremhevet && (
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
            ref={logEntryContainer}
            marginBlock="space-0 space-32"
            padding={logEntry.fremhevet ? "space-16" : "space-0"}
            className={logEntry.fremhevet ? styles.innholdFremhevet : ""}
            style={{
              overflow: "hidden",
              maxHeight: expanded ? "unset" : "200px",
              maskImage: expanded
                ? "unset"
                : "linear-gradient(var(--ax-bg-default), 90%, transparent)",
              maskSize: "90%",
              maskPosition: "",
              scrollMarginTop:
                "calc(var(--website-header-height) + var(--ax-space-12) + 48px + var(--ax-space-16))",
            }}
          >
            <Heading size="large" level="2" spacing>
              <Link
                href={`./endringslogg/${logEntry.slug.current}`}
                data-aksel-heading-color
              >
                {logEntry.heading}
              </Link>
            </Heading>
            {logEntry.fremhevet && logEntry.herobilde && (
              <Image
                key={"hero-" + index}
                data-block-margin="space-28"
                className={styles.herobilde}
                // style={{
                //   backgroundColor:
                //     logEntry.fremhevet && logEntry.herobilde?.bakgrunnsfarge
                //       ? logEntry.herobilde.bakgrunnsfarge
                //       : "",
                //   "--herobilde-bg-color-first":
                //     logEntry.herobilde.bakgrunnsfarge ||
                //     "var(--aksel-brand-pink-400)",
                //   "--herobilde-bg-color-last":
                //     logEntry.herobilde.bakgrunnsfarge ||
                //     "var(--aksel-brand-pink-700)",
                //   "--herobilde-bg-degrees": "130deg",
                // }}
                alt={logEntry.herobilde.alt}
                loading="lazy"
                decoding="async"
                src={
                  urlForImage(logEntry.herobilde)?.auto("format").url() || ""
                }
                width={1200}
                height={630}
              />
            )}

            <CustomPortableText
              value={logEntry.innhold as PortableTextBlock[]}
            />
          </VStack>
          <Button
            size="small"
            variant="secondary-neutral"
            icon={expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            style={{
              position: "relative",
              alignSelf: "start",
              backgroundColor: "Background",
              ...(expanded ? { top: "-20px" } : { top: "-20px" }),
              ...(logEntry.fremhevet
                ? {
                    color: "var(--aksel-brand-pink-1000)",
                    boxShadow: "var(--aksel-brand-pink-600)",
                  }
                : {}),
            }}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((prev) => !prev);
              if (expanded) {
                setTimeout(() => {
                  if (logEntryContainer.current) {
                    logEntryContainer.current.scrollIntoView({
                      smooth: true,
                      block: "start",
                    });
                  }
                }, 100);
              }
            }}
          >
            {expanded ? "Vis mindre" : "Vis mer"}
          </Button>
        </VStack>
      </HStack>
    </li>
  );
}
