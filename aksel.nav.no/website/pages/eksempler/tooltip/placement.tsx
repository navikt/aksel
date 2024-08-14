import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@navikt/aksel-icons";
import { Button, Tooltip } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div className="grid gap-4">
      <Tooltip content="Skriv ut dokument" describesChild>
        <Button icon={<ArrowUpIcon aria-hidden />} />
      </Tooltip>
      <Tooltip content="Skriv ut dokument" placement="right" describesChild>
        <Button icon={<ArrowRightIcon aria-hidden />} />
      </Tooltip>
      <Tooltip content="Skriv ut dokument" placement="bottom" describesChild>
        <Button icon={<ArrowDownIcon aria-hidden />} />
      </Tooltip>
      <Tooltip content="Skriv ut dokument" placement="left" describesChild>
        <Button icon={<ArrowLeftIcon aria-hidden />} />
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
