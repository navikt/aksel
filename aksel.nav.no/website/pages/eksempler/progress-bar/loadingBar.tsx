import React from "react";
import { ProgressBar } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [value, setValue] = React.useState(3);

  // This useEffect is used to simulate loading
  React.useEffect(() => {
    const setRandomInterval = (callback: () => void) => {
      const interval = Math.random() * 4000 + 500;
      return setTimeout(() => {
        callback();
        setRandomInterval(callback);
      }, interval);
    };
    const intervalId = setRandomInterval(() => {
      setValue((oldValue) => {
        if (oldValue === 100) return 3;
        const increment = Math.random() * 25 + 5;
        return oldValue + increment > 100 ? 100 : oldValue + increment;
      });
    });
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div id="loading-bar">Simulated loading bar</div>
      <ProgressBar value={value} aria-labelledby="loading-bar" />
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
};
