import {
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  PaperplaneIcon,
} from "@navikt/aksel-icons";
import { ToggleGroup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div className="grid gap-4">
      <ToggleGroup defaultValue="lest" onChange={console.info}>
        <ToggleGroup.Item
          value="ulest"
          icon={<EnvelopeClosedIcon title="Ulest" />}
        />
        <ToggleGroup.Item
          value="lest"
          icon={<EnvelopeOpenIcon title="Lest" />}
        />
        <ToggleGroup.Item
          value="sendt"
          icon={<PaperplaneIcon title="Sendt" />}
        />
      </ToggleGroup>
      <ToggleGroup
        defaultValue="lest"
        onChange={console.info}
        variant="neutral"
      >
        <ToggleGroup.Item
          value="ulest"
          icon={<EnvelopeClosedIcon title="Ulest" />}
        />
        <ToggleGroup.Item
          value="lest"
          icon={<EnvelopeOpenIcon title="Lest" />}
        />
        <ToggleGroup.Item
          value="sendt"
          icon={<PaperplaneIcon title="Sendt" />}
        />
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
