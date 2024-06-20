import { useState } from "react";
import { Pagination } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [pageState, setPageState] = useState(2);
  return (
    <div>
      <Pagination
        page={pageState}
        onPageChange={setPageState}
        count={9}
        boundaryCount={1}
        siblingCount={1}
        srHeading={{
          tag: "h2",
          text: "Tabellpaginering",
        }}
      />
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
  index: 2,
  desc: "For å gjøre det lettere for skjermlesere å navigere til Pagination, anbefaler vi å bruke `srHeading`-prop for å legge til en skjult heading. Husk å bruke riktig h-tag.",
};
