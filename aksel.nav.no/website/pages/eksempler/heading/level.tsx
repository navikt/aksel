import { Heading } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <Heading level="3" size="medium">
        Dette er en &lt;h3&gt;
      </Heading>
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
  index: 2,
  desc: "Propen 'level' bestemmer hvilken h-tagg som brukes. Du kan sette 'size' uavhengig av dette, men størrelsen bør samsvare med nivået.",
};
