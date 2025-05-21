"use client";

import { PortableTextBlock } from "next-sanity";
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
import { Bilde } from "@/app/_ui/bilde/Bilde";
import MonthHeader from "./MonthHeader";

const areDifferentMonths = (currentDateString, previousDateString) => {
  const currentDate = new Date(currentDateString);
  const previousDate = new Date(previousDateString);
  if (currentDate.getFullYear() !== previousDate.getFullYear()) {
    return true;
  }
  return currentDate.getMonth() !== previousDate.getMonth();
};
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default ({ list }) => {
  // TODO: [endringslogg] Remove before production
  console.dir(list);
  return (
    <ul>
      {list.map((item, index) => (
        <>
          {/* Monthly additinal header */}
          {(index === 0 ||
            areDifferentMonths(
              item.endringsdato,
              list[index - 1].endringsdato,
            )) && <MonthHeader logEntry={item} index={index} />}
          {/* Log entry */}
          <li key={index}>
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
                <Box.New
                  width="0px"
                  flexGrow="1"
                  style={{
                    borderLeft: "1px dashed var(--ax-border-neutral-subtle)",
                  }}
                />
              </VStack>
              {/* Log entry */}
              <VStack paddingInline="space-16" flexGrow="1">
                <HStack justify="start" align="baseline" gap="space-16">
                  <BodyShort size="small" spacing textColor="subtle">
                    {capitalizeFirstLetter(item.endringstype)} •{" "}
                    {new Date(item.endringsdato).toLocaleDateString("NO", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </BodyShort>
                  {item.fremhevet && (
                    // TODO: [endringslogg] Set correct background color on tag, --ABPink-700 is undefined
                    <Tag
                      size="xsmall"
                      variant="neutral-filled"
                      style={{
                        borderRadius: "var(--ax-radius-4)",
                        backgroundColor: "var(--ABPink-700, #B72A71)",
                      }}
                    >
                      Fremhevet
                    </Tag>
                  )}
                </HStack>
                {/* TODO: [endringslogg] Set correct border color on tag, '--ABPink-700' is undefined */}
                {/* TODO: [endringslogg] Ensure proper wrapping on mobile */}
                {/* TODO: [endringslogg] Ensure slimmer margins on mobile */}
                {/* TODO: [endringslogg] Hide lower part of log-entry and show 'Vis mer'-button when height>400px? */}
                {/* TODO: [endringslogg] Add proper styling to 'fremhevet' */}
                <VStack
                  style={{
                    marginBottom: "var(--ax-space-64)",
                    ...(item.fremhevet
                      ? {
                          padding: "var(--ax-space-16)",
                          border: "2px solid var(--ABPink-700, #B72A71)",
                          borderRadius: "var(--ax-radius-12)",
                          "--ax-text-brand-blue": "var(--ABPink-1000, #4E082D)",
                        }
                      : {}),
                  }}
                  data-theme="fremhevet"
                >
                  <Heading size="large" level="2" spacing>
                    <Link
                      href={`/grunnleggende/endringslogg/${item.slug.current}`}
                      data-aksel-heading-color
                    >
                      {item.heading}
                    </Link>
                  </Heading>
                  {item.fremhevet && item.herobilde && (
                    <>
                      <Bilde
                        value={{ ...item.herobilde }}
                        index={0} // Replace with the appropriate index if available
                        isInline={false} // Adjust based on your use case
                        renderNode={() => null} // Provide a proper renderNode function if needed
                      />
                      {/* <img
                        className="rounded-[--ax-radius-12]"
                        // TODO: [endringslogg] Probably add herobilde.alt to sanity schema
                        alt={item.herobilde.alt}
                        loading="lazy"
                        decoding="async"
                        src={urlForImage(item.herobilde)?.auto("format").url()}
                      /> */}
                      <Image
                        className="aspect-[1200/630] rounded-[--ax-radius-12] bg-[--ABPink-700,#B72A71] ring-1 ring-[--ax-border-neutral-subtle]"
                        alt={item.herobilde.alt}
                        loading="lazy"
                        decoding="async"
                        src={
                          urlForImage(item.herobilde)?.auto("format").url() ||
                          ""
                        }
                        width={1200}
                        height={630}
                      />
                    </>
                  )}

                  <CustomPortableText
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
