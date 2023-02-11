import { Down, Left, Right, Up } from "@navikt/ds-icons";
import { Button, Tooltip } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="grid gap-4">
      <Tooltip content="Skriv ut dokument">
        <Button icon={<Up title="demo knapp" />} />
      </Tooltip>
      <Tooltip content="Skriv ut dokument" placement="right">
        <Button icon={<Right title="demo knapp" />} />
      </Tooltip>
      <Tooltip content="Skriv ut dokument" placement="bottom">
        <Button icon={<Down title="demo knapp" />} />
      </Tooltip>
      <Tooltip content="Skriv ut dokument" placement="left">
        <Button icon={<Left title="demo knapp" />} />
      </Tooltip>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
