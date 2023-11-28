import { withDsExample } from "@/web/examples/withDsExample";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@navikt/aksel-icons";
import { Button, Tooltip } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="grid gap-4">
      <Tooltip content="Skriv ut dokument">
        <Button icon={<ArrowUpIcon title="demo knapp" />} />
      </Tooltip>
      <Tooltip content="Skriv ut dokument" placement="right">
        <Button icon={<ArrowRightIcon title="demo knapp" />} />
      </Tooltip>
      <Tooltip content="Skriv ut dokument" placement="bottom">
        <Button icon={<ArrowDownIcon title="demo knapp" />} />
      </Tooltip>
      <Tooltip content="Skriv ut dokument" placement="left">
        <Button icon={<ArrowLeftIcon title="demo knapp" />} />
      </Tooltip>
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
  index: 3,
};
