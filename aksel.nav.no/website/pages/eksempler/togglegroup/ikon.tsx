import { Email, EmailOpened, Send } from "@navikt/ds-icons";
import { ToggleGroup } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="grid gap-4">
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
      <ToggleGroup defaultValue="lest" onChange={console.log} variant="neutral">
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
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 4,
};
