import { Heading, Skeleton } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <>
      {loaded ? (
        <span>Loaded</span>
      ) : (
        <div className="w-48">
          <Skeleton variant="circle" width={80} height={80} />
          <Heading as={Skeleton} size="large">
            Card-title
          </Heading>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
        </div>
      )}
    </>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
};

const loaded = false;
