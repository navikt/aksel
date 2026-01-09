import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Bleed, Box, HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-24" align="start">
      <HStack gap="space-8" align="center">
        Med
        <Box
          paddingBlock="space-4"
          paddingInline="space-8"
          background="neutral-moderate"
          borderRadius="full"
        >
          <Bleed marginBlock="space-1 space-0" asChild>
            <MagnifyingGlassIcon aria-hidden fontSize="1.25rem" />
          </Bleed>
        </Box>
      </HStack>
      <HStack gap="space-8" align="center">
        Uten
        <Box
          paddingBlock="space-4"
          paddingInline="space-8"
          background="neutral-moderate"
          borderRadius="full"
        >
          <MagnifyingGlassIcon aria-hidden fontSize="1.25rem" />
        </Box>
      </HStack>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
  desc: "Noen ganger er det den ene pixelen som skal til for å optisk sentrere elementer.",
};
