import { Switch, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <Switch loading>Varsle med SMS</Switch>
      <Switch loading checked>
        Varsle med SMS
      </Switch>
    </VStack>
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
  desc: "'loading'-prop bør bare brukes for korte lastetider. Ved lengre lastetid bør brukeren [informeres om hva som foregår](https://aksel.nav.no/komponenter/core/loader#ba471ad4389c).",
};
