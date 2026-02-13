import { List } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <List as="ol">
      <List.Item>
        Blinkende innhold. Vi vil ikke gi brukerne våre anfall.
      </List.Item>
      <List.Item>
        Kritiske problemer og problemer med høye barrierer for innhold med høy
        effekt.
      </List.Item>
      <List.Item>Middels barrierer på innhold med høy effekt.</List.Item>
      <List.Item>Middels barrierer på innhold med middels effekt.</List.Item>
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
  index: 3,
  desc: 'Du kan sette `as="ol"` for å få en nummerert liste.',
};
