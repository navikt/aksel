import { withDsExample } from "@/web/examples/withDsExample";
import { Search } from "@navikt/ds-react";

const Example = () => {
  return (
    <form>
      <Search
        label="Søk alle NAV sine sider"
        variant="secondary"
        size="small"
      />
    </form>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
