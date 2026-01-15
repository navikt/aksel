import { useState } from "react";
import { Pagination, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [pageState, setPageState] = useState(2);
  return (
    <VStack gap="space-48" align="center">
      <Pagination
        page={pageState}
        onPageChange={setPageState}
        count={9}
        boundaryCount={1}
        siblingCount={1}
      />
      <Pagination
        page={pageState}
        onPageChange={setPageState}
        count={9}
        boundaryCount={1}
        siblingCount={1}
        size="small"
      />
      <Pagination
        page={pageState}
        onPageChange={setPageState}
        count={9}
        boundaryCount={1}
        siblingCount={1}
        size="xsmall"
      />
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
  index: 0,
  desc: "Komponenten finnes i størrelsene medium, small og xsmall.",
};
