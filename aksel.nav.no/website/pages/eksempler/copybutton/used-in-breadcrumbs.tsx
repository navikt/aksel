import { CopyButton, HStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="1" align="center">
      <span>Flere statsborgerskap: Norge, Danmark, Finland</span>
      <span>/</span>
      <HStack gap="1" align="center">
        1709230141 <CopyButton size="small" copyText="1709230141" />
      </HStack>
      <span>/</span>
      <span>Gift</span>
    </HStack>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 9,
  desc: "CopyButton kan eksempelvis inlines i breadcrumbs for kopi av fødselsnummer.",
};
