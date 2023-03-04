import React, { useEffect, useState } from "react";
import { ProgressBar } from ".";

export default {
  title: "ds-react/ProgressBar",
  component: ProgressBar,
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  render: () => (
    <div className="rowgap">
      <div className="colgap" style={{ minWidth: 300, gap: "2rem" }}>
        <ProgressBar min="0" max="10" value="3" label="Label" />
        <ProgressBar
          min="0"
          max="10"
          value="3"
          label="Label"
          helperText="Steg 3 av 10"
        />
        <ProgressBar min="0" max="20" value="8" label="Label" />
        <ProgressBar min="0" max="10" value="0" label="Label" />
        <ProgressBar min="0" max="10" value="10" label="Label" />
        <ProgressBar min="0" max="10" value="20" label="Label" />
        <ProgressBar min="0" max="10" value="3" label="Label" hideLabel />
        <ProgressBar
          min="0"
          max="10"
          value="10"
          status="finished"
          label="Label"
          hideLabel
        />
        <ProgressBar
          min="0"
          max="10"
          value="4"
          status="error"
          label="Label"
          hideLabel
        />
        <ProgressBar min="0" max="10" value={null} label="Label" hideLabel />
      </div>
      <div className="colgap" style={{ minWidth: 300, gap: "2rem" }}>
        <ProgressBar variant="steps" min="0" max="10" value="3" label="Label" />
        <ProgressBar
          variant="steps"
          min="0"
          max="10"
          value="3"
          label="Label"
          helperText="Steg 3 av 10"
        />
        <ProgressBar variant="steps" min="0" max="20" value="8" label="Label" />
        <ProgressBar variant="steps" min="0" max="10" value="0" label="Label" />
        <ProgressBar
          variant="steps"
          min="0"
          max="10"
          value="10"
          label="Label"
        />
        <ProgressBar
          variant="steps"
          min="0"
          max="10"
          value="20"
          label="Label"
        />
        <ProgressBar
          variant="steps"
          min="0"
          max="10"
          value="3"
          label="Label"
          hideLabel
        />
        <ProgressBar
          variant="steps"
          min="0"
          max="10"
          value="10"
          status="finished"
          label="Label"
          hideLabel
        />
        <ProgressBar
          variant="steps"
          min="0"
          max="10"
          value="4"
          status="error"
          label="Label"
          hideLabel
        />
        <ProgressBar
          variant="steps"
          min="0"
          max="10"
          value={null}
          label="Label"
          hideLabel
        />
      </div>
    </div>
  ),
};

export const Demo = () => {
  const size = 240;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((currentProgress) => {
          const advancement = Math.random() * 16;
          if (currentProgress + advancement < size) {
            return currentProgress + advancement;
          } else {
            clearInterval(interval);
            return size;
          }
        });
      }, 200);
    }, 2000);
  }, []);

  const running = progress > 0;

  let helperText = running
    ? `${progress.toFixed(1)}mB of ${size}mB`
    : "Laster data...";
  if (progress >= size) {
    helperText = "Done";
  }

  return (
    <ProgressBar
      value={running ? progress : null}
      max={size}
      min={0}
      status={progress === size ? "finished" : "active"}
      label="Export data"
      helperText={helperText}
    />
  );
};
