import { withDsExample } from "@/web/examples/withDsExample";
import { Search } from "@navikt/ds-react";

const Example = () => {
  return (
    <form>
      <Search
        label="Søk alle NAV sine sider"
        variant="secondary"
        error="Søket må starte med xyz"
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
  index: 6,
};
