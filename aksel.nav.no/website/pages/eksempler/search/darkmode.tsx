import { Search } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <form data-theme="dark">
      <Search label="Søk alle NAV sine sider" variant="secondary" />
    </form>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

export const args = {
  index: 7,
};
