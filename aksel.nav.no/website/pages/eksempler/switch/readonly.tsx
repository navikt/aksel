import { Fieldset, Switch, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <Switch readOnly>Slå på notifikasjoner</Switch>
      <Switch readOnly checked>
        Slå på notifikasjoner
      </Switch>
      <Fieldset legend="Hvordan ønsker du å bli varslet?" readOnly>
        <Switch>E-post</Switch>
        <Switch defaultChecked>SMS</Switch>
      </Fieldset>
    </VStack>
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
  desc: "Readonly-attributtet gjør at tilstanden ikke kan endres. Til forskjell fra `disabled` vil brukere fortsatt kunne tabbe til feltet, og verdien vil inkluderes når skjemaet sendes inn. Sett `readOnly` på `Fieldset` for å låse hele gruppen på samme måte som radio.",
};
