import { BandageIcon } from "@navikt/aksel-icons";
import { Box, LinkCard, Tag, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <CardDemo />
      <CardDemo />
      <CardDemo />
    </VStack>
  );
};

function CardDemo() {
  return (
    <LinkCard>
      <Box
        asChild
        borderRadius="12"
        padding="space-8"
        style={{ backgroundColor: "var(--ax-bg-moderateA)" }}
      >
        <LinkCard.Icon>
          <BandageIcon fontSize="2rem" />
        </LinkCard.Icon>
      </Box>
      <LinkCard.Title>
        <LinkCard.Anchor href="/eksempel">Sykepenger</LinkCard.Anchor>
      </LinkCard.Title>
      <LinkCard.Description>
        Erstatter inntekten din når du ikke kan jobbe på grunn av sykdom eller
        skade.
      </LinkCard.Description>
      <LinkCard.Footer>
        <Tag size="small" variant="neutral">
          Pengestøtte
        </Tag>
      </LinkCard.Footer>
    </LinkCard>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 12,
};
