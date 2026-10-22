import { CheckboxCard, CheckboxCardGroup } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <CheckboxCardGroup
      legend="Hvilke inntekter har du fra fisket?"
      description="Velg alle som gjelder deg."
      value={["lott", "hyre"]}
      readOnly
    >
      <CheckboxCard
        value="lott"
        description="Du får betalt ut fra hva fartøyet fanger - ikke fast lønn"
      >
        Lott - andel av fangsten
      </CheckboxCard>
      <CheckboxCard
        value="hyre"
        description="Du får fast lønn fra arbeidsgiveren din, som en vanlig ansatt"
      >
        Hyre - fast lønn
      </CheckboxCard>
      <CheckboxCard
        value="provisjon"
        description="Du får tillegg basert på salg eller fangstmengde"
      >
        Provisjon
      </CheckboxCard>
    </CheckboxCardGroup>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 98,
  desc: "Readonly-attributtet gjør at valgene ikke kan endres, men brukere vil fortsatt kunne markere og kopiere teksten. Til forskjell fra disabled vil brukere også kunne tabbe til det, og feltet vil inkluderes når skjemaet sendes inn.",
};
