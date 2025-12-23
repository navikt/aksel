"use client";

import cl from "clsx";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { useRef } from "react";
import {
  BodyShort,
  BoxNew,
  Button,
  HStack,
  Heading,
  Hide,
  Link,
  Show,
  Tag,
  VStack,
} from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { ENDRINGSLOGG_QUERYResult } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { capitalizeText } from "@/ui-utils/format-text";
import styles from "./Changelog.module.css";
import ShowMore from "./ShowMore";

const Hero = ({
  herobilde,
}: {
  herobilde: NonNullable<ENDRINGSLOGG_QUERYResult[number]["herobilde"]>;
}) => (
  <Image
    className={styles.herobilde}
    aria-hidden={herobilde.dekorativt}
    alt={herobilde.alt || ""}
    loading="lazy"
    decoding="async"
    src={urlForImage(herobilde)?.auto("format").url() || ""}
    width={1200}
    height={630}
  />
);

interface Props {
  logEntry: ENDRINGSLOGG_QUERYResult[number];
  isLastOfMonth: boolean;
  isLastEntry: boolean;
}

export default function LogEntry({
  logEntry: {
    heading,
    slug,
    endringsdato,
    endringstype,
    fremhevet,
    herobilde,
    content,
    visMer,
  },
  isLastOfMonth = false,
  isLastEntry = false,
}: Props) {
  const logEntryContainer = useRef<HTMLDivElement>(null);

  return (
    <li>
      {/* Log entry spacer
          MonthHeader (potentially immediately above) should have elements scroll directly below itself, so we add a vertical timeline segment and appropriate spacing here */}
      <VStack width="48px" height="var(--ax-space-32)" align="center">
        <Hide below="sm" asChild>
          <BoxNew flexGrow="1" className={styles.timeline} />
        </Hide>
      </VStack>
      {/* Log entry container */}
      <HStack wrap={false}>
        {/* Dot + vertical line */}
        <Hide below="sm" asChild>
          <VStack width="16px" align="center" marginInline="space-16 space-0">
            <BoxNew
              marginBlock="space-2 space-0"
              className={cl(styles.bullet, fremhevet && styles.bulletFremhevet)}
            />
            {!isLastEntry && (
              <BoxNew flexGrow="1" className={styles.timeline} />
            )}
          </VStack>
        </Hide>
        {/* Log entry */}
        <VStack
          gap="space-8"
          paddingInline={{ xs: "space-8", sm: "space-16" }}
          flexGrow="1"
          position="relative"
          ref={logEntryContainer}
          className={styles.logEntry}
        >
          {/* Category and date */}
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
                data-color={fremhevet ? "aksel-brand-pink" : "neutral"}
                className={!fremhevet ? styles.entryEyebrowNotFremhevet : ""}
              >
                {capitalizeText(endringstype || "")}
                <BodyShort as="span" visuallyHidden>
                  .&nbsp;
                </BodyShort>
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
                data-color="aksel-brand-pink"
              >
                Fremhevet
              </Tag>
            )}
          </HStack>
          {/* Header and content */}
          <VStack
            marginBlock={fremhevet ? "space-0 space-32" : "space-0 space-64"}
            padding={fremhevet ? "space-16" : "space-0"}
            className={cl(fremhevet && styles.innholdFremhevetBorder)}
          >
            {visMer ? (
              <ShowMore as="div" scrollTargetRef={logEntryContainer}>
                <ShowMore.Heading>
                  <Heading size="large" level="2" spacing>
                    <Link
                      as={NextLink}
                      href={`./endringslogg/${slug}`}
                      className={
                        fremhevet ? styles.innholdFremhevet : undefined
                      }
                      data-color="neutral"
                    >
                      {heading}
                    </Link>
                  </Heading>
                </ShowMore.Heading>
                <ShowMore.Content
                  collapsedHeight={fremhevet ? "16rem" : "8rem"}
                >
                  {fremhevet && herobilde?.asset && (
                    <Hero herobilde={herobilde} />
                  )}
                  <CustomPortableText
                    className={cl(
                      fremhevet ? styles.innholdFremhevet : undefined,
                      styles.portableTextFirstHeading,
                    )}
                    data-color={fremhevet ? "aksel-brand-pink" : "brand-blue"}
                    value={content as PortableTextBlock[]}
                  />
                </ShowMore.Content>
                <ShowMore.Button>
                  <Button
                    size="small"
                    variant="secondary-neutral"
                    className={cl(fremhevet && styles.showMoreButtonFremhevet)}
                    data-color={fremhevet ? "aksel-brand-pink" : "neutral"}
                  />
                </ShowMore.Button>
              </ShowMore>
            ) : (
              <>
                <Heading size="large" level="2" spacing>
                  <Link
                    as={NextLink}
                    href={`./endringslogg/${slug}`}
                    className={fremhevet ? styles.innholdFremhevet : undefined}
                    data-color="neutral"
                  >
                    {heading}
                  </Link>
                </Heading>
                {fremhevet && herobilde?.asset && (
                  <Hero herobilde={herobilde} />
                )}
                <CustomPortableText
                  className={cl(
                    fremhevet ? styles.innholdFremhevet : undefined,
                    styles.portableTextFirstHeading,
                  )}
                  data-color={fremhevet ? "aksel-brand-pink" : undefined}
                  value={content as PortableTextBlock[]}
                />
              </>
            )}
          </VStack>
        </VStack>
      </HStack>
      <Show below="sm" asChild>
        {!isLastOfMonth && <hr className={styles.divider} />}
      </Show>
    </li>
  );
}
