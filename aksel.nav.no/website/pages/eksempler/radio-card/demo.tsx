import { RadioCard, RadioCardGroup } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const handleChange = (val: string) => console.info(val);

  return (
    <RadioCardGroup
      legend="Hva slags lønn får du fra fisket?"
      description="Dette gjelder også provisjon og andre tillegg."
      onChange={handleChange}
    >
      <RadioCard
        value="lott"
        description="Du får betalt ut fra hva fartøyet fanger - ikke fast lønn"
      >
        Lott - andel av fangsten
      </RadioCard>
      <RadioCard
        value="hyre"
        description="Du får fast lønn fra arbeidsgiveren din, som en vanlig ansatt"
      >
        Hyre - fast lønn
      </RadioCard>
      <RadioCard value="begge" description="Du får både fast hyre og lott">
        Både lott og hyre
      </RadioCard>
    </RadioCardGroup>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 0,
};
