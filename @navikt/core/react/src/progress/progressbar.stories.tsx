import React from "react";
import { ProgressBar } from ".";

export default {
  title: "ds-react/ProgressBar",
  component: ProgressBar,
};

export const Default = {
  render: () => (
    <div className="colgap" style={{ minWidth: 200 }}>
      <ProgressBar min="0" max="100" current="30" />
      <ProgressBar min="0" max="200" current="30" />
      <ProgressBar min="0" max="100" current="0" />
      <ProgressBar min="0" max="100" current="100" />
    </div>
  ),
};
