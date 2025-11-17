import { InfoCard, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <InfoCard data-color="info">
        <InfoCard.Header>
          <InfoCard.Title>Fremhevet informasjon om noe på siden</InfoCard.Title>
        </InfoCard.Header>
        <InfoCard.Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          saepe magnam deleniti, natus autem aut voluptatum.
        </InfoCard.Content>
      </InfoCard>
      <InfoCard data-color="info" size="small">
        <InfoCard.Header>
          <InfoCard.Title>Fremhevet informasjon om noe på siden</InfoCard.Title>
        </InfoCard.Header>
        <InfoCard.Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          saepe magnam deleniti, natus autem aut voluptatum.
        </InfoCard.Content>
      </InfoCard>
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
  index: 4,
  desc: "InfoCard kommer i to størrelser: medium og small.",
};
