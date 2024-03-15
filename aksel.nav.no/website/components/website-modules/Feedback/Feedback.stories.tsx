import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
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

export const InteractionStates = {
  render: () => {
    return <FeedbackForm user={{ email: "email", name: "name" }} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Innspill");

    await userEvent.click(input);
    await userEvent.type(input, "e".repeat(500) + "!");

    const submit = canvas.getByText("Send inn");
    await userEvent.click(submit);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await userEvent.click(input);
    await userEvent.keyboard("{backspace}");
    await userEvent.click(submit);
  },
};
