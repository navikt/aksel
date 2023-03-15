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
  parameters: {
    layout: "fullscreen",
  },
};

export default MetaData;

export const FooterDemo = {
  render: () => <Footer />,
  nextRouter: {
    path: "/profile/[id]",
    asPath: "/profile/lifeiscontent",
    query: {
      id: "lifeiscontent",
    },
  },
};
