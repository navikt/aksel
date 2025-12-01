import { useState } from "react";
import { Pagination } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [pageState, setPageState] = useState(2);
  return (
    <Pagination
      page={pageState}
      onPageChange={(x) => setPageState(x)}
      count={9}
      boundaryCount={1}
      siblingCount={0}
      prevNextTexts
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
  index: 1,
  desc: "Ved å skru på propen 'prevNextTexts' får forrige- og neste-knappene synlig tekst i tillegg til chevron.",
};
