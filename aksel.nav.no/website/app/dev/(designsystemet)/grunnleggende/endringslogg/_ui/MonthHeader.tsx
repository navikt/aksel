import { CalendarIcon } from "@navikt/aksel-icons";
import { Box, HStack, Heading, VStack } from "@navikt/ds-react";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default ({ logEntry, index }) => {
  return (
    // Monthly additinal header
    // TODO: [endringslogg] Sticky example: aksel.nav.no/website/components/website-modules/search/parts/HitCollection.tsx#L78
    <li
      key={index + "-month-header"}
      style={{
        flexWrap: "nowrap",
        position: "sticky",
        top: "calc(var(--website-header-height))",
        paddingTop: "var(--ax-space-12)",
        background: "linear-gradient(var(--ax-bg-default) 80%, transparent)",
        zIndex: 1,
      }}
    >
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
              new Date(logEntry.endringsdato).toLocaleDateString("NO", {
                month: "long",
              }),
            )}{" "}
            {new Date(logEntry.endringsdato).getFullYear()}
          </Heading>
        </VStack>
      </HStack>
      {/* Spacing + vertical line */}
      {/* <VStack width="48px" height="var(--ax-space-32)" align="center">
        <Box.New
          width="0px"
          height="1rem"
          flexGrow="1"
          style={{
            borderLeft: "1px dashed var(--ax-border-neutral-subtle)",
          }}
        />
      </VStack> */}
    </li>
  );
};
