import { Email, EmailOpened, Send } from "@navikt/ds-icons";
import { ToggleGroup, Tooltip } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <ToggleGroup defaultValue="lest" onChange={console.log}>
      <Tooltip content="Uleste meldinger">
        <ToggleGroup.Item value="ulest">
          <Email title="ulest" />
        </ToggleGroup.Item>
      </Tooltip>
      <Tooltip content="Leste meldinger">
        <ToggleGroup.Item value="lest">
          <EmailOpened title="lest" />
        </ToggleGroup.Item>
      </Tooltip>
      <Tooltip content="Sendte meldinger">
        <ToggleGroup.Item value="sendt">
          <Send title="sendt" />
        </ToggleGroup.Item>
      </Tooltip>
    </ToggleGroup>
  );
};

export default withDsExample(Example);

export const args = {
  index: 5,
};
