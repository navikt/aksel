import { HGrid, Hide } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";
import { Placeholder } from "../../../components/website-modules/examples/__parts/ShowHidePlaceholder";

const Example = () => {
  return (
    <HGrid columns={2} gap="4">
      <Placeholder text="Alltid synlig" />
      <Hide below="md" asChild>
        <Placeholder desktop text="Jeg forsvinner på mobil" />
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
  index: 0,
  desc: "Endre størrelsen på eksempelvinduet for å se komponenten i aksjon. [Les mer om asChild her](https://aksel.nav.no/grunnleggende/kode/layout-primitives#613715c234c8).",
};
