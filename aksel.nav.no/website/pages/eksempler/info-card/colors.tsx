import { InfoCard, VStack } from "@navikt/ds-react";
import type { AkselColor } from "@navikt/ds-react/types/theme";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <AlertColorExample data-color="accent" />
      <AlertColorExample data-color="neutral" />
      <AlertColorExample data-color="brand-beige" />
      <AlertColorExample data-color="brand-blue" />
      <AlertColorExample data-color="brand-magenta" />
      <AlertColorExample data-color="info" />
      <AlertColorExample data-color="success" />
      <AlertColorExample data-color="warning" />
      <AlertColorExample data-color="danger" />
      <AlertColorExample data-color="meta-purple" />
      <AlertColorExample data-color="meta-lime" />
    </VStack>
  );
};

function AlertColorExample({
  "data-color": color,
}: {
  "data-color": AkselColor;
}) {
  return (
    <InfoCard data-color={color}>
      <InfoCard.Header>
        <InfoCard.Title>Infocard med fargen: {color}</InfoCard.Title>
      </InfoCard.Header>
      <InfoCard.Content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur saepe
        magnam deleniti, natus autem aut voluptatum.
      </InfoCard.Content>
    </InfoCard>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "InfoCard kommer i to størrelser: medium og small.",
};
