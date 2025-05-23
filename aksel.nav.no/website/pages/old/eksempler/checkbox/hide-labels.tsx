import { Checkbox } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Checkbox hideLabel value="car">
      Bil
    </Checkbox>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Label må være meningsfull selv om den skjules, siden den fortsatt leses av skjermlesere.",
};
