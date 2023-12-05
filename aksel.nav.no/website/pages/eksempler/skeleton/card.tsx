import { Skeleton } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div className="shadow-xsmall w-56 rounded-lg p-6 ">
      <Skeleton variant="circle" width={60} height={60} />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
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
