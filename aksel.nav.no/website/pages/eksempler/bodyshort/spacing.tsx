import { BodyShort } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <>
      <BodyShort spacing>{lorem}</BodyShort>
      <BodyShort spacing>{lorem}</BodyShort>
    </>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Propen 'spacing' legger til mellomrom under avsnittet. Avstanden varierer avhengig av 'size'.",
};
