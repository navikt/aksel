import { withDsExample } from "@/web/examples/withDsExample";
import {
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  PaperplaneIcon,
} from "@navikt/aksel-icons";
import { ToggleGroup, Tooltip } from "@navikt/ds-react";

const Example = () => {
  return (
    <ToggleGroup defaultValue="lest" onChange={console.log}>
      <Tooltip content="Uleste meldinger">
        <ToggleGroup.Item value="ulest">
          <EnvelopeClosedIcon title="ulest" />
        </ToggleGroup.Item>
      </Tooltip>
      <Tooltip content="Leste meldinger">
        <ToggleGroup.Item value="lest">
          <EnvelopeOpenIcon title="lest" />
        </ToggleGroup.Item>
      </Tooltip>
      <Tooltip content="Sendte meldinger">
        <ToggleGroup.Item value="sendt">
          <PaperplaneIcon title="sendt" />
        </ToggleGroup.Item>
      </Tooltip>
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
  index: 5,
};
