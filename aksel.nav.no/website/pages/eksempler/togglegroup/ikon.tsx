import { Email, EmailOpened, Send } from "@navikt/ds-icons";
import { ToggleGroup } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <ToggleGroup defaultValue="lest" onChange={console.log}>
      <ToggleGroup.Item value="ulest">
        <Email title="ulest" />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="lest">
        <EmailOpened title="lest" />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">
        <Send title="sendt" />
      </ToggleGroup.Item>
    </ToggleGroup>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
