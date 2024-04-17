import { Meta, StoryObj } from "@storybook/react";
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

export const Default: Story = {
  render: () => {
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
        setValue(
          (oldValue) =>
            oldValue >= 100 ? 100 : oldValue + Math.random() * 25 + 5, // Increase value 5-30 of 100
        );
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
              valueMin={5}
              size="medium"
              value={value}
              aria-labelledby="progress-bar-label"
            />
          </>
        ) : (
          <p>Success screen successfully loaded 🎉</p>
        )}
      </div>
    );
  },
  args: {
    size: "medium",
    value: 66,
  },
  argTypes: {
    size: {
      options: ["large", "medium", "small"],
      control: { type: "radio" },
    },
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div>
        <p id="progress-bar-label-small">
          Fremdrift i søknaden (liten versjon)
        </p>
        <ProgressBar
          size="small"
          value={7}
          valueMax={12}
          valueMin={1}
          aria-labelledby="progress-bar-label-small"
        />
        <p id="progress-bar-label-medium">
          Fremdrift i søknaden (medium versjon)
        </p>
        <ProgressBar
          value={3}
          valueMax={12}
          valueMin={1}
          aria-labelledby="progress-bar-label-medium"
        />
        <p id="progress-bar-label-large">Fremdrift i søknaden (stor versjon)</p>
        <ProgressBar
          size="large"
          value={7}
          valueMax={12}
          valueMin={1}
          aria-labelledby="progress-bar-label-large"
        />
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};

export const IndeterminateState: Story = {
  render: () => {
    const values = [25];
    return (
      <>
        {values.map((value) => (
          <div key={value}>
            <p id={`progress-bar-label-${value}`}>Nå laster det</p>
            <ProgressBar
              valueMax={100}
              duration={5}
              size="medium"
              value={value}
              aria-labelledby={`progress-bar-label-${value}`}
            />
          </div>
        ))}
      </>
    );
  },
  args: {
    ...Default.args,
    size: "medium",
    duration: 1,
    value: 7,
    valueMax: 10,
  },
};

export const Chromatic: Story = {
  render: () => {
    return (
      <VStack gap="4">
        <div>
          <h2>Default</h2>
          {/* @ts-expect-error Args are partial, leading to required prop mismatch */}
          <ProgressBar {...Default.args} />
        </div>
        <div>
          <h2>Sizes</h2>
          {/* @ts-expect-error Args are partial, leading to required prop mismatch */}
          <ProgressBar {...Sizes.args} />
        </div>
        <div>
          <h2>Indeterminate State Animation</h2>
          {/* @ts-expect-error Args are partial, leading to required prop mismatch */}
          <ProgressBar {...IndeterminateState.args} />
        </div>
      </VStack>
    );
  },
  parameters: {
    chromatic: { disable: false },
  },
};
