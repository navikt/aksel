import { withDsExample } from "@/web/examples/withDsExample";
import {
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  PaperplaneIcon,
} from "@navikt/aksel-icons";
import { ToggleGroup } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="grid gap-4">
      <ToggleGroup defaultValue="lest" onChange={console.log}>
        <ToggleGroup.Item value="ulest">
          <EnvelopeClosedIcon title="ulest" />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="lest">
          <EnvelopeOpenIcon title="lest" />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="sendt">
          <PaperplaneIcon title="sendt" />
        </ToggleGroup.Item>
      </ToggleGroup>
      <ToggleGroup defaultValue="lest" onChange={console.log} variant="neutral">
        <ToggleGroup.Item value="ulest">
          <EnvelopeClosedIcon title="ulest" />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="lest">
          <EnvelopeOpenIcon title="lest" />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="sendt">
          <PaperplaneIcon title="sendt" />
        </ToggleGroup.Item>
      </ToggleGroup>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
