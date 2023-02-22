import { List } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <List as="ul" title="Vi bør fikse uu-issues i følgende rekkefølge:">
      <List.Item>
        Rammeverket, inkludert navigasjon, påloggings- og søkefunksjoner
      </List.Item>
      <List.Item>Gjenbrukbare komponenter</List.Item>
      <List.Item>Nøkkelstier gjennom nettstedet</List.Item>
    </List>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
