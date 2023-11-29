import { withDsExample } from "@/web/examples/withDsExample";
import { Search } from "@navikt/ds-react";

const Example = () => {
  return (
    <form>
      <Search
        label="Hva er artikkelnummeret til denne varen?"
        description="Art.nr. finner du på varens produktside eller i katalogen."
        hideLabel={false}
        htmlSize="12"
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
  index: 5,
};
