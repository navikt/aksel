import { Search } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <form role="search">
      <Search label="Søk i alle Nav sine sider" variant="simple" />
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
  index: 2,
  desc: "Simple er en forenklet variant av søkefeltet uten søkeknapp. Den brukes særlig på input-felter der innholdet blir oppdatert fortløpende eller ved autocomplete med dropdown.",
};
