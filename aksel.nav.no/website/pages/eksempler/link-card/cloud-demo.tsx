import { HStack, LinkCard } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="space-16" maxWidth="800px">
      <CardDemo title="Sykepenger" />
      <CardDemo title="Svangerskapspenger" />
      <CardDemo title="Forsikring - sykepenger" />
      <CardDemo title="Frivillig yrkesskadetrygd" />
      <CardDemo title="Arbeidsavklarings­penger (AAP)" />
      <CardDemo title="Dekking av sykepenger i arbeidsgiverperioden" />
      <CardDemo title="Uføretrygd" />
      <CardDemo title="Helse, livsstil og sykdom" />
      <CardDemo title="Fastlegen din" />
    </HStack>
  );
};

function CardDemo({ title }: { title: string }) {
  return (
    <LinkCard>
      <LinkCard.Title>
        <LinkCard.Anchor href="/eksempel">{title}</LinkCard.Anchor>
      </LinkCard.Title>
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
  index: 13,
};
