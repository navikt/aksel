import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import FormProgress from "./FormProgress";

export default {
  title: "ds-react/FormProgress",
  component: FormProgress,
  decorators: [
    (story) => (
      <div style={{ width: 300, maxWidth: "100%", margin: "0 auto" }}>
        {story()}
      </div>
    ),
  ],
  parameters: { layout: "padded", chromatic: { disable: true } },
} satisfies Meta<typeof FormProgress>;

type Story = StoryFn<typeof FormProgress>;

export const Default: Story = (props) => <FormProgress {...props} />;
Default.args = { activeStep: 1 };
Default.argTypes = {
  /*activeStep: {
    control: { type: "number" },
  },
  size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    }, */
};
