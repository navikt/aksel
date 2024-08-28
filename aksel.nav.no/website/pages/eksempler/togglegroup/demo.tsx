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
          icon={<EnvelopeClosedIcon aria-hidden />}
          label="Ulest"
        />
        <ToggleGroup.Item
          value="lest"
          icon={<EnvelopeOpenIcon aria-hidden />}
          label="Lest"
        />
        <ToggleGroup.Item
          value="sendt"
          icon={<PaperplaneIcon aria-hidden />}
          label="Sendt"
        />
      </ToggleGroup>
      <ToggleGroup
        defaultValue="lest"
        onChange={console.info}
        variant="neutral"
      >
        <ToggleGroup.Item
          value="ulest"
          icon={<EnvelopeClosedIcon aria-hidden />}
          label="Ulest"
        />
        <ToggleGroup.Item
          value="lest"
          icon={<EnvelopeOpenIcon aria-hidden />}
          label="Lest"
        />
        <ToggleGroup.Item
          value="sendt"
          icon={<PaperplaneIcon aria-hidden />}
          label="Sendt"
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
  index: 0,
};
