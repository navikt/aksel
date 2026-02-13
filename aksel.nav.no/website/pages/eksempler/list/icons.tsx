import {
  ChevronDownCircleIcon,
  ChevronUpCircleIcon,
  ChevronUpDoubleCircleIcon,
  ExclamationmarkTriangleIcon,
} from "@navikt/aksel-icons";
import { List } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <List>
      <List.Item icon={<ExclamationmarkTriangleIcon aria-hidden />}>
        Kritisk: Dette er problemer som må løses så fort som mulig. De hindrer
        bruk av siden og kan i verste fall være farlig for bruker.
      </List.Item>
      <List.Item icon={<ChevronUpDoubleCircleIcon aria-hidden />}>
        Høy: Brukere er forhindret i å forstå innholdet eller utføre kritiske
        oppgaver, og det finnes ingen alternative løsninger.
      </List.Item>
      <List.Item icon={<ChevronUpCircleIcon aria-hidden />}>
        Medium: Vanskelige, tidkrevende eller frustrerende for brukere å få
        tilgang til innhold eller funksjonalitet.
      </List.Item>
      <List.Item icon={<ChevronDownCircleIcon aria-hidden />}>
        Lav: Brukeren få tilgang til alt innhold og funksjonalitet, men
        brukeropplevelsen er dårlig.
      </List.Item>
    </List>
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
  desc: "Husk å sette `aria-hidden` på dekorative ikoner.",
};
