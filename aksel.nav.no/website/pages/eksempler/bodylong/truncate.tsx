import { BodyLong } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <BodyLong truncate>
      Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til
      barnebidrag fra en eller begge foreldre mens du fullfører videregående
      skole eller tilsvarende.
    </BodyLong>
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
