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
    <div style={{ width: "300px" }}>
      <div id="loading">Laster innhold</div>
      <ProgressBar value={value} aria-labelledby="loading" />
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
