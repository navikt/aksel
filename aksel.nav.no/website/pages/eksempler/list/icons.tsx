import {
  BabyChangingRoom,
  Braille,
  Cognition,
  Refresh,
} from "@navikt/ds-icons";
import { List } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <List>
      <List.Item icon={<Braille aria-hidden />}>
        Blinkende innhold. Vi vil ikke gi brukerne våre anfall.
      </List.Item>
      <List.Item icon={<Cognition aria-hidden />}>
        Kritiske problemer og problemer med høye barrierer på innhold med høy
        effekt.
      </List.Item>
      <List.Item icon={<BabyChangingRoom aria-hidden />}>
        Middels barrierer på innhold med høy effekt.
      </List.Item>
      <List.Item icon={<Refresh aria-hidden />}>
        Middels barrierer på innhold med middels effekt.
      </List.Item>
    </List>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  desc: "Husk å sette aria-hidden på ikonet.",
};
