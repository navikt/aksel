import { List } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <List as="ul">
      <List.Item title="Kritisk">
        dette er problemer som må løses så fort som mulig. De hindrer bruk av
        siden og kan i verste fall være farlig for bruker.
      </List.Item>
      <List.Item title="Høy">
        brukere er forhindret i å forstå innholdet eller utføre kritiske
        oppgaver, og det finnes ingen alternative løsninger.
      </List.Item>
      <List.Item title="Medium">
        vanskelige, tidkrevende eller frustrerende for brukere å få tilgang til
        innhold eller funksjonalitet.
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
