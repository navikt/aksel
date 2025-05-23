import { BodyLong, Heading } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <Heading size="medium" spacing>
        Minstebeløp for å søke
      </Heading>
      <BodyLong>Utgiftene må være over 1 880 kroner for å kunne søke.</BodyLong>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Propen 'spacing' legger til mellomrom under overskriften. Avstanden varierer avhengig av 'size'.",
};
