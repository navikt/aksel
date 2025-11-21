import { LocalAlert } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <LocalAlert status="success">
      <LocalAlert.Header>
        <LocalAlert.Title>Endringene er lagret</LocalAlert.Title>
      </LocalAlert.Header>
      <LocalAlert.Content>
        Suksess bekrefter at en oppgave er fullført som forventet. Eksempelvis
        at en søknad er sendt inn eller at endringer er lagret.
      </LocalAlert.Content>
    </LocalAlert>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
