"use client";

import { CalendarIcon } from "@navikt/aksel-icons";
import {
  BodyShort,
  Box,
  HStack,
  Heading,
  Link,
  VStack,
} from "@navikt/ds-react";

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
  // console.dir(list);
  return (
    <ol style={{}}>
      {list.map((item, index) => (
        <li key={index}>
          {/* Monthly header */}
          {(index === 0 ||
            areDifferentMonths(
              item.endringsdato,
              list[index - 1].endringsdato,
            )) && (
            <>
              <HStack style={{ flexWrap: "nowrap" }}>
                {/* Calendar icon + vertical line */}
                <VStack width="48px" align="center">
                  <Box.New
                    width="48px"
                    height="48px"
                    borderWidth="1"
                    borderColor="neutral-subtle"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "100%",
                    }}
                  >
                    <CalendarIcon width={24} height={24} />
                  </Box.New>
                  <Box.New
                    width="0px"
                    flexGrow="1"
                    style={{
                      borderLeft: "1px dashed var(--ax-border-neutral-subtle)",
                    }}
                  />
                </VStack>
                {/* Month + year */}
                <VStack justify="center" paddingInline="space-12">
                  <Heading size="small">
                    {capitalizeFirstLetter(
                      new Date(item.endringsdato).toLocaleDateString("NO", {
                        month: "long",
                      }),
                    )}{" "}
                    {new Date(item.endringsdato).getFullYear()}
                  </Heading>
                </VStack>
              </HStack>
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
            </>
          )}
          {/* Entry header */}
          <HStack>
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
                  borderColor: "var(--ax-neutral-200)",
                  // borderColor: "var(--ax-border-neutral-subtle)",
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
            <VStack>
              <Box paddingInline="space-16">
                <BodyShort size="small" spacing textColor="subtle">
                  {capitalizeFirstLetter(item.endringstype)} •{" "}
                  {new Date(item.endringsdato).toLocaleDateString("NO", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </BodyShort>
                <Link href={`/grunnleggende/endringslogg/${item.slug.current}`}>
                  <Heading size="medium" level="2">
                    {item.heading}
                  </Heading>
                </Link>
                {/* {item.innhold.map((innhold, index) => (
                  {
                    innhold._type === "block" && (
                      <BodyLong
                        key={index}
                        size="medium"
                        marginBlock="space-8"
                        data-text-prose
                      >
                        {innhold.children[0].text}
                      </BodyLong>
                    )
                  }
                ))} */}
              </Box>
            </VStack>
          </HStack>
        </li>
      ))}
    </ol>
  );
};
