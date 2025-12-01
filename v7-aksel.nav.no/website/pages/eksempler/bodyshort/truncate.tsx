import { BodyShort } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div style={{ maxWidth: "300px" }}>
      <BodyShort truncate>
        Du må gjøre en filtrering for å se brukere i listen.
      </BodyShort>
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
  index: 2,
  desc: "'truncate' gjør at teksten kuttes ved enden av første linje. Pass på så du ikke gjemmer viktig informasjon som man ikke kan finne andre steder.",
};
