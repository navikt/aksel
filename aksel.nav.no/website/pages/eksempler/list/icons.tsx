import {
  ChevronDownCircleIcon,
  ChevronUpCircleIcon,
  ChevronUpDoubleCircleIcon,
  ExclamationmarkTriangleIcon,
} from "@navikt/aksel-icons";
import { List } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <List>
      <List.Item
        title="Kritisk"
        icon={<ExclamationmarkTriangleIcon aria-hidden />}
      >
        dette er problemer som må løses så fort som mulig. De hindrer bruk av
        siden og kan i verste fall være farlig for bruker.
      </List.Item>
      <List.Item title="Høy" icon={<ChevronUpDoubleCircleIcon aria-hidden />}>
        brukere er forhindret i å forstå innholdet eller utføre kritiske
        oppgaver, og det finnes ingen alternative løsninger.
      </List.Item>
      <List.Item title="Medium" icon={<ChevronUpCircleIcon aria-hidden />}>
        vanskelige, tidkrevende eller frustrerende for brukere å få tilgang til
        innhold eller funksjonalitet.
      </List.Item>
      <List.Item title="Lav" icon={<ChevronDownCircleIcon aria-hidden />}>
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
  desc: "Husk å sette aria-hidden på ikonet.",
};
