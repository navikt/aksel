import { Search } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <form data-theme="dark">
      <Search label="Søk alle NAV sine sider" variant="secondary" />
    </form>
  );
};

export default withDsExample(Example, "inverted");

export const args = {
  index: 6,
};
