import { ToggleGroup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <ToggleGroup defaultValue="lest" onChange={console.info}>
      <ToggleGroup.Item value="ulest" label="Ulest" />
      <ToggleGroup.Item value="lest" label="Lest" />
      <ToggleGroup.Item value="sendt" label="Sendt" />
    </ToggleGroup>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
