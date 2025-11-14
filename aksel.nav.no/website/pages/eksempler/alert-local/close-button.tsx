import { LocalAlert } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <LocalAlert status="announcement">
      <LocalAlert.Header>
        <LocalAlert.Title>
          Systemet vil være utilgjengelig for vedlikehold natt til søndag
          (01.01)
        </LocalAlert.Title>
        <LocalAlert.Close onClick={() => alert("Lukket alert")} />
      </LocalAlert.Header>
      <LocalAlert.Content>
        Kunngjøringer brukes for å formidle noe om appen eller systemet, eller
        endringer som påvirker brukerne. Eksempelvis planlagt vedlikehold eller
        driftsmeldinger.
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
  index: 6,
  desc: "Bruk `LocalAlert.Close` for å legge til en lukkeknapp i alerten. Du må selv håndtere lukke-logikken.",
};
