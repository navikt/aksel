import { withDsExample } from "@/web/examples/withDsExample";
import { Search } from "@navikt/ds-react";

const Example = () => {
  return (
    <form data-theme="dark">
      <Search label="Søk alle NAV sine sider" variant="secondary" />
    </form>
  );
};

export default withDsExample(Example, { variant: "full" });

export const args = {
  index: 7,
};
