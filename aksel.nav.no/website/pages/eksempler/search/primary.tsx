import { Search } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <search>
      <Search label="Søk i alle Nav sine sider" variant="primary" />
    </search>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 1,
  desc: "Primary brukes der søk er hovedfunksjon, f.eks. ved globalt søk. Merk at det som regel bare skal finnes ett primary søk på en og samme side.",
};
