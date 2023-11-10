import { withDsExample } from "@/web/examples/withDsExample";
import { Heading, Skeleton } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="grid w-48 gap-2">
      <Skeleton variant="text" width="100%" />

      {/* 'as'-prop kan brukes på all typografien vår med Skeleton */}
      <Heading as={Skeleton} size="xlarge" width="100%">
        Placeholder
      </Heading>
      <div style={{ fontSize: "5rem" }}>
        <Skeleton variant="text" width="100%" />
      </div>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
