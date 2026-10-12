import { HGrid } from "@navikt/ds-react";
import { RadioCard, RadioCardGroup } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <RadioCardGroup legend="Har du barn under 18 år?">
      <HGrid columns={{ xs: 1, md: 2 }}>
        <RadioCard value="ja">Ja</RadioCard>
        <RadioCard value="nei">Nei</RadioCard>
      </HGrid>
    </RadioCardGroup>
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
  desc: "Bruk `HGrid` for å plassere kortene horisontalt. Egner seg best for få alternativer med korte tekster, som ja/nei-spørsmål. Du trenger ikke legge til eget `gap`-prop for å få avstand mellom kortene.",
};
