import { Switch } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return <Switch loading>Varsle med SMS</Switch>;
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 8,
  desc: "'loading'-prop bør bare brukes for korte lastetider. Ved lengre lastetid bør brukeren bli informert om hva som tar tid/foregår i bakgrunnen mens de venter.",
};
