import Footer from "./Footer";
import { Meta } from "@storybook/react";
import { NextDecorator } from "../../StoryDecorator";

const MetaData: Meta = {
  component: Footer,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextDecorator>
        <Story />
      </NextDecorator>
    ),
  ],
};

export default MetaData;

export const FooterDemo = {
  render: () => <Footer />,
};
