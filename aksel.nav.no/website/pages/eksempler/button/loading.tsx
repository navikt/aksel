import { Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return <Button loading>Loading</Button>;
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
  desc: "[Les mer om loading states i retningslinjene til Loader-komponenten](/komponenter/core/loader#f92383e7d117)",
};
