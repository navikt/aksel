import React from "react";
import { ProgressBar } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [isIndeterminate, setIsIndeterminate] = React.useState(false);
  return (
    <div style={{ width: "300px" }}>
      <p id="indeterminate-working">Jobber med saken</p>
      <ProgressBar
        simulated={{
          seconds: 6,
          onTimeout: () => {
            console.info("Ferdig!");
            setIsIndeterminate(true);
          },
        }}
        aria-labelledby="indeterminate-working"
      />
      {isIndeterminate && <p>Oi, dette tok lenger tid en forventet!</p>}
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
  index: 3,
  desc: "Med simulated-propen kan man legge inn et anslag i sekunder, så simulerer komponenten progresjon.",
};
