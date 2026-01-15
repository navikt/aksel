import { Textarea } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return <Textarea label="Har du noen tilbakemeldinger?" maxLength={100} />;
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  desc: "Textarea kan vise antall gjenværende tegn som er tillatt å skrive inn. Tallet oppdateres mens brukeren skriver eller fjerner innhold. NB! Dette er bare en visuell indikator. Faktisk begrensning og validering må håndteres i kode.",
};
