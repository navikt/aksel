import { Search } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <form role="search">
      <Search
        label="Søk alle NAV sine sider"
        description="Her kan du søke på forskjellige ting, f.eks. søknadsskjemaer."
        variant="secondary"
        hideLabel={false}
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
  index: 4,
  desc: "Vi har valgt å sette label som default skjult i søkfeltet. Dette kan lett endres på med prop `hideLabel`.",
};
