import { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
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
};
Default.argTypes = {
  size: {
    options: ["large", "medium", "small"],
    control: { type: "radio" },
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

export const IndeterminateState: Story = {
  render: () => {
    const values = [0, 5.7, 10, 20];
    return (
      <>
        {values.map((value) => (
          <div key={value}>
            <p id={`progress-bar-label-${value}`}>
              Simulert til å laste i opptil {value} sek.
              {value === 0 &&
                " Ved 0 sek vises indeterminate state umiddelbart."}
            </p>
            <ProgressBar
              valueMax={100}
              size="medium"
              value={value}
              aria-labelledby={`progress-bar-label-${value}`}
              simulated={{
                seconds: value,
                onTimeout: () => {
                  console.log("Ferdig!");
                },
              }}
            />
          </div>
        ))}
      </>
    );
  },
};

export const ColorRole: StoryFn = () => {
  return (
    <div>
      <p id="progress-bar-label-magenta">Brand magenta</p>
      <ProgressBar
        value={60}
        valueMax={120}
        aria-labelledby="progress-bar-label-magenta"
        data-color="brand-magenta"
      />
      <p id="progress-bar-label-warning">Warning</p>
      <ProgressBar
        value={60}
        valueMax={120}
        aria-labelledby="progress-bar-label-warning"
        data-color="warning"
      />
    </div>
  );
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
