import { InfoCard } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <InfoCard data-color="info">
      <InfoCard.Header>
        <InfoCard.Title>Fremhevet statisk informasjon</InfoCard.Title>
      </InfoCard.Header>
      <InfoCard.Content>
        InfoCard brukes for å fremheve informasjon på en side, uten at det er
        like kritisk som en alert.
      </InfoCard.Content>
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
  index: 0,
};
