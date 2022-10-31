import { Search } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <form>
      <Search label="Søk alle NAV sine sider" variant="simple" />
    </form>
  );
};

export default withDsExample(Example);

export const args = {
  index: 2,
};
