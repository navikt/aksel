import { Search } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <form role="search">
      <Search
        label="Søk i alle Nav sine sider"
        variant="secondary"
        size="small"
      />
    </form>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Small brukes på interne flater der det er behov for et mer komprimert grensesnitt. Small passer også i tilknytning til en komponent, for eksempel til filtrering av data i en tabell.",
};
