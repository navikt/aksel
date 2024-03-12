import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme } from "@/sb-util";
import { Feedback, FeedbackForm } from "./Feedback";

const meta = {
  title: "Layout/god-praksis/Feedback",
  component: Feedback,
  tags: ["autodocs"],
  decorators: [AkselTheme],
} satisfies Meta<typeof Feedback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithOutName: Story = {
  args: {},
};

export const WithName: Story = {
  args: {
    username: "Ola normann",
  },
};

export const FormPublic = {
  render: () => (
    <FeedbackForm state="public" setState={() => null} username="ola normann" />
  ),
};

export const FormSent = {
  render: () => (
    <FeedbackForm
      state="feedbackSent"
      setState={() => null}
      username="ola normann"
    />
  ),
};

export const FormLoggedIn = {
  render: () => (
    <FeedbackForm
      state="loggedIn"
      setState={() => null}
      username="ola normann"
    />
  ),
};

export const FormError = {
  render: () => (
    <FeedbackForm state="error" setState={() => null} username="ola normann" />
  ),
};
