import { InfoCard } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <InfoCard data-color="info">
      <InfoCard.Header>
        <InfoCard.Title>Fremhevet informasjon om noe på siden</InfoCard.Title>
      </InfoCard.Header>
    </InfoCard>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: "For korte meldinger kan man velge å kun vise tittel i InfoCard. Title er en `h2`-tagg som standard, husk å justere semantikken etter behov.",
};
