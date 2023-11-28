import { withDsExample } from "@/web/examples/withDsExample";
import { Pagination } from "@navikt/ds-react";
import { useState } from "react";

const Example = () => {
  const [pageState, setPageState] = useState(2);
  return (
    <Pagination
      page={pageState}
      onPageChange={(x) => setPageState(x)}
      count={9}
      boundaryCount={1}
      siblingCount={1}
    />
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
