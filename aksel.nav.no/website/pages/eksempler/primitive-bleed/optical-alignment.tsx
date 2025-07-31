import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Bleed, Box, HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="6" align="start">
      <HStack gap="2" align="center">
        Med
        <Box
          paddingBlock="1"
          paddingInline="2"
          background="surface-alt-3-subtle"
          borderRadius="full"
        >
          <Bleed marginBlock="px 0" asChild>
            <MagnifyingGlassIcon aria-hidden fontSize="1.25rem" />
          </Bleed>
        </Box>
      </HStack>

      <HStack gap="2" align="center">
        Uten
        <Box
          paddingBlock="1"
          paddingInline="2"
          background="surface-alt-3-subtle"
          borderRadius="full"
        >
          <MagnifyingGlassIcon aria-hidden fontSize="1.25rem" />
        </Box>
      </HStack>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { legacyOnly: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
  desc: "Noen ganger er det den ene pixelen som skal til for å optisk sentrere elementer.",
};
