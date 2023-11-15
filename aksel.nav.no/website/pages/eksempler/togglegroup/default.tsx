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
          <EnvelopeClosedIcon aria-hidden />
          Ulest
        </ToggleGroup.Item>
        <ToggleGroup.Item value="lest">
          <EnvelopeOpenIcon aria-hidden />
          Leste
        </ToggleGroup.Item>
        <ToggleGroup.Item value="sendt">
          <PaperplaneIcon aria-hidden />
          Sendt
        </ToggleGroup.Item>
      </ToggleGroup>
      <ToggleGroup defaultValue="lest" onChange={console.log} variant="neutral">
        <ToggleGroup.Item value="ulest">
          <EnvelopeClosedIcon aria-hidden />
          Ulest
        </ToggleGroup.Item>
        <ToggleGroup.Item value="lest">
          <EnvelopeOpenIcon aria-hidden />
          Leste
        </ToggleGroup.Item>
        <ToggleGroup.Item value="sendt">
          <PaperplaneIcon aria-hidden />
          Sendt
        </ToggleGroup.Item>
      </ToggleGroup>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
