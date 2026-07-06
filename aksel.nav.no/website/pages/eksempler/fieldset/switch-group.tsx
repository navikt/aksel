import { Fieldset, Switch } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Fieldset legend="Hvordan ønsker du å bli varslet?">
      <div>
        <Switch>E-post</Switch>
        <Switch>SMS</Switch>
        <Switch>Push-varsel i appen</Switch>
        <Switch>Røyksignal</Switch>
      </div>
    </Fieldset>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 2,
  desc: "OBS 1: Switch skal ikke brukes i skjemaer ([se dokumentasjon](/komponenter/core/switch)). OBS 2: Ved bruk av `error`-propen på Fieldset må feilmeldingen knyttes til Switch-ene manuelt med `aria-describedby`.",
};
