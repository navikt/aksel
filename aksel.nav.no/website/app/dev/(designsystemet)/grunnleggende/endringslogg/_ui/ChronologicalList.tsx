"use client";

import type { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import {
  BodyShort,
  Box,
  HStack,
  Heading,
  Link,
  Tag,
  VStack,
} from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { urlForImage } from "@/app/_sanity/utils";
import { capitalize } from "@/utils";
import styles from "./Changelog.module.css";
// import { Bilde } from "@/app/_ui/bilde/Bilde";
import MonthHeader from "./MonthHeader";

const isDifferentMonth = (firstDateStr, secondDateStr) => {
  const firstDate = new Date(firstDateStr);
  const secondDate = new Date(secondDateStr);
  if (firstDate.getFullYear() !== secondDate.getFullYear()) {
    return true;
  }
  return firstDate.getMonth() !== secondDate.getMonth();
};

// TODO: [endringslogg] Clean up styling, commit to a convention
export default ({ list }) => {
  // TODO: [endringslogg] Remove before production
  console.dir(list);
  return (
    <ul>
      {list.map((item, index) => (
        <>
          {/* Monthly additinal header */}
          {(index === 0 ||
            isDifferentMonth(
              item.endringsdato,
              list[index - 1].endringsdato,
            )) && <MonthHeader logEntry={item} index={index} />}
          {/* Log entry */}
          <li key={"log-entry-" + index}>
            {/* Spacing + vertical line */}
            <VStack width="48px" height="var(--ax-space-32)" align="center">
              <Box.New
                width="0px"
                height="1rem"
                flexGrow="1"
                style={{
                  borderLeft: "1px dashed var(--ax-border-neutral-subtle)",
                }}
              />
            </VStack>
            <HStack style={{ flexWrap: "nowrap" }}>
              {/* Dot + vertical line */}
              <VStack
                width="16px"
                align="center"
                style={{ marginLeft: "var(--ax-space-16)" }}
              >
                <Box.New
                  width="0px"
                  height="0.1rem"
                  style={{
                    borderLeft: "1px dashed var(--ax-border-neutral-subtle)",
                  }}
                />
                <Box.New
                  width="16px"
                  height="16px"
                  borderWidth="4"
                  style={{
                    backgroundColor: "var(--ax-border-neutral)",
                    borderColor: "var(--ax-border-neutral-subtle)",
                    borderRadius: "100%",
                  }}
                />

                {index < list.length - 1 && (
                  <Box.New
                    width="0px"
                    flexGrow="1"
                    style={{
                      borderLeft: "1px dashed var(--ax-border-neutral-subtle)",
                    }}
                  />
                )}
              </VStack>
              {/* Log entry */}
              <VStack
                paddingInline="space-16"
                flexGrow="1"
                style={{
                  ...(item.fremhevet
                    ? {
                        "--ax-text-brand-blue": "var(--aksel-brand-pink-1000)",
                        "--ax-text-default": "var(--aksel-brand-pink-1000)",
                      }
                    : {}),
                }}
              >
                <HStack justify="start" align="baseline" gap="space-16">
                  <BodyShort
                    size="small"
                    spacing
                    className={
                      item.fremhevet
                        ? "text-[--aksel-brand-pink-900]"
                        : "text-[--ax-text-default-subtle]"
                    }
                  >
                    {capitalize(item.endringstype)} •{" "}
                    {new Date(item.endringsdato).toLocaleDateString("NO", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </BodyShort>
                  {item.fremhevet && (
                    <Tag
                      size="xsmall"
                      variant="neutral-filled"
                      style={{
                        borderRadius: "var(--ax-radius-4)",
                        backgroundColor: "var(--aksel-brand-pink-700)",
                      }}
                    >
                      Fremhevet
                    </Tag>
                  )}
                </HStack>
                {/* TODO: [endringslogg] Ensure proper wrapping on mobile */}
                {/* TODO: [endringslogg] Ensure slimmer margins on mobile */}
                {/* TODO: [endringslogg] Show 'Vis mer'-button when log-entry height>400px(?) */}
                <VStack
                  style={{
                    marginBottom: "var(--ax-space-32)",
                    ...(item.fremhevet
                      ? {
                          padding: "var(--ax-space-16)",
                          border: "2px solid var(--aksel-brand-pink-700)",
                          borderRadius: "var(--ax-radius-12)",
                          "--ax-text-brand-blue":
                            "var(--aksel-brand-pink-1000)",
                        }
                      : {}),
                  }}
                >
                  <Heading size="large" level="2" spacing>
                    <Link
                      href={`./endringslogg/${item.slug.current}`}
                      data-aksel-heading-color
                    >
                      {item.heading}
                    </Link>
                  </Heading>
                  {item.fremhevet && item.herobilde && (
                    <Image
                      key={"hero-" + index}
                      className={
                        styles.herobilde +
                        " aspect-[1200/630] rounded-[--ax-radius-12] bg-[--aksel-brand-pink-100] ring-1 ring-[--ax-border-neutral-subtle]" +
                        (item.herobilde.bakgrunnsfarge
                          ? ` bg-[${item.herobilde.bakgrunnsfarge}]`
                          : "")
                      }
                      style={{
                        "--herobilde-bg-color-first":
                          item.herobilde.bakgrunnsfarge ||
                          "var(--aksel-brand-pink-400)",
                        "--herobilde-bg-color-last":
                          item.herobilde.bakgrunnsfarge ||
                          "var(--aksel-brand-pink-700)",
                        "--herobilde-bg-degrees": "130deg",
                        marginBottom: "var(--ax-space-16)",
                      }}
                      alt={item.herobilde.alt}
                      loading="lazy"
                      decoding="async"
                      src={
                        urlForImage(item.herobilde)?.auto("format").url() || ""
                      }
                      width={1200}
                      height={630}
                    />
                  )}

                  <CustomPortableText
                    // data-color-role={item.fremhevet && "aksel-brand-pink"}
                    style={{
                      ...(item.fremhevet
                        ? { color: "var(--aksel-brand-pink-1000)" }
                        : {}),
                    }}
                    value={item.innhold as PortableTextBlock[]}
                  />
                </VStack>
              </VStack>
            </HStack>
          </li>
        </>
      ))}
    </ul>
  );
};
