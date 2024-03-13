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
  args: { userState: { signedIn: false, user: null } },
};

export const WithName: Story = {
  args: {
    userState: {
      signedIn: true,
      user: {
        email: "email",
        name: "name",
      },
    },
  },
};

export const FormPublic = {
  render: () => <FeedbackForm user={{ email: "email", name: "name" }} />,
};

export const FormSent = {
  render: () => <FeedbackForm user={{ email: "email", name: "name" }} />,
};

export const FormLoggedIn = {
  render: () => <FeedbackForm user={{ email: "email", name: "name" }} />,
};

export const FormError = {
  render: () => <FeedbackForm user={{ email: "email", name: "name" }} />,
};
