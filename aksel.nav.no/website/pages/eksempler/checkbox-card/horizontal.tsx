import { HGrid } from "@navikt/ds-react";
import { CheckboxCard, CheckboxCardGroup } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <CheckboxCardGroup legend="Hvordan vil du bli varslet?">
      <HGrid columns={{ xs: 1, md: 2 }}>
        <CheckboxCard value="sms">SMS</CheckboxCard>
        <CheckboxCard value="epost">E-post</CheckboxCard>
      </HGrid>
    </CheckboxCardGroup>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 1,
  desc: "Bruk `HGrid` for å plassere kortene horisontalt. Egner seg best for få alternativer med korte tekster. Du trenger ikke legge til eget `gap`-prop for å få avstand mellom kortene.",
};
