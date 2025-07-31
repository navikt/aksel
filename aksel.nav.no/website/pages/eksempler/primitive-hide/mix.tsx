import { HGrid, Hide, Show } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";
import { Placeholder } from "../../../components/website-modules/examples/__parts/ShowHidePlaceholder";

const Example = () => {
  return (
    <HGrid columns={2} gap="4">
      <Show below="md" asChild>
        <Placeholder mobil text="Synlig bare på mobil" />
      </Show>
      <Placeholder text="Alltid synlig" />
      <Hide below="md" asChild>
        <Placeholder desktop text="Synlig bare på desktop" />
      </Hide>
    </HGrid>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { showBreakpoints: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Vi anbelfaler konsistent bruk av 'above' og 'below' for bedre lesbarhet i koden.",
  sandbox: false,
};
