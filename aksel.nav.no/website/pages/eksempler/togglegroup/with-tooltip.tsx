import {
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  PaperplaneIcon,
} from "@navikt/aksel-icons";
import { ToggleGroup, Tooltip } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <ToggleGroup defaultValue="lest" onChange={console.info}>
      <Tooltip content="Uleste meldinger">
        <ToggleGroup.Item
          value="ulest"
          icon={<EnvelopeClosedIcon aria-hidden />}
        />
      </Tooltip>
      <Tooltip content="Leste meldinger">
        <ToggleGroup.Item
          value="lest"
          icon={<EnvelopeOpenIcon aria-hidden />}
        />
      </Tooltip>
      <Tooltip content="Sendte meldinger">
        <ToggleGroup.Item value="sendt" icon={<PaperplaneIcon aria-hidden />} />
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
  index: 6,
};
