import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Box, HStack, Skeleton } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box
      paddingBlock="space-16"
      paddingInline="space-20"
      borderRadius="xlarge"
      borderWidth="1"
      style={{
        border:
          "1px solid var(--a-border-subtle, var(--ax-border-neutral-subtleA))",
      }}
    >
      <HStack gap="space-16">
        <Skeleton variant="rounded" width={50} height={50} />

        <div>
          <Box marginBlock="space-0 space-8">
            <HStack justify="space-between" align="center">
              <Skeleton variant="text" width={84} height={32} />
              <ArrowRightIcon
                aria-hidden
                fontSize="1.75rem"
                color="var(--a-text-subtle, var(--ax-text-neutral-subtle))"
                opacity={0.3}
              />
            </HStack>

            <Skeleton variant="text">
              lorem ipsum dolor sit amet consectetur adipisicing elit
            </Skeleton>
            <Skeleton variant="text">
              lorem ipsum dolor sit amet consectetur
            </Skeleton>
          </Box>
          <HStack gap="space-4">
            <Skeleton variant="text">Some tags</Skeleton>
            <Skeleton variant="text">Some tags</Skeleton>
          </HStack>
        </div>
      </HStack>
    </Box>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { legacyOnly: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
