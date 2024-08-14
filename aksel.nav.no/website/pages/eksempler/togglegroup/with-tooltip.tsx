import {
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  PaperplaneIcon,
} from "@navikt/aksel-icons";
import { ToggleGroup, Tooltip } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <ToggleGroup defaultValue="lest" onChange={console.log}>
      <Tooltip content="Uleste meldinger" describesChild>
        <ToggleGroup.Item
          value="ulest"
          icon={<EnvelopeClosedIcon aria-hidden />}
        />
      </Tooltip>
      <Tooltip content="Leste meldinger" describesChild>
        <ToggleGroup.Item
          value="lest"
          icon={<EnvelopeOpenIcon aria-hidden />}
        />
      </Tooltip>
      <Tooltip content="Sendte meldinger" describesChild>
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
  desc: "For ToggleGroup uten label med Tooltip bør du bruke 'describesChild'-prop på Tooltip.",
};
