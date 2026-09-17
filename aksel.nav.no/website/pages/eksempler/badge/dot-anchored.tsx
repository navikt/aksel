import { BellIcon } from "@navikt/aksel-icons";
import { Button, HStack } from "@navikt/ds-react";
import { Badge } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack align="center" gap="space-6">
      <Badge>
        <Button
          variant="secondary"
          aria-label="Uleste meldinger"
          icon={<BellIcon aria-hidden />}
        />
      </Badge>
    </HStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 3,
  desc: "",
};
