import { useState } from "react";
import { Pagination, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [pageState, setPageState] = useState(2);
  return (
    <VStack gap="12">
      <Pagination
        page={pageState}
        onPageChange={setPageState}
        count={9}
        boundaryCount={1}
        siblingCount={1}
        aria-label="Paginering medium"
      />

      <Pagination
        size="small"
        page={pageState}
        onPageChange={setPageState}
        count={9}
        boundaryCount={1}
        siblingCount={1}
        aria-label="Paginering small"
      />

      <Pagination
        size="xsmall"
        page={pageState}
        onPageChange={setPageState}
        count={9}
        boundaryCount={1}
        siblingCount={1}
        aria-label="Paginering xsmall"
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
