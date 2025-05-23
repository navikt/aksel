import { Radio, RadioGroup, ReadMore } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <form>
      <RadioGroup
        legend="Kan du ta alle typer arbeid?"
        description="Hvis du har helsemessige begrensninger og ikke kan ta alle typer arbeid, vil vi ta hensyn til dette."
      >
        <Radio value={true}>Ja</Radio>
        <Radio value={false}>Nei</Radio>
      </RadioGroup>
      <ReadMore header="Dette regnes som helsemessige begrensninger">
        Med helsemessige begrensninger mener vi funksjonshemming, sykdom,
        allergier som hindrer deg i arbeidet eller andre årsaker som må tas
        hensyn til når du skal finne nytt arbeid. Du må oppgi hva som gjelder
        for deg, og dokumentere de helsemessige årsakene du viser til.
      </ReadMore>
    </form>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
