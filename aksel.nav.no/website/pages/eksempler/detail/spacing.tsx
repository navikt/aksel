import { withDsExample } from "@/web/examples/withDsExample";
import { Detail } from "@navikt/ds-react";

const Example = () => {
  const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

  return (
    <div>
      <Detail spacing>{lorem}</Detail>
      <Detail spacing>{lorem}</Detail>
    </div>
  );
};

export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
