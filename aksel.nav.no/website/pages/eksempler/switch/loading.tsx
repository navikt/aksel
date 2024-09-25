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
  desc: "'loading'-prop bør bare brukes for korte lastetider. Ved lengre lastetid bør brukeren [informeres om hva som foregår](https://aksel.nav.no/komponenter/core/loader#ba471ad4389c).",
};
