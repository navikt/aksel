import { ToggleGroup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <ToggleGroup defaultValue="lest" onChange={console.log} size="small">
      <ToggleGroup.Item value="ulest">Ulest</ToggleGroup.Item>
      <ToggleGroup.Item value="lest">Lest</ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>
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
