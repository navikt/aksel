import { LinkCard, Tag } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <LinkCard>
      <LinkCard.Title as="h2">
        <LinkCard.Anchor href="/eksempel">
          Sykepenger (dette er nå et h2-element)
        </LinkCard.Anchor>
      </LinkCard.Title>
      <LinkCard.Description>
        Erstatter inntekten din når du ikke kan jobbe på grunn av sykdom eller
        skade.
      </LinkCard.Description>
      <LinkCard.Footer>
        <Tag size="small">Pengestøtte</Tag>
      </LinkCard.Footer>
    </LinkCard>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 10,
  desc: "For viktige lenker kan det gi mening å bruker heading-elementer for å fremheve dem for skjermlesere og andre hjelpemidler. I dette eksempelet er tittelen på LinkCard satt til et h2-element.",
};
