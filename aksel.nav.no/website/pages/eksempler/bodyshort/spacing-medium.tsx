import { withDsExample } from "@/web/examples/withDsExample";
import { BodyShort } from "@navikt/ds-react";

const Example = () => {
  const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <div>
      <BodyShort spacing>{lorem}</BodyShort>
      <BodyShort spacing>{lorem}</BodyShort>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
