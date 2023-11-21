import { withDsExample } from "@/web/examples/withDsExample";
import { BodyShort } from "@navikt/ds-react";

const Example = () => {
  const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <div>
      <BodyShort size="large" spacing>
        {lorem}
      </BodyShort>
      <BodyShort size="large" spacing>
        {lorem}
      </BodyShort>
    </div>
  );
};

export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
