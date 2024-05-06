import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React from "react";
import { ProgressBar } from ".";
import { VStack } from "../layout/stack";

export default {
  title: "ds-react/ProgressBar",
  component: ProgressBar,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof ProgressBar>;

type Story = StoryObj<typeof ProgressBar>;

export const Default: StoryFn = (args) => {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    const withRandomIntervals = (callback: () => void) => {
      const interval = Math.random() * 4000 + 500; // Random interval between 0.1-0.8 seconds
      return setTimeout(() => {
        callback();
        withRandomIntervals(callback);
      }, interval);
    };

    const intervalId = withRandomIntervals(() => {
      setValue((oldValue) => {
        if (oldValue === 100) return 0;
        const increment = Math.random() * 25 + 5; // Increase value 5-30 of 100
        return oldValue + increment > 100 ? 100 : oldValue + increment;
      });
    });

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div style={{ width: "400px" }}>
      {value < 100 ? (
        <>
          <p id="progress-bar-label">Laster</p>
          <ProgressBar
            valueMax={100}
            size={args.size}
            value={value}
            aria-labelledby="progress-bar-label"
            /* duration={args.indeterminate ? 0 : undefined} */
          />
        </>
      ) : (
        <p>Success screen successfully loaded 🎉</p>
      )}
    </div>
  );
};
Default.args = {
  size: "medium",
  indeterminate: false,
};
Default.argTypes = {
  size: {
    options: ["large", "medium", "small"],
    control: { type: "radio" },
  },
  indeterminate: {
    control: { type: "boolean" },
  },
};

export const Sizes: StoryFn = (args) => {
  return (
    <div>
      <p id="progress-bar-label-small">Fremdrift i søknaden (liten versjon)</p>
      <ProgressBar
        size="small"
        value={0}
        valueMax={args.valueMax}
        aria-labelledby="progress-bar-label-small"
      />
      <p id="progress-bar-label-medium">
        Fremdrift i søknaden (medium versjon)
      </p>
      <ProgressBar
        value={6}
        valueMax={args.valueMax}
        aria-labelledby="progress-bar-label-medium"
      />
      <p id="progress-bar-label-large">Fremdrift i søknaden (stor versjon)</p>
      <ProgressBar
        size="large"
        value={12}
        valueMax={args.valueMax}
        aria-labelledby="progress-bar-label-large"
      />
    </div>
  );
};

Sizes.args = {
  valueMax: 12,
};

/**
 * Duration is temp disabled due to potential API-updates
 */
export const IndeterminateState: Story = {
  render: () => {
    const values = [2, 5, 10, 20];
    return (
      <>
        <p id="progress-bar-label-immediate-indeterminate">
          Duration prop satt til 0 sek
        </p>
        <ProgressBar
          valueMax={100}
          /* duration={0} */
          size="medium"
          value={50}
          aria-labelledby="progress-bar-label-immediate-indeterminate"
        />
        {values.map((value) => (
          <div key={value}>
            <p id={`progress-bar-label-${value}`}>
              duration-prop satt til {value} sek
            </p>
            <ProgressBar
              valueMax={100}
              /* duration={value} */
              size="medium"
              value={value}
              aria-labelledby={`progress-bar-label-${value}`}
            />
          </div>
        ))}
      </>
    );
  },
};

export const Chromatic: Story = {
  render: () => {
    return (
      <VStack gap="4">
        <div>
          <Sizes {...Sizes.args} />
        </div>
      </VStack>
    );
  },
  parameters: {
    chromatic: { disable: false },
  },
};
