import { Search } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <form>
      <Search label="Søk alle NAV sine sider" variant="secondary">
        <Search.Button type="button" />
      </Search>
    </form>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
  desc: "Children kan erstatte knapp hvis man trenger eget ikon eller 'type'-prop",
};

export const args = {
  index: 8,
};
