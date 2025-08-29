import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@navikt/aksel-icons";
import { Button, Tooltip, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <Tooltip content="Skriv ut dokument">
        <Button icon={<ArrowUpIcon aria-hidden />} />
      </Tooltip>
      <Tooltip content="Skriv ut dokument" placement="right">
        <Button icon={<ArrowRightIcon aria-hidden />} />
      </Tooltip>
      <Tooltip content="Skriv ut dokument" placement="bottom">
        <Button icon={<ArrowDownIcon aria-hidden />} />
      </Tooltip>
      <Tooltip content="Skriv ut dokument" placement="left">
        <Button icon={<ArrowLeftIcon aria-hidden />} />
      </Tooltip>
    </VStack>
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
