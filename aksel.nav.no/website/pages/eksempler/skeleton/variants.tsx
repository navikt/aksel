import { withDsExample } from "@/web/examples/withDsExample";
import { Skeleton } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="grid w-48 gap-2">
      {/* variant="text" kan endre størelse med justering av font-size */}
      <Skeleton variant="text" width="60%" />

      {/* For alle andre varianter må width og height brukes */}
      <Skeleton variant="circle" width={60} height={60} />
      <Skeleton variant="rectangle" width="100%" height={30} />
      <Skeleton variant="rounded" width="100%" height={40} />
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
