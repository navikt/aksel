import { Email, EmailOpened, Send } from "@navikt/ds-icons";
import { ToggleGroup } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <ToggleGroup defaultValue="lest" onChange={console.log} size="small">
      <ToggleGroup.Item value="ulest">
        <Email aria-hidden />
        Ulest
      </ToggleGroup.Item>
      <ToggleGroup.Item value="lest">
        <EmailOpened aria-hidden />
        Leste
      </ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">
        <Send aria-hidden />
        Sendt
      </ToggleGroup.Item>
    </ToggleGroup>
  );
};

export default withDsExample(Example);

export const args = {
  index: 1,
};
