import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <Button size="xsmall">xsmall</Button>;
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  desc: "Varianten xsmall er tilgjengelig for bruk i tabell eller interne løsninger. Bør brukes sparsomt om mulig da klikkflaten kan være problematisk, spesielt på mobil.",
};
