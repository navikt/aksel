import { BodyLong } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <BodyLong weight="semibold">
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
  index: 1,
};
