import { List } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <List as="ul">
      <List.Item title="Kritiske">
        disse er problemer som må løses så fort som mulig—de hindrer folk i å
        bruke siden i det hele tatt og kan være direkte farlig.
      </List.Item>
      <List.Item title="Høy">
        brukere er forhindret i å forstå innholdet eller utføre kritiske
        oppgaver, og det finnes ingen forsvarsstrategier eller alternative
        løsninger.
      </List.Item>
      <List.Item title="Medium">
        det er vanskelig, tidkrevende eller frustrerende for brukere å få
        tilgang til innhold eller funksjonalitet.
      </List.Item>
      <List.Item title="Lav">
        brukeren få tilgang til alt innhold og funksjonalitet, men
        brukeropplevelsen er dårlig.
      </List.Item>
    </List>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
