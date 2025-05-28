import { Search } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <form role="search">
      <Search label="Søk i alle Nav sine sider" variant="secondary">
        <Search.Button type="button" />
      </Search>
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
  index: 8,
  desc: "Children kan erstatte knapp hvis man f.eks. trenger eget ikon eller 'type'-prop.",
};
