import { Meta, StoryFn } from "@storybook/react-vite";
import React from "react";
import Coachmark from "./Coachmark";

const meta: Meta<typeof Coachmark> = {
  title: "ds-react/Coachmark",
  component: Coachmark,
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

export const Default: StoryFn<typeof Coachmark> = (props) => {
  return (
    <Coachmark {...props}>Id ullamco excepteur elit fugiat labore.</Coachmark>
  );
};
