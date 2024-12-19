import { List } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <List
      title="Vilkår for erstatning"
      description="Alle vilkårene må være oppfylt."
    >
      <List.Item>Nav må ha gjort en feil og ha et ansvar for feilen.</List.Item>
      <List.Item>
        Du må ha hatt et økonomisk eller ikke-økonomisk tap.
      </List.Item>
      <List.Item>
        Det må være en direkte sammenheng mellom Nav sitt ansvar og det
        økonomiske tapet ditt.
      </List.Item>
    </List>
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
};
