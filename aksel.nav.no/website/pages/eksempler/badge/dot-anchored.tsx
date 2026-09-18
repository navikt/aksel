import { BellIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { Badge } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Badge>
      <Button
        variant="secondary"
        title="Uleste meldinger"
        icon={<BellIcon aria-hidden />}
      />
    </Badge>
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
