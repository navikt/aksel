import { BandageIcon } from "@navikt/aksel-icons";
import { Box, HGrid, LinkCard, Tag } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HGrid gap="space-16" columns="repeat(auto-fit, minmax(300px, 1fr))">
      <CardDemo />
      <CardDemo />
      <CardDemo />
    </HGrid>
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
  index: 11,
};
