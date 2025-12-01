import { Search } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <form data-theme="dark" role="search">
      <Search label="Søk i alle Nav sine sider" variant="secondary" />
    </form>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { background: "inverted" });

export const args = {
  index: 7,
};
